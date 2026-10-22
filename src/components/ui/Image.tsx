import { useContext, type ComponentProps } from "react";

import images from "@/generated/images.json";
import { ImagePreloadContext } from "@/lib/image-preload";

type ImageManifest = Record<
  string,
  { width: number; height: number; widths: number[] }
>;

const manifest: ImageManifest = images;

const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const ALL_SIZES = [16, 32, 48, 64, 96, 128, 256, 384, ...DEVICE_SIZES];

const FILL_STYLE = {
  position: "absolute",
  height: "100%",
  width: "100%",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  color: "transparent",
} as const;

const SIZED_STYLE = { color: "transparent" } as const;

type ImageProps = Omit<
  ComponentProps<"img">,
  "src" | "srcSet" | "width" | "height"
> & {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  preload?: boolean;
};

function variantUrl(src: string, width: number) {
  const entry = manifest[src];

  if (!entry) return src;

  const available =
    entry.widths.find((w) => w >= width) ?? entry.widths.at(-1)!;

  return `/_img${src.slice(0, -4)}-${available}.webp`;
}

function getSrcSet(src: string, width?: number, sizes?: string) {
  if (width === undefined) {
    const percents = [...(sizes ?? "").matchAll(/(^|\s)(1?\d?\d)vw/g)].map(
      (match) => Number(match[2]),
    );

    const widths = percents.length
      ? ALL_SIZES.filter(
          (w) => w >= DEVICE_SIZES[0] * (Math.min(...percents) * 0.01),
        )
      : sizes
        ? ALL_SIZES
        : DEVICE_SIZES;

    return {
      srcSet: widths.map((w) => `${variantUrl(src, w)} ${w}w`).join(", "),
      fallback: variantUrl(src, widths.at(-1)!),
    };
  }

  const widths = [
    ...new Set(
      [width, width * 2].map(
        (w) => ALL_SIZES.find((size) => size >= w) ?? ALL_SIZES.at(-1)!,
      ),
    ),
  ];

  return {
    srcSet: widths
      .map((w, index) => `${variantUrl(src, w)} ${index + 1}x`)
      .join(", "),
    fallback: variantUrl(src, widths.at(-1)!),
  };
}

export default function Image({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  preload = false,
  loading,
  fetchPriority,
  ...props
}: ImageProps) {
  const preloads = useContext(ImagePreloadContext);
  const { srcSet, fallback } = getSrcSet(src, fill ? undefined : width, sizes);

  if (preloads && (preload || loading === "eager")) {
    preloads.push({ imageSrcSet: srcSet, imageSizes: sizes, fetchPriority });
  }

  return (
    <img
      {...props}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={preload ? undefined : (loading ?? "lazy")}
      fetchPriority={fetchPriority}
      decoding="async"
      sizes={sizes}
      srcSet={srcSet}
      src={fallback}
      style={fill ? FILL_STYLE : SIZED_STYLE}
    />
  );
}