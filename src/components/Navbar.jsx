import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Home as HomeIcon, Lock } from 'lucide-react';

// 💎 3D Deep Blue Sapphire Crystal Full-Width Navigation Bar (웹사이트 좌우 100% 꽉 찬 3D 딥블루 크리스탈 바)
export function NavigationBar() {
  const { currentPage, setCurrentPage, theme, toggleTheme, globalSearchTerm, setGlobalSearchTerm } = useApp();
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setGlobalSearchTerm(searchTerm);
      setCurrentPage('products');
    }
  };

  const navMenuItems = [
    { id: 'home', label: '홈', icon: <HomeIcon size={16} style={{ marginRight: '4px' }} /> },
    { id: 'company', label: '회사소개' },
    { id: 'products', label: '제품소개' },
    { id: 'promotions', label: '신상품&행사' },
    { id: 'recipes', label: '레시피&식단' },
    { id: 'customer', label: '고객센터' },
    { id: 'admin', label: '관리자', icon: <Lock size={13} style={{ marginRight: '4px' }} /> }
  ];

  return (
    <div
      className="no-print jw-nav-bar"
      style={{
        // 🌟 1. Full-Width 100% Full Screen Width Navigation Bar
        width: '100%',
        background: 'linear-gradient(135deg, rgba(3, 105, 161, 0.96) 0%, rgba(2, 132, 199, 0.92) 45%, rgba(15, 23, 42, 0.96) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        // 🌟 2. 3D Silver Chrome & Sapphire Edge Highlights
        borderTop: '2px solid rgba(255, 255, 255, 0.85)',
        borderBottom: '1.5px solid rgba(186, 230, 253, 0.5)',
        boxShadow: '0 8px 30px rgba(2, 132, 199, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.65)',
        position: 'relative',
        zIndex: 100
      }}
    >
      <div className="container jw-nav-container">
        
        {/* 💎 3D Deep Blue Navigation Menu Buttons */}
        <nav className="jw-nav-menu">
          {navMenuItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`jw-nav-item ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0 1.1rem',
                  height: '100%',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  background: isActive
                    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.12) 100%)'
                    : 'transparent',
                  color: '#ffffff',
                  fontWeight: isActive ? '900' : '700',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textShadow: '0 2px 4px rgba(15, 23, 42, 0.85)',
                  boxShadow: isActive
                    ? 'inset 0 -3.5px 0 #fde047, 0 4px 15px rgba(253, 224, 71, 0.45)'
                    : 'none',
                  letterSpacing: '-0.01em'
                }}
              >
                {item.icon && item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Product Search & Theme Toggle */}
        <div className="jw-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span className="jw-search-label" style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff', textShadow: '0 1px 3px rgba(15,23,42,0.8)', whiteSpace: 'nowrap' }}>제품검색</span>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.3rem 0.5rem',
                fontSize: '0.8rem',
                borderRadius: '6px',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#0f172a',
                outline: 'none',
                width: '110px',
                fontWeight: '700',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.12)'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: 'white',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                padding: '0.3rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '900',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(3, 105, 161, 0.4)',
                whiteSpace: 'nowrap'
              }}
              title="검색"
            >
              🔍
            </button>
          </form>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.24)',
              border: '1.5px solid rgba(255, 255, 255, 0.85)',
              color: '#ffffff',
              padding: '0.35rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              flexShrink: 0
            }}
            title="테마 변경"
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} color="#f59e0b" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
