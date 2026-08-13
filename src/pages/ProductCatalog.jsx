import React, { useState, useEffect } from 'react';
import { BRANDS, PROMOTION_PRODUCTS } from '../data/jwFsOriginalData';
import { useApp } from '../context/AppContext';
import { Search, Tag, Sparkles, Filter, CheckCircle2, PhoneCall } from 'lucide-react';

export default function ProductCatalog({ isPromotionOnly = false }) {
  const { globalSearchTerm, setGlobalSearchTerm, setCurrentPage } = useApp();
  const [selectedBrandId, setSelectedBrandId] = useState('all');
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm || '');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (globalSearchTerm) {
      setSearchTerm(globalSearchTerm);
    }
  }, [globalSearchTerm]);

  const filteredProducts = PROMOTION_PRODUCTS.filter(p => {
    const matchesBrand = selectedBrandId === 'all' || p.brandId === selectedBrandId;
    const matchesSearch = p.name.includes(searchTerm) || p.category.includes(searchTerm) || p.spec.includes(searchTerm);
    const matchesPromotion = !isPromotionOnly || p.isEvent;
    return matchesBrand && matchesSearch && matchesPromotion;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 3.5rem' }}>
      {/* Promotion Alert Header if in promotion mode */}
      {isPromotionOnly && (
        <div style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Sparkles size={28} color="#d97706" />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#92400e', fontWeight: '800' }}>
                🎉 이달의 특가 행사 & 신상품 프로모션
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#b45309' }}>
                학교급식 전용 파격 할인 및 이번 달 엄선된 신규 입고 상품 목록입니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedBrandId('all')}
            className="btn btn-sm"
            style={{ backgroundColor: '#d97706', color: 'white', border: 'none', fontWeight: '700' }}
          >
            전체 상품 보기
          </button>
        </div>
      )}

      {/* Top Search & Category Filter Bar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0369a1' }}>
            {isPromotionOnly ? '🔥 신상품/행사 상품' : '📦 전체 식자재'} ({filteredProducts.length}개)
          </span>
          {searchTerm && (
            <span style={{ fontSize: '0.8rem', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: '700' }}>
              검색어: "{searchTerm}"
              <button onClick={() => { setSearchTerm(''); setGlobalSearchTerm(''); }} style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '4px', color: '#0369a1', fontWeight: '900' }}>×</button>
            </span>
          )}
        </div>

        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="제품명/규격 검색 (예: 찌개전용두부, 돈가스)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem 0.55rem 2.4rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left Sidebar 30 Brands */}
        <aside className="brand-sidebar" style={{ width: '220px', flexShrink: 0 }}>
          <div className="brand-sidebar-header">
            <div className="brand-sidebar-title">브랜드 분류</div>
            <div className="brand-sidebar-sub">BRANDS</div>
          </div>

          <ul className="brand-menu-list">
            <li
              onClick={() => setSelectedBrandId('all')}
              className={`brand-menu-item ${selectedBrandId === 'all' ? 'active' : ''}`}
            >
              <span>전체 브랜드</span>
              <span style={{ fontSize: '0.75rem', color: '#0b69c7' }}>›</span>
            </li>
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

        {/* Right Products List */}
        <main style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <Filter size={40} color="#94a3b8" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#475569' }}>조건에 맞는 제품이 없습니다.</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>검색어나 브랜드 필터를 변경해 보세요.</p>
              <button
                onClick={() => { setSelectedBrandId('all'); setSearchTerm(''); setGlobalSearchTerm(''); }}
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1rem' }}
              >
                검색 조건 초기화
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1.25rem' }}>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="product-item-card"
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {product.isEvent && <div className="event-badge">행사</div>}

                  <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '4px', marginTop: '0.5rem' }}>
                    <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div className="product-title">{product.category}</div>
                  <div className="product-subtitle">
                    {product.name}<br />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>{product.spec}</span>
                  </div>

                  <div className="product-original-price">{product.originalPrice}원</div>
                  <div className="product-sale-price">
                    {product.salePrice}원
                    <span style={{ fontSize: '0.7rem', display: 'block', color: '#d32f2f', fontWeight: '700', marginTop: '0.1rem' }}>
                      {product.term}
                    </span>
                  </div>

                  <button
                    style={{
                      width: '100%',
                      marginTop: '0.6rem',
                      padding: '0.35rem',
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    상세 및 납품 문의 🔍
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedProduct(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
            >
              ×
            </button>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
              <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: '800' }}>{selectedProduct.category}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0.2rem 0' }}>{selectedProduct.name}</h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>규격: {selectedProduct.spec}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#d32f2f' }}>
                  {selectedProduct.salePrice}원 <span style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'line-through' }}>{selectedProduct.originalPrice}원</span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              <div>✔️ <strong>보관방법:</strong> 냉장보관 (0~5℃) 또는 냉동</div>
              <div>✔️ <strong>납품 단위:</strong> 박스 / 팩 단위 당일 물류 유통</div>
              <div>✔️ <strong>HACCP 위생 인증:</strong> 인증 완료 식자재</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => { setSelectedProduct(null); setCurrentPage('customer'); }}
                className="btn btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <PhoneCall size={16} /> 이 상품 견적/납품 문의하기
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="btn btn-outline"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

