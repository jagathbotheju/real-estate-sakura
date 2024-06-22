"use client";
import { formatPrice } from "@/lib/formatPrice";
import { SubscriptionPlan, User } from "@prisma/client";
import { Button, buttonVariants } from "./ui/button";
import CheckoutForm from "./CheckoutForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import PurchasePlan from "./PurchasePlan";
import { createPaymentIntent } from "@/actions/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeWrapper from "./StripeWrapper";

interface Props {
  plan: SubscriptionPlan;
  user: User;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Plan = ({ plan, user }: Props) => {
  const [open, setOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    const paymentIntent = await createPaymentIntent(
      450 * 100,
      `Payment of the user ${user.name} for buying ${plan.name}`
    );
    setClientSecret(paymentIntent.client_secret);
    setShowCheckout(true);
    setLoading(false);
  };

  useEffect(() => {
    initiatePayment();
  }, []);

  console.log("Plan", plan);

  return (
    <div className="border rounded shadow flex flex-col justify-between gap-5 p-5">
      <h1 className="text-xl font-bold text-center text-primary-500">
        {plan.name}
      </h1>
      <h1 className="text-2xl lg:text-4xl text-orange-600 text-center font-semibold">
        {formatPrice(plan.price)}
      </h1>
      <hr />
      <div className="flex flex-col gap-1">
        {plan.features.split(",").map((feature, index) => (
          <div className="flex-grow" key={index}>
            <p className="text-slate-500 text-sm">{feature.trim()}</p>
          </div>
        ))}
      </div>

      {plan.price === 0 ? (
        <>
          <Button disabled={true}>Free</Button>
        </>
      ) : (
        <>
          <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger>
              <div className={cn("w-full", buttonVariants())}>
                <p>Purchase</p>
              </div>
            </DialogTrigger>
            <DialogContent aria-describedby="payment">
              <DialogHeader>
                <DialogTitle>Complete your Subscription</DialogTitle>
              </DialogHeader>
              <CheckoutForm plan={plan} setOpen={setOpen} user={user} />
              {/* <PurchasePlan plan={plan} user={user}/> */}
              {/* {clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: clientSecret,
                  }}
                >
                </Elements>
                )} */}
              <CheckoutForm plan={plan} user={user} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Plan;
