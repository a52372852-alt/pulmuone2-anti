import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SchoolSearchModal from './components/SchoolSearchModal';

import Home from './pages/Home';
import Company from './pages/Company';
import Business from './pages/Business';
import Hygiene from './pages/Hygiene';
import ProductCatalog from './pages/ProductCatalog';
import WeeklyMenu from './pages/WeeklyMenu';
import CustomerCenter from './pages/CustomerCenter';
import SchoolSearch from './pages/SchoolSearch';

function MainContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'company':
        return <Company />;
      case 'business':
        return <Business />;
      case 'hygiene':
        return <Hygiene />;
      case 'products':
        return <ProductCatalog />;
      case 'weekly':
        return <WeeklyMenu />;
      case 'customer':
        return <CustomerCenter />;
      case 'search':
        return <SchoolSearch />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer />
      <SchoolSearchModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
