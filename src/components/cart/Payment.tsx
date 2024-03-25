import { PaymentSummary } from "./PaymentSummary";
import { CartProductSummary } from "./CartProductSummary";

interface Props {
  authId: string;
}

export const Payment = ({ authId }: Props) => {
  return (
    <section>
      <CartProductSummary summary={true} />
      <PaymentSummary authId={authId} />
    </section>
  );
};
