import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/cart_line.dart';
import '../models/product.dart';

const _cartKey = 'yorix_cart_v1';

class CartStorage {
  Future<List<CartLine>> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_cartKey);
    if (raw == null || raw.isEmpty) return [];

    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) return [];
      return decoded
          .whereType<Map>()
          .map((row) {
            final productJson = row['product'];
            final qty = row['quantity'];
            if (productJson is! Map || qty is! num) return null;
            return CartLine(
              product: Product.fromJson(Map<String, dynamic>.from(productJson)),
              quantity: qty.round().clamp(1, 999),
            );
          })
          .whereType<CartLine>()
          .where((line) => line.product.isVisibleOnMarketplace && line.product.inStock)
          .toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> save(List<CartLine> lines) async {
    final prefs = await SharedPreferences.getInstance();
    final payload = lines
        .map(
          (line) => {
            'product': line.product.toJson(),
            'quantity': line.quantity,
          },
        )
        .toList();
    await prefs.setString(_cartKey, jsonEncode(payload));
  }

  Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_cartKey);
  }
}
