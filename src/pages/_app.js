import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';


export default function App({ Component, pageProps }) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const router = useRouter();

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {

    if (router.asPath.includes('/articles/article') || router.asPath.includes('/games') || router.asPath.includes('/account')) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }

  }, [router])

  return (
    <>
      <Head>
        <title>MJ Anglin</title>
        <meta name="description" content="Hi, my name is MJ." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4b9084" />
        <meta name="author" content="MJ Anglin" />
        <link rel="icon" href="/favicon.ico" />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={showNav ? '' : 'hidden'}>
        <Navbar />
      </div>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
      <Component {...pageProps}
      />
      </SessionContextProvider>
    </>
  );
};
