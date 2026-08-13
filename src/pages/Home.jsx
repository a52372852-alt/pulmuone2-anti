import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRANDS, PROMOTION_PRODUCTS, MAIN_NOTICES, RECOMMENDED_RECIPES } from '../data/jwFsOriginalData';
import { Sparkles, Tag, Leaf } from 'lucide-react';
import { NavigationBar } from '../components/Navbar';

export default function Home() {
  const { setCurrentPage } = useApp();
  const [selectedBrandId, setSelectedBrandId] = useState('pulmuone');
  const [activeTab, setActiveTab] = useState('promotions');

  const filteredProducts = PROMOTION_PRODUCTS.filter(p => p.brandId === selectedBrandId || selectedBrandId === 'all');

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>

      {/* 🌟 1. FRESH REAL-PHOTO HERO BANNER (상단 높이 100px 확대: minHeight 380px) */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url("/hero-fresh-produce.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 50%',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.75rem 0 1.25rem 0',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>

          {/* 🌟 Bottom Right Basket Area Box: Centered Logo + Centered Text Below */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
            backdropFilter: 'blur(8px)',
            maxWidth: '330px',
            margin: 0
          }}>
            {/* 1. Official Logo Image Centered */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '0.4rem' }}>
              <img
                src="/seajin-logo-new.png"
                alt="주식회사 서진 로고"
                style={{
                  height: '56px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>

            {/* 2. Text Placed Below Logo Centered */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', width: '100%' }}>
              <h1 style={{
                fontSize: '1.05rem',
                fontWeight: '900',
                lineHeight: '1.4',
                letterSpacing: '-0.02em',
                color: '#0f172a',
                margin: 0,
                textAlign: 'center'
              }}>
                신선하고 믿을 수 있는 <br />
                <span style={{ color: '#0284c7', fontWeight: '900' }}>
                  학교급식 식자재유통 전문기업
                </span>
              </h1>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#64748b',
                marginTop: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem'
              }}>
                <Leaf size={13} color="#10b981" />
                <span>주식회사 서진 · 충남 홍성 내포물류센터</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🌟 2. NAVIGATION BAR LOCATED DIRECTLY BELOW THE HERO IMAGE (히어로 이미지 바로 아래로 위치 복원) */}
      <NavigationBar />

      {/* 🌟 3. MAIN CONTENT SECTION */}
      <div className="container" style={{ marginTop: '2rem' }}>

        {/* Middle 3-Column Content Block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>

          {/* Column 1: 신상품&행사 / 공지사항 Tab */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', borderBottom: '2px solid #0b69c7', marginBottom: '0.8rem' }}>
              <button
                onClick={() => setActiveTab('promotions')}
                style={{
                  padding: '0.4rem 0.8rem',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  color: activeTab === 'promotions' ? '#0b69c7' : '#64748b',
                  borderBottom: activeTab === 'promotions' ? '3px solid #0b69c7' : 'none',
                  marginBottom: '-2px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                신상품&행사
              </button>
              <button
                onClick={() => setActiveTab('notices')}
                style={{
                  padding: '0.4rem 0.8rem',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  color: activeTab === 'notices' ? '#0b69c7' : '#64748b',
                  borderBottom: activeTab === 'notices' ? '3px solid #0b69c7' : 'none',
                  marginBottom: '-2px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                공지사항
              </button>
              <span onClick={() => setCurrentPage('customer')} style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}>+ more</span>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', margin: 0, padding: 0 }}>
              {MAIN_NOTICES.map((text, idx) => (
                <li key={idx} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#334155', fontWeight: '600' }}>
                  • {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: 신상품&행사 New & Event Real Product Showcase */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>
              <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#d32f2f' }}>신상품&행사 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}>New & Event</span></span>
              <span onClick={() => setCurrentPage('promotions')} style={{ fontSize: '0.75rem', color: '#0b69c7', fontWeight: '700', cursor: 'pointer' }}>+ more</span>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                {
                  id: 'p1',
                  title: '풀무원 두부선 핑거',
                  badge: '8월 신상품',
                  price: '3,200원',
                  img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 'p2',
                  title: '풀스키친 꿔바로우',
                  badge: '기획 할인',
                  price: '8,900원',
                  img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 'p3',
                  title: '바른콩 몽글 순두부',
                  badge: '친환경 특가',
                  price: '1,800원',
                  img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentPage('promotions')}
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'relative', width: '100%', height: '65px', overflow: 'hidden' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '3px', left: '3px', backgroundColor: '#d32f2f', color: '#ffffff', fontSize: '0.62rem', fontWeight: '800', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>
                      {item.badge}
                    </span>
                  </div>
                  <div style={{ padding: '0.4rem', fontSize: '0.73rem', fontWeight: '800', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.title}
                  </div>
                  <div style={{ padding: '0 0.4rem 0.4rem', fontSize: '0.72rem', fontWeight: '900', color: '#d32f2f' }}>
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: 추천레시피 Best Recipe Real Recipes Showcase */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>
              <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0b69c7' }}>추천레시피 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}>Best Recipe</span></span>
              <span onClick={() => setCurrentPage('recipes')} style={{ fontSize: '0.75rem', color: '#0b69c7', fontWeight: '700', cursor: 'pointer' }}>+ more</span>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                {
                  id: 'r1',
                  title: '수제 돈가스 & 브라운 소스',
                  category: '육류 메인',
                  img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 'r2',
                  title: '풀무원 바른콩 순두부 찌개',
                  category: '국 / 찌개',
                  img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80'
                },
                {
                  id: 'r3',
                  title: '궁중 떡잡채 특식',
                  category: '인기 반찬',
                  img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80'
                }
              ].map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setCurrentPage('recipes')}
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'relative', width: '100%', height: '65px', overflow: 'hidden' }}>
                    <img src={rec.img} alt={rec.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '3px', left: '3px', backgroundColor: 'rgba(3, 105, 161, 0.85)', color: '#ffffff', fontSize: '0.6rem', fontWeight: '800', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>
                      {rec.category}
                    </span>
                  </div>
                  <div style={{ padding: '0.4rem', fontSize: '0.73rem', fontWeight: '800', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {rec.title}
                  </div>
                  <div style={{ padding: '0 0.4rem 0.4rem', fontSize: '0.7rem', color: '#64748b' }}>
                    급식 인기 추천
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Main 2-Column Section */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

          {/* Left Sidebar: 제품소개 PRODUCTS */}
          <aside className="brand-sidebar">
            <div className="brand-sidebar-header">
              <div className="brand-sidebar-title">제품소개</div>
              <div className="brand-sidebar-sub">PRODUCTS</div>
            </div>

            <ul className="brand-menu-list">
              {BRANDS.map(brand => {
                const isSelected = selectedBrandId === brand.id;
                return (
                  <li
                    key={brand.id}
                    onClick={() => setSelectedBrandId(brand.id)}
                    className={`brand-menu-item ${isSelected ? 'active' : ''}`}
                  >
                    <span>{brand.name}</span>
                    {brand.hasArrow && <span style={{ fontSize: '0.75rem', color: '#0b69c7' }}>›</span>}
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Right Main Product Showcase Grid */}
          <main style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #0b69c7', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0b69c7', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                <Tag size={18} /> 주식회사 서진 & 풀무원[풀스키친] 학기별 할인 행사 상품
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>* 2026학년도 특별 공급 단가 적용</span>
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {filteredProducts.map(product => (
                <div key={product.id} className="product-item-card">
                  {/* Event Badge */}
                  {product.isEvent && <div className="event-badge">행사</div>}

                  {/* Product Image */}
                  <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '4px', marginTop: '0.5rem' }}>
                    <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Brand & Category Name */}
                  <div className="product-title">{product.category}</div>

                  {/* Product Full Name & Spec */}
                  <div className="product-subtitle">
                    {product.name}<br />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>{product.spec}</span>
                  </div>

                  {/* Original Price */}
                  <div className="product-original-price">
                    {product.originalPrice}원
                  </div>

                  {/* Sale Price */}
                  <div className="product-sale-price">
                    {product.salePrice}원
                    <span style={{ fontSize: '0.7rem', display: 'block', color: '#d32f2f', fontWeight: '700', marginTop: '0.1rem' }}>
                      {product.term}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
