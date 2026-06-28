/// Métadonnées carte produit (MOQ, Protect+, livraison) — aligné web.
class ProductMeta {
  static int moq(Map<String, dynamic>? json) {
    final n = int.tryParse('${json?['moq'] ?? json?['moq_min'] ?? 1}') ?? 1;
    return n < 1 ? 1 : n;
  }

  static String moqLabel(Map<String, dynamic>? json) {
    final m = moq(json);
    return m <= 1 ? '1 pc min.' : 'MOQ $m pcs';
  }

  static int protectScore(Map<String, dynamic>? json) {
    if (json == null) return 0;
    var score = 42;
    if (json['vendeur_verifie'] == true || json['verifie'] == true) score += 22;
    if (json['vendeur_id'] != null) score += 8;
    else score -= 18;
    final sales = int.tryParse('${json['vente_total'] ?? 0}') ?? 0;
    if (sales >= 30) score += 14;
    else if (sales >= 5) score += 8;
    final img = json['image']?.toString() ?? '';
    if (img.startsWith('http')) score += 8;
    else score -= 12;
    if (json['escrow'] == true) score += 10;
    if (score < 5) return 5;
    if (score > 99) return 99;
    return score;
  }

  static String deliveryShort(String? city) {
    final c = (city ?? 'Douala').toLowerCase();
    if (c.contains('douala') || c.contains('yaound')) {
      return '25 min – 1 h 30';
    }
    return 'J+1 à J+2';
  }
}
