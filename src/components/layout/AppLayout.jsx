import React from 'react';
import Head from 'next/head';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import SideNavigation from './SideNavigation';

const AppLayout = ({ children, title = 'JoosT - Fresh & Healthy Juices' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Order fresh, healthy juices at affordable prices" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Side Navigation for Desktop */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <SideNavigation />
        </div>
        
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="flex-grow container mx-auto px-4 pb-20 lg:pb-6 lg:max-w-4xl xl:max-w-6xl">
            {children}
          </main>
          
          {/* Bottom Navigation only for Mobile */}
          <div className="lg:hidden">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
