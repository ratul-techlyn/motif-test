"use client"
import React, { useEffect } from 'react';
import Head from 'next/head';
import AnimatedFollower3 from './Mus2';
import Card from "@/app/(public)/test/Card";

const App = () => {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="relative">
      {/* <AnimatedFollower /> */}
      <AnimatedFollower3 />

        {/*start product grid */}
<div className="max-w-7xl mx-auto">
  <Card/>
</div>

    </div>
    </>
  );
};

export default App;
