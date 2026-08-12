import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRANDS, PROMOTION_PRODUCTS, MAIN_NOTICES, RECOMMENDED_RECIPES } from '../data/jwFsOriginalData';
import { ChevronRight, Sparkles, Tag, Flame } from 'lucide-react';

export default function Home() {
  const { setCurrentPage } = useApp();
  const [selectedBrandId, setSelectedBrandId] = useState('pulmuone');
  const [activeTab, setActiveTab] = useState('promotions');

  const filteredProducts = PROMOTION_PRODUCTS.filter(p => p.brandId === selectedBrandId || selectedBrandId === 'all');

  return (
    <div className="container animate-fade-in" style={{ padding: '1.5rem 1rem 4rem 1rem' }}>
      
      {/* 1. Middle 3-Column Content Block (스크린샷 2 중단 레이아웃 100% 동일) */}
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
                marginBottom: '-2px'
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
                marginBottom: '-2px'
              }}
            >
              공지사항
            </button>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}>+ more</span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem' }}>
            {MAIN_NOTICES.map((text, idx) => (
              <li key={idx} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#334155', fontWeight: '600' }}>
                • {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: 신상품&행사 New & Event Banner Showcase */}
        <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>
            <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#d32f2f' }}>신상품&행사 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}>New & Event</span></span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}>+ more</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, height: '100px', backgroundColor: '#f1f5f9', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>
                행사 포스터 {i}
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: 추천레시피 Best Recipe */}
        <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>
            <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0b69c7' }}>추천레시피 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}>Best Recipe</span></span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}>+ more</span>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {RECOMMENDED_RECIPES.map(rec => (
              <div key={rec.id} style={{ flex: 1, backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <img src={rec.image} alt={rec.title} style={{ width: '100%', height: '65px', objectFit: 'cover' }} />
                <div style={{ padding: '0.3rem 0.4rem', fontSize: '0.72rem', fontWeight: '700', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {rec.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Section (스크린샷 1 & 2 하단 2단 레이아웃 100% 동일) */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* Left Sidebar: 제품소개 PRODUCTS (30개 전체 브랜드 카테고리) */}
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

        {/* Right Main Product Showcase Grid (행사 배지 + 30,750원 -> 26,140원 할인가격) */}
        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #0b69c7', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0b69c7', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={18} /> 풀무원[풀스키친] 학기별 할인 행사 상품
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>* 2026학년도 1~2학기 특별 공급 단가 적용</span>
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {filteredProducts.map(product => (
              <div key={product.id} className="product-item-card">
                {/* Red Circular Event Badge (스크린샷 빨간 '행사' 배지 100% 동일) */}
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

                {/* Original Strikethrough Price (Blue) */}
                <div className="product-original-price">
                  {product.originalPrice}원
                </div>

                {/* Sale Price (Red Big Bold) */}
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
  );
}
