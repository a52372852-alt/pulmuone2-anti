import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import SubpageHeader from './components/SubpageHeader';
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
import Community from './pages/Community';
import NutritionGuide from './pages/NutritionGuide';
import KitchenIntro from './pages/KitchenIntro';

function MainContent() {
  const { currentPage } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
        return <ProductCatalog isPromotionOnly={false} />;
      case 'promotions':
        return <ProductCatalog isPromotionOnly={true} />;
      case 'recipes':
        return <WeeklyMenu initialTab="recipe" />;
      case 'weekly':
        return <WeeklyMenu initialTab="menu" />;
      case 'customer':
        return <CustomerCenter />;
      case 'search':
        return <SchoolSearch />;
      case 'community':
        return <Community />;
      case 'nutrition':
        return <NutritionGuide />;
      case 'kitchen':
        return <KitchenIntro />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <SubpageHeader />
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
