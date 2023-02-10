import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MJ Anglin</title>
        <meta name="description" content="MJ Anglin | Web Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} 
      />
    </>
  );
};
