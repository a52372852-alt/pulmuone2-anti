import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sun, Moon, MapPin } from 'lucide-react';

export default function Navbar() {
  const { currentPage, setCurrentPage, theme, toggleTheme } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCurrentPage('products');
    }
  };

  return (
    <header className="no-print" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      {/* Top Banner & Header (Logo + Banner Visual) */}
      <div className="container" style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo (주)장원 */}
        <div onClick={() => setCurrentPage('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
          {/* 3 Circular Dots Logo Icon */}
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#f97316' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          </div>

          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.03em' }}>
              (주)장원
            </h1>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>jw-fs.kr 식자재유통 전문기업</span>
          </div>
        </div>

        {/* Right Header Visual Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)',
          padding: '0.65rem 1.5rem',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          textAlign: 'right'
        }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0369a1', letterSpacing: '-0.02em' }}>
            For <span style={{ color: '#10b981' }}>health life!</span> your <span style={{ color: '#eab308' }}>JANGWON SERVICE</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '700', marginTop: '0.1rem' }}>
            신선하고 믿을 수 있는 학교급식 식자재유통 전문기업
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleTheme} className="btn btn-outline btn-sm" style={{ padding: '0.4rem', borderRadius: '50%' }}>
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} color="#f59e0b" />}
        </button>
      </div>

      {/* Blue Navigation Bar (jw-fs.kr 스크린샷 100% 반영) */}
      <div className="jw-nav-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '46px' }}>
          <nav style={{ display: 'flex', alignItems: 'center' }}>
            {[
              { id: 'company', label: '회사소개' },
              { id: 'products', label: '제품소개' },
              { id: 'promotions', label: '신상품&행사' },
              { id: 'recipes', label: '레시피&식단' },
              { id: 'customer', label: '고객센터' },
            ].map(item => {
              const isActive = currentPage === item.id || (item.id === 'products' && currentPage === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id === 'promotions' || item.id === 'recipes' ? 'products' : item.id)}
                  className={`jw-nav-item ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Product Search Input Bar */}
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'white' }}>제품검색</span>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.8rem',
                borderRadius: '3px',
                border: 'none',
                outline: 'none',
                width: '140px'
              }}
            />
            <button type="submit" style={{ backgroundColor: '#0284c7', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '3px', fontSize: '0.8rem', fontWeight: '700' }}>
              🔍
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
