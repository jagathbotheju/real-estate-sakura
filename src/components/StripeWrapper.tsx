"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/actions/payment";
import { useEffect, useState } from "react";
import { SubscriptionPlan, User } from "@prisma/client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface Props {
  children: React.ReactNode;
  user: User;
  plan: SubscriptionPlan;
}

const StripeWrapper = ({ children, user, plan }: Props) => {
  const [mount, setMount] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    const paymentIntent = await createPaymentIntent(
      450 * 100,
      `Payment of the user ${user.name} for buying ${plan.name}`
    );
    setClientSecret(paymentIntent.client_secret);
    // setShowCheckout(true);
    // setLoading(false);
  };

  useEffect(() => {
    if (!mount) {
      initiatePayment();
      setMount(true);
    }
  }, []);

  if (!mount) return null;

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
          }}
        >
          {children}
        </Elements>
      )}
    </>
  );
};

export default StripeWrapper;
