import ContextProviders from '@/components/layout/context-provider';
import Layout from '@/components/layout/layout'
import PageLoader from '@/components/ui/PageLoader';
import { PageContextProvider } from '@/contexts/page-context';
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Router, { useRouter } from "next/router";
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer;
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      timer = setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
      clearTimeout(timer);
    };
  }, []);
  return (
    <SessionProvider session={session}>
      <ContextProviders>
        {loading ? (
          <div className='pageloader'>
            <PageLoader />
          </div>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>

        )}
      </ContextProviders>
    </SessionProvider>
  );
}
