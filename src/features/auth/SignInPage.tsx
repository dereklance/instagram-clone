import { signIn } from "next-auth/react";

export const SignInPage = () => {
  return (
    <div className="flex h-screen items-center">
      <div className="m-auto flex w-fit flex-col items-center border border-solid border-black/25 bg-white px-10 py-8">
        <div className="my-4 text-2xl font-bold">My App Name</div>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    </div>
  );
};
