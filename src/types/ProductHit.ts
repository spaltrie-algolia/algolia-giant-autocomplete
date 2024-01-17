import type { Hit } from "@algolia/client-search";

type ProductRecord = {
  Name: string;
  brandName: string;
  imageCrawl: string;
  skuImages: string[];
  skuPrice: number;
  skuPriceGross: number;
  CurrencyCode: string;
  skuDiscountGroup: string;
  reviewScoreBucket: number;
  reviewCountCrawl: number;
};

export type ProductHit = Hit<ProductRecord>;
