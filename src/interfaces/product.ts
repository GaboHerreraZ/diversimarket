import { ProductImage } from "./productImage";

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  youtubeLink: string;
  available: boolean;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  subcategoryId: number;
  price: number;
  ownerId: string;
  multiplier: number;
  productImage: ProductImage[];
  images?: FileList;
}
