import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:yorix_mobile/models/product.dart';
import 'package:yorix_mobile/providers/cart_provider.dart';
import 'package:yorix_mobile/services/cart_storage.dart';

Product _sample({int stock = 5}) => Product.fromJson({
      'id': 'p1',
      'name_fr': 'Article test',
      'prix': 1000,
      'stock': stock,
    });

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  test('Product.fromJson calcule le prix promo', () {
    final product = Product.fromJson({
      'id': 1,
      'name_fr': 'Téléphone',
      'prix': 100000,
      'promo': true,
      'promo_pct': 10,
      'stock': 3,
      'image': 'https://example.com/a.jpg',
    });

    expect(product.name, 'Téléphone');
    expect(product.price, 90000);
    expect(product.listPrice, 100000);
    expect(product.inStock, isTrue);
  });

  test('CartProvider respecte le stock disponible', () async {
    final cart = CartProvider(CartStorage());
    await cart.init();
    final product = _sample(stock: 2);

    expect(cart.add(product, quantity: 2), isTrue);
    expect(cart.itemCount, 2);
    expect(cart.add(product, quantity: 1), isFalse);
    expect(cart.setQuantity('p1', 3), isFalse);
    expect(cart.setQuantity('p1', 1), isTrue);
    expect(cart.itemCount, 1);
  });

  test('CartProvider persiste le panier', () async {
    final storage = CartStorage();
    final cart = CartProvider(storage);
    await cart.init();
    cart.add(_sample(stock: 4), quantity: 2);
    expect(cart.itemCount, 2);

    final reloaded = CartProvider(storage);
    await reloaded.init();
    expect(reloaded.itemCount, 2);
    expect(reloaded.lines.first.product.name, 'Article test');
  });
}
