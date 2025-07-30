import React from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({children}: LayoutProps) {


  return (
    <div className="main-wrapper">
      <TopBar />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;