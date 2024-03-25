"use client";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";

export const ProceedPaymentButton = () => {
  const items = useCartStore((state) => state.items);
  const contactInfo = useCartStore((state) => state.contactInfo);
  const address = useCartStore((state) => state.address);
  const shippingCost = useCartStore((state) => state.shippingCost);
  const setShippingCost = useCartStore((state) => state.setShippingCost);

  const router = useRouter();

  const getDisabled = () => {
    return (
      Object.keys(address).length > 0 &&
      contactInfo.email.length > 0 &&
      contactInfo.phone.length > 0 &&
      items > 0 &&
      shippingCost > 0
    );
  };

  const handleProceed = async () => {
    setShippingCost(12500);
    router.replace(`/checkout/pago`);
  };

  return (
    <button
      onClick={handleProceed}
      disabled={!getDisabled()}
      className="button-main disabled:opacity-25"
    >
      Proceder al pago
    </button>
  );
};
