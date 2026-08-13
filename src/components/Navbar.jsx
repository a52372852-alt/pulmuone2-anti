import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sun, Moon, MapPin } from 'lucide-react';

export default function Navbar() {
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
    { id: 'company', label: '회사소개' },
    { id: 'products', label: '제품소개' },
    { id: 'promotions', label: '신상품&행사' },
    { id: 'recipes', label: '레시피&식단' },
    { id: 'customer', label: '고객센터' },
    { id: 'business', label: '사업영역' },
    { id: 'hygiene', label: '위생/품질' },
    { id: 'search', label: '학교급식 알리미' }
  ];

  return (
    <header className="no-print" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      {/* Top Utility Header Bar */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', padding: '0.35rem 0', fontSize: '0.78rem', color: '#64748b' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span>📞 고객지원 센터: <strong>031-000-0000</strong></span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span>⏱️ 상담시간: 평일 08:30 ~ 17:30</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={() => setCurrentPage('search')} style={{ background: 'none', border: 'none', color: '#0284c7', fontWeight: '700', cursor: 'pointer', fontSize: '0.78rem' }}>
              🔍 학교급식 검색
            </button>
            <button onClick={() => setCurrentPage('community')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '0.78rem' }}>
              💬 영양사 커뮤니티
            </button>
            <button onClick={() => setCurrentPage('customer')} style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: '700', cursor: 'pointer', fontSize: '0.78rem' }}>
              📝 1:1 견적문의
            </button>
          </div>
        </div>
      </div>

      {/* Main Logo & Header Banner */}
      <div className="container" style={{ padding: '0.85rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo (주)장원 */}
        <div onClick={() => setCurrentPage('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} title="홈으로 이동">
          {/* 3 Circular Dots Logo Icon */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#f97316' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0284c7' }}></div>
          </div>

          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>
              (주)장원
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: '700' }}>jw-fs.kr 학교급식 식자재유통 전문기업</span>
          </div>
        </div>

        {/* Right Header Visual Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)',
          padding: '0.55rem 1.25rem',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0369a1', letterSpacing: '-0.02em' }}>
              For <span style={{ color: '#10b981' }}>health life!</span> your <span style={{ color: '#f59e0b' }}>JANGWON SERVICE</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: '700', marginTop: '0.1rem' }}>
              신선하고 믿을 수 있는 학교급식 식자재유통 전문기업
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="btn btn-outline btn-sm" style={{ padding: '0.4rem', borderRadius: '50%' }} title="테마 변경">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} color="#f59e0b" />}
          </button>
        </div>
      </div>

      {/* Blue Navigation Bar */}
      <div className="jw-nav-bar" style={{ backgroundColor: '#0284c7', background: 'linear-gradient(90deg, #0369a1 0%, #0284c7 100%)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '46px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            {navMenuItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`jw-nav-item ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '0 1.2rem',
                    height: '100%',
                    border: 'none',
                    background: isActive ? '#0369a1' : 'transparent',
                    color: '#ffffff',
                    fontWeight: isActive ? '900' : '700',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? 'inset 0 -3px 0 #fde047' : 'none'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Product Search Input Bar */}
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'white' }}>제품검색</span>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.82rem',
                borderRadius: '4px',
                border: '1px solid #cbd5e1',
                outline: 'none',
                width: '150px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#0369a1',
                color: 'white',
                border: '1px solid #0284c7',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
              title="검색"
            >
              🔍
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

