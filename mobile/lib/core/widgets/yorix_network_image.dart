import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

import '../theme/yorix_theme.dart';
import '../../utils/image_url_utils.dart';

class YorixNetworkImage extends StatelessWidget {
  const YorixNetworkImage({
    super.key,
    this.url,
    this.fit = BoxFit.cover,
    this.borderRadius,
    this.width = 300,
    this.height = 300,
  });

  final String? url;
  final BoxFit fit;
  final BorderRadius? borderRadius;
  final int width;
  final int height;

  @override
  Widget build(BuildContext context) {
    final optimized = ImageUrlUtils.optimize(url, width: width, height: height);
    final dpr = MediaQuery.devicePixelRatioOf(context).ceil().clamp(1, 3);
    final cacheW = width * dpr;
    final cacheH = height * dpr;

    final child = optimized == null
        ? const _Placeholder()
        : CachedNetworkImage(
            imageUrl: optimized,
            fit: fit,
            memCacheWidth: cacheW,
            memCacheHeight: cacheH,
            fadeInDuration: const Duration(milliseconds: 180),
            fadeOutDuration: const Duration(milliseconds: 120),
            placeholder: (_, _) => const _ShimmerBox(),
            errorWidget: (_, _, _) => const _Placeholder(),
          );

    if (borderRadius != null) {
      return ClipRRect(borderRadius: borderRadius!, child: child);
    }
    return child;
  }
}

class _Placeholder extends StatelessWidget {
  const _Placeholder();

  @override
  Widget build(BuildContext context) {
    return Container(
      color: YorixColors.greenPale,
      alignment: Alignment.center,
      child: const Text('📦', style: TextStyle(fontSize: 36)),
    );
  }
}

class _ShimmerBox extends StatelessWidget {
  const _ShimmerBox();

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: YorixColors.border,
      highlightColor: Colors.white,
      child: Container(color: YorixColors.border),
    );
  }
}
