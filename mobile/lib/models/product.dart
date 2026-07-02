import 'dart:convert';

import '../utils/product_meta.dart';
import '../core/config/env.dart';

class Product {
  Product({
    required this.id,
    required this.name,
    this.description,
    this.price = 0,
    this.listPrice,
    this.stock = 0,
    this.imageUrl,
    this.category,
    this.sponsored = false,
    this.verified = false,
    this.promo = false,
    this.flash = false,
    this.city,
    this.vendeurId,
    this.vendeurNom,
    this.moq = 1,
    this.escrow = false,
    this.salesTotal = 0,
    this.imageUrls = const [],
    this.actif = true,
    this.isArchived = false,
    this.hiddenFromMarketplace = false,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    final now = DateTime.now();
    final base = _num(json['prix'] ?? json['price']);
    final promoActive = _isPromoActive(json, now);
    final effective = promoActive ? _effectivePrice(json, now) : base.round();
    final list = promoActive && effective < base ? base.round() : null;

    return Product(
      id: '${json['id']}',
      name: '${json['name_fr'] ?? json['name'] ?? 'Produit'}',
      description: json['description_fr']?.toString() ??
          json['description']?.toString(),
      price: effective,
      listPrice: list,
      stock: _num(json['stock']).round(),
      imageUrl: _imageUrl(json),
      category: json['categorie']?.toString(),
      sponsored: json['sponsorise'] == true,
      verified: json['verifie'] == true || json['vendeur_verifie'] == true,
      promo: promoActive,
      flash: json['flash'] == true,
      city: json['ville']?.toString(),
      vendeurId: json['vendeur_id']?.toString(),
      vendeurNom: json['vendeur_nom']?.toString(),
      moq: ProductMeta.moq(json),
      escrow: json['escrow'] == true,
      salesTotal: int.tryParse('${json['vente_total'] ?? 0}') ?? 0,
      imageUrls: _imageUrls(json),
      actif: json['actif'] != false,
      isArchived: json['is_archived'] == true,
      hiddenFromMarketplace: json['hidden_from_marketplace'] == true,
    );
  }

  final String id;
  final String name;
  final String? description;
  final int price;
  final int? listPrice;
  final int stock;
  final String? imageUrl;
  final String? category;
  final bool sponsored;
  final bool verified;
  final bool promo;
  final bool flash;
  final String? city;
  final String? vendeurId;
  final String? vendeurNom;
  final int moq;
  final bool escrow;
  final int salesTotal;
  final List<String> imageUrls;
  final bool actif;
  final bool isArchived;
  final bool hiddenFromMarketplace;

  bool get inStock => stock > 0;
  bool get lowStock => stock > 0 && stock <= 5;

  /// Aligné catalogue web — exclut soft-deleted / archivés.
  bool get isVisibleOnMarketplace =>
      actif && !isArchived && !hiddenFromMarketplace;

  Map<String, dynamic> toJson() => {
        'id': id,
        'name_fr': name,
        if (description != null) 'description_fr': description,
        'prix': price,
        if (listPrice != null) 'prix_liste': listPrice,
        'stock': stock,
        if (imageUrl != null) 'image': imageUrl,
        if (imageUrls.isNotEmpty) 'image_urls': imageUrls,
        if (category != null) 'categorie': category,
        'sponsorise': sponsored,
        'verifie': verified,
        'promo': promo,
        'flash': flash,
        if (city != null) 'ville': city,
        if (vendeurId != null) 'vendeur_id': vendeurId,
        if (vendeurNom != null) 'vendeur_nom': vendeurNom,
        'moq': moq,
        'escrow': escrow,
        'vente_total': salesTotal,
        'vendeur_verifie': verified,
        'actif': actif,
        'is_archived': isArchived,
        'hidden_from_marketplace': hiddenFromMarketplace,
      };

  static List<String> _imageUrls(Map<String, dynamic> json) {
    final out = <String>[];
    void addUrl(String? raw) {
      final resolved = _resolveUrl(raw);
      if (resolved != null && !out.contains(resolved)) out.add(resolved);
    }

    addUrl(json['image']?.toString());
    final urls = json['image_urls'];
    if (urls is List) {
      for (final u in urls) {
        addUrl(u?.toString());
      }
    } else if (urls is String && urls.trim().isNotEmpty) {
      try {
        final parsed = jsonDecode(urls);
        if (parsed is List) {
          for (final u in parsed) {
            addUrl(u?.toString());
          }
        }
      } catch (_) {
        addUrl(urls);
      }
    }
    return out;
  }

  static String? _resolveUrl(String? raw) {
    if (raw == null) return null;
    final url = raw.trim();
    if (url.isEmpty) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    // Chemins Supabase Storage (bucket/products/…)
    if (url.contains('/storage/v1/object/public/')) {
      return url.startsWith('http') ? url : '${Env.supabaseUrl}$url';
    }
    final path = url.startsWith('/') ? url.substring(1) : url;
    if (path.contains('/')) {
      return '${Env.supabaseUrl}/storage/v1/object/public/$path';
    }
    return null;
  }

  static String? _imageUrl(Map<String, dynamic> json) {
    final urls = _imageUrls(json);
    return urls.isEmpty ? null : urls.first;
  }

  static double _num(dynamic v) {
    if (v == null) return 0;
    if (v is num) return v.toDouble();
    return double.tryParse('$v') ?? 0;
  }

  static bool _isPromoActive(Map<String, dynamic> p, DateTime now) {
    final pct = _num(p['promo_pct']);
    if (p['promo'] != true && pct <= 0) return false;
    final t = now.millisecondsSinceEpoch;
    final start = p['promo_starts_at'];
    if (start != null && '$start'.isNotEmpty) {
      final ms = DateTime.tryParse('$start')?.millisecondsSinceEpoch;
      if (ms != null && t < ms) return false;
    }
    final end = p['promo_ends_at'];
    if (end != null && '$end'.isNotEmpty) {
      final ms = DateTime.tryParse('$end')?.millisecondsSinceEpoch;
      if (ms != null && t > ms) return false;
    }
    return p['promo'] == true || pct > 0;
  }

  static int _effectivePrice(Map<String, dynamic> p, DateTime now) {
    final base = _num(p['prix'] ?? p['price']);
    if (!_isPromoActive(p, now)) return base.round();
    final pct = _num(p['promo_pct']).clamp(0, 100);
    if (pct <= 0) return base.round();
    return (base * (1 - pct / 100)).round();
  }
}
