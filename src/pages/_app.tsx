import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";
import { useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main
          className={`${montserrat.variable} bg-fill min-h-screen  font-sans`}
        >
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
