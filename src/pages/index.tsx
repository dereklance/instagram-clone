import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { SignInPage } from "../features/auth/SignInPage";
import { Feed } from "../features/feed/Feed";

const Home: NextPage = () => {
  const { status } = useSession();

  switch (status) {
    case "unauthenticated":
      return <SignInPage />;
    case "loading":
      return <div>Loading...</div>;
    case "authenticated":
      return <Feed />;
  }
};

export default Home;
