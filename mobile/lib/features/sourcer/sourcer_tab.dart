import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/theme/yorix_theme.dart';
import '../../core/widgets/product_card_modern.dart';
import '../../models/product.dart';
import '../../providers/catalog_provider.dart';

/// Hub « Sourcer en gros » — produits vérifiés / volume (filtre MOQ client).
class SourcerTab extends StatefulWidget {
  const SourcerTab({super.key, required this.onProductTap});

  final void Function(Product product) onProductTap;

  @override
  State<SourcerTab> createState() => _SourcerTabState();
}

class _SourcerTabState extends State<SourcerTab> {
  String _moqFilter = 'all';

  List<Product> _filter(List<Product> all) {
    var list = all.where((p) => p.verified || p.sponsored || p.price >= 5000).toList();
    if (list.length < 8) list = all;
    list = [...list]..sort((a, b) => b.price.compareTo(a.price));

    if (_moqFilter == '1') {
      return list.where((p) => p.moq <= 1).toList();
    }
    if (_moqFilter == '5') {
      return list.where((p) => p.moq >= 5).toList();
    }
    if (_moqFilter == '10') {
      return list.where((p) => p.moq >= 10).toList();
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final catalog = context.watch<CatalogProvider>();
    final products = _filter(catalog.all);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SafeArea(
          bottom: false,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Sourcer en gros',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 6),
                Text(
                  'Fournisseurs vérifiés, MOQ et Protect+ — idéal pour boutiques et distributeurs.',
                  style: TextStyle(color: YorixColors.gray.withValues(alpha: 0.95), fontSize: 13),
                ),
              ],
            ),
          ),
        ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            children: [
              _MoqChip(label: 'Tous', id: 'all', selected: _moqFilter, onTap: (v) => setState(() => _moqFilter = v)),
              _MoqChip(label: '1 pc', id: '1', selected: _moqFilter, onTap: (v) => setState(() => _moqFilter = v)),
              _MoqChip(label: 'MOQ 5+', id: '5', selected: _moqFilter, onTap: (v) => setState(() => _moqFilter = v)),
              _MoqChip(label: 'MOQ 10+', id: '10', selected: _moqFilter, onTap: (v) => setState(() => _moqFilter = v)),
            ],
          ),
        ),
        const SizedBox(height: 8),
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
                  : products.isEmpty
                      ? const Center(child: Text('Aucun produit pour ce filtre MOQ.'))
                      : RefreshIndicator(
                          color: YorixColors.green,
                          onRefresh: catalog.load,
                          child: GridView.builder(
                            physics: const AlwaysScrollableScrollPhysics(),
                            padding: const EdgeInsets.fromLTRB(16, 8, 16, 100),
                            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              mainAxisSpacing: 12,
                              crossAxisSpacing: 12,
                              childAspectRatio: 0.50,
                            ),
                            itemCount: products.length,
                            itemBuilder: (context, i) => ProductCardModern(
                              product: products[i],
                              onTap: () => widget.onProductTap(products[i]),
                            ),
                          ),
                        ),
        ),
      ],
    );
  }
}

class _MoqChip extends StatelessWidget {
  const _MoqChip({
    required this.label,
    required this.id,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final String id;
  final String selected;
  final void Function(String) onTap;

  @override
  Widget build(BuildContext context) {
    final active = selected == id;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        label: Text(label),
        selected: active,
        onSelected: (_) => onTap(id),
        selectedColor: YorixColors.greenPale,
        checkmarkColor: YorixColors.green,
      ),
    );
  }
}
