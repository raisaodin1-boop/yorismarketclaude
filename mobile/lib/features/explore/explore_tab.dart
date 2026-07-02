import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/theme/yorix_theme.dart';
import '../../core/widgets/product_card_modern.dart';
import '../../models/product.dart';
import '../../providers/catalog_provider.dart';

class ExploreTab extends StatelessWidget {
  const ExploreTab({super.key, required this.onProductTap});

  final void Function(Product) onProductTap;

  @override
  Widget build(BuildContext context) {
    final catalog = context.watch<CatalogProvider>();
    final filter = catalog.categoryFilter;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SafeArea(
          bottom: false,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    'Explorer',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
                  ),
                ),
                if (filter != null)
                  TextButton(
                    onPressed: catalog.clearFilters,
                    child: const Text('Effacer filtre'),
                  ),
              ],
            ),
          ),
        ),
        if (filter != null)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Chip(
              label: Text(filter),
              deleteIcon: const Icon(Icons.close, size: 18),
              onDeleted: catalog.clearFilters,
              backgroundColor: YorixColors.greenPale,
            ),
          ),
        Expanded(
          child: catalog.loading && catalog.all.isEmpty
              ? const Center(child: CircularProgressIndicator(color: YorixColors.green))
              : catalog.error != null && catalog.all.isEmpty
                  ? Center(
                      child: Padding(
                        padding: const EdgeInsets.all(32),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.cloud_off, size: 48, color: YorixColors.gray),
                            const SizedBox(height: 12),
                            Text(catalog.error!, textAlign: TextAlign.center),
                            const SizedBox(height: 16),
                            FilledButton(onPressed: catalog.load, child: const Text('Réessayer')),
                          ],
                        ),
                      ),
                    )
              : catalog.filtered.isEmpty
                  ? const Center(child: Text('Aucun produit trouvé'))
                  : RefreshIndicator(
                      onRefresh: catalog.load,
                      child: GridView.builder(
                        padding: const EdgeInsets.fromLTRB(16, 8, 16, 100),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          mainAxisSpacing: 12,
                          crossAxisSpacing: 12,
                          childAspectRatio: 0.50,
                        ),
                        itemCount: catalog.filtered.length,
                        itemBuilder: (context, i) => ProductCardModern(
                          product: catalog.filtered[i],
                          onTap: () => onProductTap(catalog.filtered[i]),
                        ),
                      ),
                    ),
        ),
      ],
    );
  }
}
