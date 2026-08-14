import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NavigationBar } from './components/Navbar';
import SubpageHeader from './components/SubpageHeader';
import Footer from './components/Footer';
import SchoolSearchModal from './components/SchoolSearchModal';
import ScrollToTopButton from './components/ScrollToTopButton';

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
import Admin from './pages/Admin';
import BoardPage from './pages/BoardPage';
import { Sparkles } from 'lucide-react';

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
        return <ProductCatalog isPromotionOnly={false} showAllBrandsOption={false} />;
      case 'promotions':
        return <BoardPage category="promotion" heading="신상품&행사" icon={Sparkles} emptyText="아직 등록된 신상품&행사 소식이 없습니다." />;
      case 'recipes':
        return <WeeklyMenu />;
      case 'weekly':
        return <WeeklyMenu />;
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
      case 'admin':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 🌟 1. Subpage Real-Photo Hero Banner Header */}
      <SubpageHeader />

      {/* 🌟 2. Navigation Bar Located Directly Below the Subpage Hero Image */}
      {currentPage !== 'home' && <NavigationBar />}

      {/* 🌟 3. Main Page Content */}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      <Footer />
      <SchoolSearchModal />
      <ScrollToTopButton />
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
