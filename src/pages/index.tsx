import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { InitializeProfile } from "../features/auth/InitializeProfile";
import { SignInPage } from "../features/auth/SignInPage";
import { Feed } from "../features/feed/Feed";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { status, data: session } = useSession();
  const { data: profile, isFetched } = trpc.user.me.useQuery(undefined, {
    enabled: session?.user !== undefined,
  });

  // if (!isFetched) {
  //   return <div>Loading...</div>;
  // }

  switch (status) {
    case "unauthenticated":
      return <SignInPage />;
    case "loading":
      return <div>Loading...</div>;
    case "authenticated": {
      if (profile) {
        return <Feed />;
      } else {
        return <InitializeProfile />;
      }
    }
  }
};

export default Home;
