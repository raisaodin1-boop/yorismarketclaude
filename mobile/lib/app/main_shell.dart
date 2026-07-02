import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../features/cart/cart_tab.dart';
import '../features/explore/explore_tab.dart';
import '../features/home/home_tab.dart';
import '../features/product/product_detail_screen.dart';
import '../features/profile/profile_tab.dart';
import '../features/sourcer/sourcer_tab.dart';
import '../features/search/search_screen.dart';
import '../models/product.dart';
import '../providers/cart_provider.dart';

class MainShell extends StatefulWidget {
  const MainShell({super.key});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _index = 0;

  void _openProduct(Product product) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => ProductDetailScreen(
          product: product,
          onGoToCart: _goCart,
        ),
      ),
    );
  }

  void _goExplore() => setState(() => _index = 1);

  void _goCart() => setState(() => _index = 3);

  @override
  Widget build(BuildContext context) {
    final cartCount = context.watch<CartProvider>().itemCount;

    return Scaffold(
      body: IndexedStack(
        index: _index,
        children: [
          HomeTab(
            onProductTap: _openProduct,
            onExplore: _goExplore,
            onOpenSearch: () => Navigator.of(context).push(
              MaterialPageRoute<void>(
                builder: (_) => SearchScreen(onGoToCart: _goCart),
              ),
            ),
          ),
          ExploreTab(onProductTap: _openProduct),
          SourcerTab(onProductTap: _openProduct),
          const CartTab(),
          const ProfileTab(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: [
          const NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home_rounded), label: 'Accueil'),
          const NavigationDestination(icon: Icon(Icons.explore_outlined), selectedIcon: Icon(Icons.explore_rounded), label: 'Explorer'),
          const NavigationDestination(icon: Icon(Icons.inventory_2_outlined), selectedIcon: Icon(Icons.inventory_2_rounded), label: 'Sourcer'),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: cartCount > 0,
              label: Text('$cartCount'),
              child: const Icon(Icons.shopping_bag_outlined),
            ),
            selectedIcon: const Icon(Icons.shopping_bag_rounded),
            label: 'Panier',
          ),
          const NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person_rounded), label: 'Profil'),
        ],
      ),
    );
  }
}
