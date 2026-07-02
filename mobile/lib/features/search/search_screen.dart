import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/theme/yorix_theme.dart';
import '../../core/widgets/yorix_network_image.dart';
import '../../models/product.dart';
import '../../providers/catalog_provider.dart';
import '../../utils/format.dart';
import '../product/product_detail_screen.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key, this.onGoToCart});

  final VoidCallback? onGoToCart;

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _controller = TextEditingController();
  String _query = '';

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _openProduct(Product p) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => ProductDetailScreen(
          product: p,
          onGoToCart: widget.onGoToCart,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final catalog = context.watch<CatalogProvider>();
    final results = catalog.searchAll(_query);

    return Scaffold(
      appBar: AppBar(
        title: TextField(
          controller: _controller,
          autofocus: true,
          decoration: const InputDecoration(hintText: 'Rechercher…', border: InputBorder.none),
          onChanged: (v) => setState(() => _query = v),
        ),
        actions: [
          if (_query.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.clear),
              onPressed: () {
                _controller.clear();
                setState(() => _query = '');
              },
            ),
        ],
      ),
      body: results.isEmpty
          ? Center(
              child: Text(
                _query.isEmpty ? 'Tapez pour rechercher' : 'Aucun résultat',
                style: const TextStyle(color: YorixColors.gray),
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: results.length,
              separatorBuilder: (_, _) => const SizedBox(height: 10),
              itemBuilder: (context, i) {
                final p = results[i];
                return Material(
                  color: YorixColors.card,
                  borderRadius: BorderRadius.circular(14),
                  clipBehavior: Clip.antiAlias,
                  child: ListTile(
                    onTap: () => _openProduct(p),
                    leading: ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: SizedBox(
                        width: 52,
                        height: 52,
                        child: YorixNetworkImage(url: p.imageUrl),
                      ),
                    ),
                    title: Text(p.name, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.w700)),
                    subtitle: Text(formatFcfa(p.price), style: const TextStyle(color: YorixColors.green, fontWeight: FontWeight.w800)),
                    trailing: const Icon(Icons.chevron_right),
                  ),
                );
              },
            ),
    );
  }
}
