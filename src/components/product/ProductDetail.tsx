import { Product } from "@/interfaces/product";
import { ProductDetailImage } from "./ProductDetailImage";
import { ProductDetailDescription } from "./ProductDetailDescription";
import { ProductDetailImageMobile } from "./ProductDetailImageMobile";
import { Breadcrumb } from "./Breadcrumb";

export const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <section className="container mx-auto mt-10">
      <Breadcrumb />

      <div className="flex justify-center md:flex-row flex-col  ">
        <div className="hidden md:block w-1/2 px-0  lg:px-10">
          <ProductDetailImage productImage={product.productImage} />
        </div>
        <div className="w-full block sm:hidden">
          <ProductDetailImageMobile images={product.productImage} />
        </div>
        <div className="w-full md:w-1/2 px-5 ld:px-10">
          <ProductDetailDescription product={product} />
        </div>
      </div>
    </section>
  );
};
