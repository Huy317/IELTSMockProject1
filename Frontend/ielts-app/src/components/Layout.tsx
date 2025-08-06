import Header from './layout/Header';
import Footer from './layout/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="main-wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;