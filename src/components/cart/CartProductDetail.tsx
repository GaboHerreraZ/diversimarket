import { Product } from "@/interfaces/product";
import Image from "next/image";
import { AddProductCart } from "./AddProductCart";
import { DeleteProductCart } from "./DeleteProductCart";
import { currencyFormat } from "@/utils/currenyFormat";

export const CartProductDetail = ({
  items,
  product,
}: {
  items: number;
  product: Product;
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between py-5 items-center border-t-[1px] border-gray-200">
      <div className="flex justify-center md:justify-start w-full md:w-1/3">
        <div className="  flex-shrink-0 w-20 h-20">
          <Image
            className="w-full h-full rounded-full"
            src={product.productImage[0].url}
            alt={product.name}
            width={250}
            height={250}
          />
        </div>
      </div>
      <div className="text-center md:text-start w-full md:w-1/3">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-sm">
          Sku: <span className="font-bold">{product.sku}</span>
        </p>
        <AddProductCart items={items} product={product} />
      </div>
      <div className="flex w-full justify-center md:justify-end md:w-1/3">
        <label className="text-white">
          {currencyFormat(product.price * items)}
        </label>
        <DeleteProductCart product={product} />
      </div>
    </div>
  );
};
