"use client";
import { useCartStore } from "@/store";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export const CartButton = () => {
  const items = useCartStore((state) => state.items);
  const toogleSideMenu = useCartStore((state) => state.toogleSideMenu);

  return (
    <button
      onClick={toogleSideMenu}
      className="flex relative justify-center  items-center text-main "
    >
      <HiOutlineShoppingBag size={25} />
      <span className="font-bold absolute -top-0 -right-2 flex justify-center items-center h-5 w-5 rounded-full bg-slate-950 border-[1px] border-main text-white ">
        {items}
      </span>
    </button>
  );
};
