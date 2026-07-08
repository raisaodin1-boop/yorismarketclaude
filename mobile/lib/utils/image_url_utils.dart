/// Redimensionnement Cloudinary / Supabase Storage pour chargement rapide.
class ImageUrlUtils {
  static String? optimize(
    String? url, {
    int width = 300,
    int? height,
    int quality = 75,
  }) {
    if (url == null || url.isEmpty) return null;
    final trimmed = url.trim();
    if (trimmed.isEmpty) return null;

    if (trimmed.contains('cloudinary.com')) {
      if (trimmed.contains('/w_') || trimmed.contains('/q_')) return trimmed;
      final transforms = [
        'w_$width',
        if (height != null) 'h_$height',
        'q_auto',
        'f_auto',
        'dpr_auto',
        'c_${height != null ? 'fill' : 'limit'}',
      ].join(',');
      return trimmed.replaceFirst('/upload/', '/upload/$transforms/');
    }

    if (trimmed.contains('/storage/v1/object/public/')) {
      final render = trimmed.replaceFirst(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/',
      );
      final resize = height != null ? 'cover' : 'contain';
      final hPart = height != null ? '&height=$height' : '';
      return '$render?width=$width$hPart&resize=$resize&quality=$quality';
    }

    return trimmed;
  }
}
