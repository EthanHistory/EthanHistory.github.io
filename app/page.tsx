'use client';

import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import MainPageBackGround from '@/app/components/MainPageBackGround';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  return (
    <div className="dark relative min-h-screen">
      <Head>
        <title>Home</title>
      </Head>
      <Script src="/js/util.js" strategy="beforeInteractive" />
      <Script src="/js/noise.min.js" strategy="beforeInteractive" />
      <Script
        src="/js/swirl.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('swirl.js script loaded');
          if (typeof window.setup === 'function') {
            window.setup();
          }
        }}
      />
      <div className="absolute inset-0 content--canvas z-0">
        {/* Canvas will be here */}
      </div>
      <MainPageBackGround />
    </div>
  );
};

export default Home;
