import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../models/category.dart';
import '../models/product.dart';
import '../services/category_repository.dart';
import '../services/product_repository.dart';

class CatalogProvider extends ChangeNotifier {
  CatalogProvider(this._products, this._categoryRepo, this._client);

  final ProductRepository _products;
  final CategoryRepository _categoryRepo;
  final SupabaseClient _client;

  RealtimeChannel? _realtimeChannel;

  List<Product> _all = [];
  List<MarketplaceCategory> _categories = List.of(kDefaultCategories);
  bool _loading = true;
  String? _error;
  String _query = '';
  String? _categoryFilter;

  List<Product> get all => _all;
  List<MarketplaceCategory> get categories => _categories;
  bool get loading => _loading;
  String? get error => _error;
  String get query => _query;
  String? get categoryFilter => _categoryFilter;

  List<Product> get flashDeals =>
      _all.where((p) => p.promo || p.flash).take(12).toList();

  List<Product> get filtered {
    var list = _all;
    if (_categoryFilter != null && _categoryFilter!.isNotEmpty) {
      final cat = _categoryFilter!.toLowerCase();
      list = list.where((p) {
        final c = (p.category ?? '').toLowerCase();
        if (c.isEmpty) return false;
        return c == cat || c.contains(cat) || cat.contains(c);
      }).toList();
    }
    if (_query.trim().isNotEmpty) {
      list = _applyQuery(list, _query);
    }
    return list;
  }

  /// Recherche globale (ignore le filtre catégorie) — écran recherche dédié.
  List<Product> searchAll(String q) => _applyQuery(_all, q);

  List<Product> _applyQuery(List<Product> list, String q) {
    final query = q.trim().toLowerCase();
    if (query.isEmpty) return list;
    return list
        .where(
          (p) =>
              p.name.toLowerCase().contains(query) ||
              (p.description ?? '').toLowerCase().contains(query) ||
              (p.category ?? '').toLowerCase().contains(query) ||
              (p.city ?? '').toLowerCase().contains(query),
        )
        .toList();
  }

  Future<void> load() async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      final productsFuture = _products.fetchCatalog(limit: 120);
      final categoriesFuture = _categoryRepo.fetchFeatured();
      _all = await productsFuture;
      final cats = await categoriesFuture;
      if (cats.isNotEmpty) _categories = cats;
      _error = null;
      _ensureRealtime();
    } catch (e) {
      _error = 'Connexion impossible. Vérifiez votre réseau.';
      if (kDebugMode) _error = '$_error\n$e';
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  void _ensureRealtime() {
    if (_realtimeChannel != null) return;
    _realtimeChannel = _client
        .channel('prod_rt_mobile')
        .onPostgresChanges(
          event: PostgresChangeEvent.all,
          schema: 'public',
          table: 'products',
          callback: (_) => load(),
        )
        .subscribe();
  }

  @override
  void dispose() {
    _realtimeChannel?.unsubscribe();
    super.dispose();
  }

  void setQuery(String q) {
    _query = q;
    notifyListeners();
  }

  void setCategory(String? slugOrName) {
    _categoryFilter = slugOrName;
    notifyListeners();
  }

  void clearFilters() {
    _query = '';
    _categoryFilter = null;
    notifyListeners();
  }
}
