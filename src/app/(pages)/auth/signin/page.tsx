import { auth } from "@/auth";
import SignInForm from "@/components/SignInForm";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SignInPage = async ({ searchParams }: Props) => {
  const session = await auth();
  const user = session?.user;

  if (user) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col p-5 shadow-lg w-full md:w-[350px]">
        <h1 className="font-bold text-3xl mb-10 text-center">Log In</h1>

        <SignInForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
};

export default SignInPage;
