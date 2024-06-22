"use client";
import { createPaymentIntent } from "@/actions/payment";
import { SubscriptionPlan, User } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "./ui/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

interface Props {
  plan: SubscriptionPlan;
  user: User;
}

const PurchasePlan = ({ plan, user }: Props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    const paymentIntent = await createPaymentIntent(
      plan.price * 100,
      `Payment of the user ${user.name} for buying ${plan.name}`
    );
    setClientSecret(paymentIntent.client_secret);
    setShowCheckout(true);
    setLoading(false);
  };

  return <Button onClick={initiatePayment}>PurchasePlan</Button>;
};

export default PurchasePlan;
