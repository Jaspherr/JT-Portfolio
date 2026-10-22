import { createContext } from "react";

export type ImagePreload = {
  imageSrcSet: string;
  imageSizes?: string;
  fetchPriority?: "high" | "low" | "auto";
};

export const ImagePreloadContext = createContext<ImagePreload[] | null>(null);