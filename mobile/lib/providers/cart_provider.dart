import 'package:flutter/foundation.dart';

import '../models/cart_line.dart';
import '../models/product.dart';
import '../services/cart_storage.dart';

class CartProvider extends ChangeNotifier {
  CartProvider(this._storage);

  final CartStorage _storage;
  final List<CartLine> _lines = [];
  bool _ready = false;

  List<CartLine> get lines => List.unmodifiable(_lines);
  int get itemCount => _lines.fold(0, (s, l) => s + l.quantity);
  int get subtotal => _lines.fold(0, (s, l) => s + l.lineTotal);
  bool get isReady => _ready;

  Future<void> init() async {
    final saved = await _storage.load();
    _lines
      ..clear()
      ..addAll(saved);
    _ready = true;
    notifyListeners();
  }

  Future<void> _persist() async {
    if (!_ready) return;
    await _storage.save(_lines);
  }

  /// Retourne false si le stock ne permet pas l'ajout.
  bool add(Product product, {int quantity = 1}) {
    if (!product.inStock || quantity <= 0) return false;

    final idx = _lines.indexWhere((l) => l.product.id == product.id);
    final current = idx >= 0 ? _lines[idx].quantity : 0;
    final next = (current + quantity).clamp(1, product.stock);
    if (next <= current) return false;

    if (idx >= 0) {
      _lines[idx].quantity = next;
    } else {
      _lines.add(CartLine(product: product, quantity: next));
    }
    notifyListeners();
    _persist();
    return true;
  }

  /// Retourne false si la quantité dépasse le stock disponible.
  bool setQuantity(String productId, int qty) {
    final idx = _lines.indexWhere((l) => l.product.id == productId);
    if (idx < 0) return false;
    if (qty <= 0) {
      _lines.removeAt(idx);
      notifyListeners();
      _persist();
      return true;
    }
    final maxStock = _lines[idx].product.stock;
    if (maxStock <= 0 || qty > maxStock) return false;
    _lines[idx].quantity = qty;
    notifyListeners();
    _persist();
    return true;
  }

  void remove(String productId) {
    _lines.removeWhere((l) => l.product.id == productId);
    notifyListeners();
    _persist();
  }

  void clear() {
    _lines.clear();
    notifyListeners();
    _persist();
  }
}
