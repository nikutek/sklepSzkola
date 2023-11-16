import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Header from "~/components/header";
import { QueryClient, QueryClientProvider } from "react-query";
import "~/styles/globals.css";
import { Toaster } from "components/ui/toaster";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
