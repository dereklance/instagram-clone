import { signOut, useSession } from "next-auth/react";
import type { PropsWithChildren } from "react";

export const RootLayout = ({ children }: PropsWithChildren) => {
  const { status: sessionStatus } = useSession();

  return (
    <div>
      {sessionStatus === "authenticated" && (
        <div className="fixed flex h-screen w-[244px] flex-col justify-between border-r border-black/25 p-4">
          <div className="">
            <div className="text-2xl font-bold">My App Name</div>
            <div>Home</div>
            <div>Search</div>
            <div>Explore</div>
            <div>Messages</div>
            <div>Notifications</div>
            <div>Create</div>
            <div>Profile</div>
          </div>

          <button
            className="rounded border border-black/25 py-2"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
      )}

      <div className="ml-[244px] flex min-h-screen flex-col items-center bg-[rgb(250,250,250)] py-12">
        {children}
      </div>
    </div>
  );
};
