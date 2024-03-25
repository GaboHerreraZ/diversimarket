"use client";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currenyFormat";

export const ShippingCosts = () => {
  const shippingCost = useCartStore((state) => state.shippingCost);

  return (
    <>
      {shippingCost && (
        <li className="flex justify-between">
          <label>Gastos de envío</label>
          <label>{currencyFormat(shippingCost)}</label>
        </li>
      )}
    </>
  );
};
