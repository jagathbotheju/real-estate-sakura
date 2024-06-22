"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { SubscriptionPlan, User } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/actions/payment";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import StripeWrapper from "./StripeWrapper";

interface Props {
  plan: SubscriptionPlan;
  setOpen: (open: boolean) => void;
  user: User;
}

const CheckoutForm = ({ plan, user, setOpen }: Props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!elements || !stripe) return;

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/user/profile",
        },
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Payment Successful");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StripeWrapper user={user} plan={plan}>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{
              mode: "billing",
            }}
          />
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Pay
            </Button>
          </div>
        </form>
      </StripeWrapper>
    </>
  );
};

export default CheckoutForm;
