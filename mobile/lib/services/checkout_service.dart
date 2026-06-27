import 'package:supabase_flutter/supabase_flutter.dart';

import '../models/cart_line.dart';

class CheckoutService {
  CheckoutService(this._client);

  final SupabaseClient _client;

  Future<Map<String, dynamic>> _invoke(
    String functionName,
    Map<String, dynamic> body,
  ) async {
    final response = await _client.functions.invoke(functionName, body: body);
    final data = response.data;
    if (data is Map && data['error'] != null) {
      throw Exception('${data['error']}');
    }
    if (data is! Map) {
      throw Exception('Réponse checkout invalide');
    }
    return Map<String, dynamic>.from(data);
  }

  Map<String, dynamic> buildIntentPayload({
    required List<CartLine> lines,
    required int subtotal,
    required String clientName,
    required String phone,
    String? userId,
    String? email,
    String? ville,
    String? adresse,
  }) {
    return {
      'checkoutType': 'product_only',
      'customer': {
        'id': userId,
        'nom': clientName,
        'telephone': phone,
        'email': email ?? '',
        'ville': ville ?? '',
        'adresse': adresse ?? ville ?? '',
      },
      'items': lines
          .map(
            (line) => {
              'id': line.product.id,
              'kind': 'product',
              'qty': line.quantity,
              'price': line.product.price,
              'fulfillmentMode': 'delivery',
              'vendeur_id': line.product.vendeurId,
              'ville': line.product.city ?? '',
            },
          )
          .toList(),
      'summary': {
        'subtotal': subtotal,
        'delivery': 0,
        'total': subtotal,
      },
    };
  }

  Future<Map<String, dynamic>> createIntent(Map<String, dynamic> payload) {
    return _invoke('create_checkout_intent', payload);
  }

  Future<Map<String, dynamic>> confirmCheckout({
    required String checkoutIntentId,
    required String paymentMethod,
    required String address,
    String locationType = 'home',
  }) {
    return _invoke('confirm_checkout', {
      'checkout_intent_id': checkoutIntentId,
      'payment_method': paymentMethod,
      'location_type': locationType,
      'address': address,
    });
  }

  Future<Map<String, dynamic>> initPaymentCinetPay({
    required String checkoutIntentId,
    required String orderGroupId,
    required int amount,
    required String customerName,
    required String customerPhone,
    String? customerEmail,
  }) {
    return _invoke('init_payment_cinetpay', {
      'checkout_intent_id': checkoutIntentId,
      'order_group_id': orderGroupId,
      'amount': amount,
      'channel': 'ALL',
      'customer_name': customerName,
      'customer_phone': customerPhone,
      'customer_email': customerEmail ?? 'support@yorix.cm',
    });
  }
}
