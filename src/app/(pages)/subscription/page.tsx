import { auth } from "@/auth";
import Plan from "@/components/Plan";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const subscription = prisma.subscriptionPlan.findMany();
  const session = await auth();
  const user = session?.user as User;

  if (!user) redirect("auth/signin");

  return (
    <div className="flex container px-20 mx-auto mt-10 ">
      <div className="flex flex-col w-full items-center-center">
        <h2 className="text-3xl font-semibold py-2-">Subscription Plans</h2>
        <Separator className="mt-2 bg-slate-500" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 w-fit rounded-md self-center">
          {(await subscription).map((item) => (
            <Plan plan={item} key={item.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
