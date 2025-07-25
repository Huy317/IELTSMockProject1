import React, { useEffect } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Dreams LMS | Advanced Learning Management System Template",
  description = "Dreams LMS is a powerful Learning Management System template designed for educators, training institutions, and businesses. Manage courses, track student progress, conduct virtual classes, and enhance e-learning experiences with an intuitive and feature-rich platform."
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Load external scripts (Bootstrap JS functionality)
    const loadScripts = () => {
      // Bootstrap bundle is typically loaded via CDN or npm package
      // Theme script for dark/light mode toggle
      const themeScript = document.createElement('script');
      themeScript.src = '/assets/js/theme-script.js';
      themeScript.async = true;
      document.body.appendChild(themeScript);

      // Custom script for site functionality
      const customScript = document.createElement('script');
      customScript.src = '/assets/js/script.js';
      customScript.async = true;
      document.body.appendChild(customScript);

      return () => {
        // Cleanup scripts on unmount
        document.body.removeChild(themeScript);
        document.body.removeChild(customScript);
      };
    };

    const cleanup = loadScripts();
    return cleanup;
  }, [title, description]);

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