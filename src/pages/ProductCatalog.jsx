import React, { useState } from 'react';
import { BRANDS, PROMOTION_PRODUCTS } from '../data/jwFsOriginalData';
import { ShoppingBag, Search, Tag } from 'lucide-react';

export default function ProductCatalog() {
  const [selectedBrandId, setSelectedBrandId] = useState('pulmuone');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = PROMOTION_PRODUCTS.filter(p => {
    const matchesBrand = selectedBrandId === 'all' || p.brandId === selectedBrandId;
    const matchesSearch = p.name.includes(searchTerm) || p.category.includes(searchTerm);
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1rem' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.3rem' }}>PRODUCTS CATALOG</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0b69c7' }}>
            (주)장원 브랜드별 제품소개
          </h2>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="제품명 검색 (예: 찌개전용두부, 돈가스)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2.4rem',
              borderRadius: '4px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left Sidebar 30 Brands */}
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

        {/* Right Products List */}
        <main style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {filteredProducts.map(product => (
              <div key={product.id} className="product-item-card">
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
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
