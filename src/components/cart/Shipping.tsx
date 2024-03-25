import { Address } from "@/interfaces/address";
import { CartProductSummary } from "./CartProductSummary";
import { ShippingDetail } from "./ShippingDetail";

interface Props {
  addresses: Address[];
  authId: string;
}

export const Shipping = ({ addresses, authId }: Props) => {
  return (
    <section>
      <CartProductSummary summary={false} />
      <ShippingDetail authId={authId} addresses={addresses} />
    </section>
  );
};
