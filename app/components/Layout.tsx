'use client';

import Script from 'next/script';
import { ReactNode } from 'react';


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark relative min-h-screen">
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

      {/* Main Content */}
      <main className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
