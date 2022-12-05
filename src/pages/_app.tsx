import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { RootLayout } from "../layout/RootLayout";
import type { PropsWithChildren } from "react";
import { Fragment } from "react";

const LayoutWrapper = ({ children }: PropsWithChildren) => {
  const { data: session, status: sessionStatus } = useSession();
  const { data: profile } = trpc.user.me.useQuery(undefined, {
    enabled: session?.user !== undefined,
  });

  if (sessionStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (session?.user && profile) {
    return <RootLayout>{children}</RootLayout>;
  }

  return <Fragment>{children}</Fragment>;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
