import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/config/env.dart';
import '../../core/theme/yorix_theme.dart';
import '../../providers/cart_provider.dart';
import '../../services/checkout_service.dart';
import '../../services/profile_repository.dart';
import '../../utils/format.dart';
import '../auth/auth_screen.dart';

enum _PaymentMethod { cinetpay, whatsapp }

class CheckoutSheet extends StatefulWidget {
  const CheckoutSheet({super.key});

  @override
  State<CheckoutSheet> createState() => _CheckoutSheetState();
}

class _CheckoutSheetState extends State<CheckoutSheet> {
  final _name = TextEditingController();
  final _phone = TextEditingController();
  final _address = TextEditingController();
  final _checkout = CheckoutService(Supabase.instance.client);
  final _profiles = ProfileRepository(Supabase.instance.client);

  _PaymentMethod _paymentMethod = _PaymentMethod.cinetpay;
  bool _loading = false;
  bool _prefilled = false;
  String? _error;
  int? _serverTotal;
  String? _idempotencyKey;

  @override
  void initState() {
    super.initState();
    _prefillFromProfile();
  }

  Future<void> _prefillFromProfile() async {
    final user = Supabase.instance.client.auth.currentUser;
    if (user == null) return;
    final profile = await _profiles.fetchCurrent();
    if (!mounted) return;
    setState(() {
      _name.text = profile?.nom?.trim().isNotEmpty == true ? profile!.nom!.trim() : _name.text;
      _phone.text = profile?.telephone?.trim().isNotEmpty == true ? profile!.telephone!.trim() : _phone.text;
      _prefilled = true;
    });
  }

  @override
  void dispose() {
    _name.dispose();
    _phone.dispose();
    _address.dispose();
    super.dispose();
  }

  String? _validateForm() {
    if (_name.text.trim().isEmpty) return 'Nom complet requis';
    if (_phone.text.trim().length < 9) return 'Téléphone valide requis (9 chiffres min.)';
    if (_address.text.trim().length < 5) return 'Adresse de livraison requise';
    return null;
  }

  bool _validateStock(CartProvider cart) {
    for (final line in cart.lines) {
      if (!line.product.inStock) {
        setState(() => _error = '${line.product.name} est en rupture de stock.');
        return false;
      }
      if (line.quantity > line.product.stock) {
        setState(() => _error = 'Stock insuffisant pour ${line.product.name} (max ${line.product.stock}).');
        return false;
      }
    }
    return true;
  }

  Future<void> _openWhatsApp({
    required String intentId,
    required String orderGroupId,
    required int total,
    required int subtotal,
    required int delivery,
    required CartProvider cart,
  }) async {
    final lines = cart.lines
        .map((l) => '• ${l.product.name} x${l.quantity} = ${formatFcfa(l.lineTotal)}')
        .join('\n');
    final msg = [
      '🛒 *CHECKOUT YORIX*',
      '',
      '🔎 Référence : $intentId',
      '📦 Groupe : $orderGroupId',
      '',
      lines,
      '',
      '💰 Sous-total : ${formatFcfa(subtotal)}',
      '🚚 Livraison : ${delivery > 0 ? formatFcfa(delivery) : 'Offerte / N/A'}',
      '💵 Total : ${formatFcfa(total)}',
      '',
      '👤 Client : ${_name.text.trim()}',
      '📱 Tel : ${_phone.text.trim()}',
      '📍 Adresse : ${_address.text.trim()}',
    ].join('\n');
    final uri = Uri.parse('https://wa.me/${Env.whatsAppNumber}?text=${Uri.encodeComponent(msg)}');
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication) && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('WhatsApp indisponible — commande enregistrée')),
      );
    }
  }

  Future<void> _submit() async {
    final user = Supabase.instance.client.auth.currentUser;
    if (user == null) {
      final ok = await Navigator.of(context).push<bool>(
        MaterialPageRoute(builder: (_) => const AuthScreen()),
      );
      if (ok != true || !mounted) return;
      await _prefillFromProfile();
    }

    final validationError = _validateForm();
    if (validationError != null) {
      setState(() => _error = validationError);
      return;
    }

    setState(() {
      _loading = true;
      _error = null;
      _serverTotal = null;
    });

    final cart = context.read<CartProvider>();
    if (!_validateStock(cart)) {
      setState(() => _loading = false);
      return;
    }

    final currentUser = Supabase.instance.client.auth.currentUser;
    if (currentUser == null) {
      setState(() {
        _loading = false;
        _error = 'Connexion requise pour payer en Escrow.';
      });
      return;
    }

    try {
      final payload = _checkout.buildIntentPayload(
        lines: cart.lines,
        subtotal: cart.subtotal,
        clientName: _name.text.trim(),
        phone: _phone.text.trim(),
        userId: currentUser.id,
        email: currentUser.email,
        adresse: _address.text.trim(),
      );

      final intent = await _checkout.createIntent(payload);
      final intentId = '${intent['checkout_intent_id']}';
      final subtotal = (intent['subtotal'] as num?)?.round() ?? cart.subtotal;
      final delivery = (intent['delivery_fee'] as num?)?.round() ?? 0;
      final total = (intent['total'] as num?)?.round() ?? cart.subtotal;

      final confirmation = await _checkout.confirmCheckout(
        checkoutIntentId: intentId,
        paymentMethod: _paymentMethod == _PaymentMethod.cinetpay ? 'cinetpay' : 'whatsapp_backup',
        address: _address.text.trim(),
        idempotencyKey: _idempotencyKey ??= '${DateTime.now().millisecondsSinceEpoch}-${currentUser.id}',
      );

      final orderGroupId = confirmation['order_group_id']?.toString();
      if (orderGroupId == null || orderGroupId.isEmpty) {
        throw Exception('Commande non confirmée par le serveur');
      }

      final payTotal = (confirmation['total'] as num?)?.round() ?? total;

      if (_paymentMethod == _PaymentMethod.cinetpay) {
        final payment = await _checkout.initPaymentCinetPay(
          checkoutIntentId: intentId,
          orderGroupId: orderGroupId,
          amount: payTotal,
          customerName: _name.text.trim(),
          customerPhone: _phone.text.trim(),
          customerEmail: currentUser.email,
        );
        final paymentUrl = payment['payment_url']?.toString();
        if (paymentUrl == null || paymentUrl.isEmpty) {
          throw Exception('Lien CinetPay indisponible');
        }
        cart.clear();
        _idempotencyKey = null;
        if (!mounted) return;
        Navigator.of(context).pop();
        final opened = await launchUrl(Uri.parse(paymentUrl), mode: LaunchMode.externalApplication);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                opened
                    ? '✅ Commande $orderGroupId — finalisez le paiement CinetPay'
                    : 'Commande créée ($orderGroupId). Ouvrez CinetPay depuis votre email/SMS.',
              ),
            ),
          );
        }
        return;
      }

      await _openWhatsApp(
        intentId: intentId,
        orderGroupId: orderGroupId,
        total: payTotal,
        subtotal: subtotal,
        delivery: delivery,
        cart: cart,
      );
      cart.clear();
      if (mounted) {
        Navigator.of(context).pop();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('✅ Commande $orderGroupId enregistrée — finalisez sur WhatsApp')),
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();
    final bottom = MediaQuery.paddingOf(context).bottom;
    final user = Supabase.instance.client.auth.currentUser;

    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
      child: Container(
        margin: const EdgeInsets.only(top: 48),
        decoration: const BoxDecoration(
          color: YorixColors.card,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: SingleChildScrollView(
          padding: EdgeInsets.fromLTRB(24, 12, 24, 24 + bottom),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(color: YorixColors.border, borderRadius: BorderRadius.circular(2)),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Finaliser la commande',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 8),
              Text(
                'Sous-total : ${formatFcfa(cart.subtotal)}${_serverTotal != null ? ' · Total serveur : ${formatFcfa(_serverTotal!)}' : ''}',
                style: const TextStyle(color: YorixColors.green, fontWeight: FontWeight.w800, fontSize: 16),
              ),
              if (user == null) ...[
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: YorixColors.goldPale,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text(
                    'Connectez-vous pour un paiement Escrow sécurisé (CinetPay / MoMo).',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
                  ),
                ),
              ],
              const SizedBox(height: 20),
              TextField(
                controller: _name,
                textInputAction: TextInputAction.next,
                decoration: const InputDecoration(labelText: 'Nom complet'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _phone,
                keyboardType: TextInputType.phone,
                textInputAction: TextInputAction.next,
                decoration: const InputDecoration(labelText: 'Téléphone (MoMo / WhatsApp)'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _address,
                textInputAction: TextInputAction.done,
                decoration: const InputDecoration(labelText: 'Adresse de livraison'),
                minLines: 1,
                maxLines: 2,
              ),
              const SizedBox(height: 16),
              Text('Mode de paiement', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
              const SizedBox(height: 8),
              SegmentedButton<_PaymentMethod>(
                segments: const [
                  ButtonSegment(
                    value: _PaymentMethod.cinetpay,
                    label: Text('CinetPay'),
                    icon: Icon(Icons.payment, size: 18),
                  ),
                  ButtonSegment(
                    value: _PaymentMethod.whatsapp,
                    label: Text('WhatsApp'),
                    icon: Icon(Icons.chat, size: 18),
                  ),
                ],
                selected: {_paymentMethod},
                onSelectionChanged: _loading
                    ? null
                    : (value) => setState(() => _paymentMethod = value.first),
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: YorixColors.greenPale, borderRadius: BorderRadius.circular(12)),
                child: Text(
                  _paymentMethod == _PaymentMethod.cinetpay
                      ? '🔐 Escrow Yorix : paiement CinetPay (MoMo, Orange, carte). Fonds protégés jusqu\'à livraison.'
                      : '💬 WhatsApp : commande enregistrée en Escrow, confirmation manuelle du paiement par l\'équipe Yorix.',
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: YorixColors.greenDark),
                ),
              ),
              if (_error != null) ...[
                const SizedBox(height: 12),
                Text(_error!, style: const TextStyle(color: YorixColors.danger)),
              ],
              const SizedBox(height: 20),
              FilledButton(
                onPressed: _loading ? null : _submit,
                child: _loading
                    ? const SizedBox(
                        height: 22,
                        width: 22,
                        child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                      )
                    : Text(
                        _paymentMethod == _PaymentMethod.cinetpay
                            ? 'Payer avec CinetPay · Escrow'
                            : 'Confirmer · WhatsApp',
                      ),
              ),
              if (!_prefilled) const SizedBox(height: 4),
            ],
          ),
        ),
      ),
    );
  }
}
