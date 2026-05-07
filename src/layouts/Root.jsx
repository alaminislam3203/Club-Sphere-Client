import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Auto Scroll To Top */}
      <ScrollToTop />

      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
