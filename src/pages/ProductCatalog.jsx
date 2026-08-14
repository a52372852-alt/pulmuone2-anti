import React, { useState, useEffect, useMemo } from 'react';
import { BRANDS, PROMOTION_PRODUCTS } from '../data/jwFsOriginalData';
import { useApp } from '../context/AppContext';
import { Search, Tag, Sparkles, Filter, CheckCircle2, ChevronRight, Home } from 'lucide-react';

// 🌟 풀무원[풀스키친] 전용 30개 서브 카테고리 태그 목록 (유저 요청 캡처 화면 100% 반영)
const PULMUONE_SUB_CATEGORIES = [
  "전체보기", "식물성지구식단", "경두부류", "연.순두부류", "묵류", "계란류", "두부가공류",
  "육가공류", "만두류", "면류", "떡류", "어묵류", "음료류/아이스류",
  "후식/빵류", "치즈류/유제품", "후식떡류", "후식과일류", "절임.찬류", "소스류",
  "양념류", "분가공류", "장류", "유지류", "나물류", "해조(김)류",
  "건해조류", "수산물", "수산가공류", "곡물바/너츠류", "세트제품", "특식"
];

// 🌟 더 슬로우메이드 전용 서브 카테고리 태그 목록 (http://jw-fs.kr/product/643 100% 반영)
const SLOWMADE_SUB_CATEGORIES = [
  "전체보기", "꼬꼬킷", "함박/육가공류", "떡갈비/적전류", "미트볼류", "탕수육류", "음료류", "핫도그/후식류", "더 스윗(디저트)"
];

export default function ProductCatalog({ isPromotionOnly = false, defaultBrandId = 'pulmuone', showAllBrandsOption = true, sortNewestFirst = false }) {
  const { globalSearchTerm, setGlobalSearchTerm, productOverrides } = useApp();
  const [selectedBrandId, setSelectedBrandId] = useState(defaultBrandId);
  const [selectedSubCategory, setSelectedSubCategory] = useState('전체보기');
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm || '');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 관리자가 올린 이미지/주원료/유통기한/공지메모를 기본 상품 데이터에 덮어씌움
  const mergedProducts = useMemo(() => {
    return PROMOTION_PRODUCTS.map(p => {
      const ov = productOverrides[p.id];
      if (!ov) return p;
      return {
        ...p,
        img: ov.image_url || p.img,
        name: ov.name || p.name,
        salePrice: ov.price || p.salePrice,
        spec: ov.spec || p.spec,
        mainIngredient: ov.main_ingredient || p.mainIngredient,
        storage: ov.storage || p.storage,
        shelfLife: ov.shelf_life || p.shelfLife,
        noticeMemo: ov.notice_memo || p.noticeMemo,
        updatedAt: ov.updated_at || null,
      };
    });
  }, [productOverrides]);

  useEffect(() => {
    if (globalSearchTerm) {
      setSearchTerm(globalSearchTerm);
    }
  }, [globalSearchTerm]);

  // 브랜드 변경 시 서브카테고리 초기화
  const handleBrandChange = (brandId) => {
    setSelectedBrandId(brandId);
    setSelectedSubCategory('전체보기');
    setSelectedProduct(null);
  };

  // 현재 브랜드에 따른 서브 카테고리 목록 추출
  const getSubCategories = () => {
    if (selectedBrandId === 'pulmuone') return PULMUONE_SUB_CATEGORIES;
    if (selectedBrandId === 'slowmade') return SLOWMADE_SUB_CATEGORIES;
    if (selectedBrandId === 'all') return ["전체보기"];
    
    // 타 브랜드의 경우 제품 카테고리에서 자동 추출
    const brandProducts = mergedProducts.filter(p => p.brandId === selectedBrandId);
    const subCats = new Set(["전체보기"]);
    brandProducts.forEach(p => {
      if (p.category.includes(' - ')) {
        subCats.add(p.category.split(' - ')[1].trim());
      } else {
        subCats.add(p.category);
      }
    });
    return Array.from(subCats);
  };

  const activeSubCategories = getSubCategories();

  // 제품 필터링 로직
  let filteredProducts = mergedProducts.filter(p => {
    const matchesBrand = selectedBrandId === 'all' || p.brandId === selectedBrandId;
    const matchesSearch = p.name.includes(searchTerm) || p.category.includes(searchTerm) || p.spec.includes(searchTerm);
    const matchesPromotion = !isPromotionOnly || p.isEvent;

    let matchesSubCategory = true;
    if (selectedSubCategory !== '전체보기') {
      matchesSubCategory = p.category.includes(selectedSubCategory) || p.name.includes(selectedSubCategory);
    }

    return matchesBrand && matchesSearch && matchesPromotion && matchesSubCategory;
  });

  // 전체 브랜드 보기에서는 관리자가 신규로 올린(수정한) 상품이 맨 앞에 오도록 정렬
  if (sortNewestFirst && selectedBrandId === 'all') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const at = a.updatedAt ? new Date(a.updatedAt).getTime() : -1;
      const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : -1;
      return bt - at;
    });
  }

  const selectedBrandObj = BRANDS.find(b => b.id === selectedBrandId) || { name: '전체 브랜드' };

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
          justifyContent: 'space-between',
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
            onClick={() => handleBrandChange('all')}
            className="btn btn-sm"
            style={{ backgroundColor: '#d97706', color: 'white', border: 'none', fontWeight: '700' }}
          >
            전체 상품 보기
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left Sidebar 30 Brands (랜딩페이지와 100% 동일한 제품소개 메뉴바) */}
        <aside className="brand-sidebar" style={{ width: '220px', flexShrink: 0 }}>
          <div className="brand-sidebar-header">
            <div className="brand-sidebar-title">제품소개</div>
            <div className="brand-sidebar-sub">PRODUCTS</div>
          </div>

          <ul className="brand-menu-list">
            {showAllBrandsOption && (
              <li
                onClick={() => handleBrandChange('all')}
                className={`brand-menu-item ${selectedBrandId === 'all' ? 'active' : ''}`}
              >
                <span>전체 브랜드</span>
                <span style={{ fontSize: '0.75rem', color: '#0b69c7' }}>›</span>
              </li>
            )}
            {BRANDS.map(brand => {
              const isSelected = selectedBrandId === brand.id;
              return (
                <li
                  key={brand.id}
                  onClick={() => handleBrandChange(brand.id)}
                  className={`brand-menu-item ${isSelected ? 'active' : ''}`}
                >
                  <span>{brand.name}</span>
                  {brand.hasArrow && <span style={{ fontSize: '0.75rem', color: '#0b69c7' }}>›</span>}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Right Main Product Content Area */}
        <main style={{ flex: 1 }}>

          {/* 🌟 1. Header Title & Breadcrumb (캡처 화면 100% 구현) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #0f172a', paddingBottom: '0.6rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#0284c7' }}>■</span> {selectedBrandObj.name}
              {selectedSubCategory !== '전체보기' && (
                <span style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: '700' }}>
                  - {selectedSubCategory}
                </span>
              )}
            </h2>

            {/* Breadcrumb Path */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              <Home size={14} />
              <span>› 제품소개 ›</span>
              <strong style={{ color: '#0f172a' }}>{selectedBrandObj.name}</strong>
              {selectedSubCategory !== '전체보기' && (
                <>
                  <span>›</span>
                  <strong style={{ color: '#0284c7' }}>{selectedSubCategory}</strong>
                </>
              )}
            </div>
          </div>

          {/* 🌟 2. Sub Category Grid Box (풀무원/더 슬로우메이드 및 브랜드별 카테고리 상세분류 100% 반영) */}
          {!selectedProduct && activeSubCategories.length > 1 && (
            <div style={{
              border: selectedBrandId === 'slowmade' ? '2px solid #f59e0b' : '2px solid #84cc16',
              backgroundColor: selectedBrandId === 'slowmade' ? '#fffbeb' : '#f7fee7',
              padding: '1rem 1.25rem',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              boxShadow: selectedBrandId === 'slowmade' ? '0 2px 8px rgba(245, 158, 11, 0.12)' : '0 2px 8px rgba(132, 204, 22, 0.1)'
            }}>
              <div style={{ fontSize: '0.88rem', fontWeight: '900', color: selectedBrandId === 'slowmade' ? '#b45309' : '#3f6212', marginBottom: '0.6rem' }}>
                {selectedBrandObj.name} 카테고리 상세분류 선택 (클릭 시 해당 서브페이지로 이동)
              </div>

              {/* Grid Layout */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: selectedBrandId === 'pulmuone' ? 'repeat(6, 1fr)' : 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '0.5rem 0.25rem',
                fontSize: '0.82rem',
                textAlign: 'center'
              }}>
                {activeSubCategories.map(subCat => {
                  const isSelected = selectedSubCategory === subCat;
                  const activeBg = selectedBrandId === 'slowmade' ? '#d97706' : '#65a30d';
                  const hoverBg = selectedBrandId === 'slowmade' ? '#fde68a' : '#d9f99d';
                  return (
                    <button
                      key={subCat}
                      onClick={() => setSelectedSubCategory(subCat)}
                      style={{
                        border: 'none',
                        background: isSelected ? activeBg : 'transparent',
                        color: isSelected ? '#ffffff' : '#334155',
                        fontWeight: isSelected ? '900' : '600',
                        padding: '0.35rem 0.2rem',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        fontSize: '0.8rem',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = hoverBg;
                          e.currentTarget.style.color = '#1e293b';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#334155';
                        }
                      }}
                    >
                      {subCat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 🌟 3. Search & Product Count Status Bar */}
          {!selectedProduct && (
            <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', backgroundColor: '#f8fafc', padding: '0.65rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0369a1' }}>
                  검색결과: 총 {filteredProducts.length}개 상품
                </span>
                {selectedSubCategory !== '전체보기' && (
                  <span style={{ fontSize: '0.78rem', backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>
                    {selectedSubCategory}
                  </span>
                )}
              </div>

              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="결과 내 재검색 (예: 두부, 만두)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.45rem 0.65rem 0.45rem 2.2rem',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* 🌟 4. Product Detail View (jw-fs.kr 스타일: 팝업 대신 같은 영역에서 상세 정보로 전환) */}
          {selectedProduct ? (
            <div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <div style={{ width: '280px', flexShrink: 0, border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '260px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <tbody>
                      {[
                        ['제품명', selectedProduct.name],
                        ['단가', <span key="price"><span style={{ fontWeight: '900', color: '#d32f2f', fontSize: '1.05rem' }}>{selectedProduct.salePrice}원</span> <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.82rem' }}>{selectedProduct.originalPrice}원</span></span>],
                        ['제품규격', selectedProduct.spec],
                        ['주원료', selectedProduct.mainIngredient || '-'],
                        ['보관방법', selectedProduct.storage],
                        ['유통기한', selectedProduct.shelfLife || '-'],
                      ].map(([label, value]) => (
                        <tr key={label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.6rem 0.5rem', width: '110px', verticalAlign: 'top' }}>
                            <span style={{ display: 'inline-block', backgroundColor: 'var(--jw-blue-main)', color: '#ffffff', fontSize: '0.78rem', fontWeight: '800', padding: '0.25rem 0.6rem', borderRadius: '3px' }}>
                              {label}
                            </span>
                          </td>
                          <td style={{ padding: '0.6rem 0.5rem', color: '#1e293b', fontWeight: '600' }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    {selectedProduct.isEvent && (
                      <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#d32f2f', border: '1px solid #fca5a5', backgroundColor: '#fef2f2', padding: '0.3rem 0.7rem', borderRadius: '4px' }}>
                        행사상품
                      </span>
                    )}
                    <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0369a1', border: '1px solid #bae6fd', backgroundColor: '#f0f9ff', padding: '0.3rem 0.7rem', borderRadius: '4px' }}>
                      학교급식 특별단가
                    </span>
                  </div>

                  {selectedProduct.noticeMemo && (
                    <div style={{ marginTop: '1.25rem', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '0.9rem 1rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '900', color: '#b45309', marginBottom: '0.35rem' }}>
                        📌 조리사 안내 메모
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#78350f', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {selectedProduct.noticeMemo}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 2.5rem', fontSize: '0.85rem', fontWeight: '800' }}
                >
                  BACK
                </button>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <Filter size={40} color="#94a3b8" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#475569' }}>선택하신 조건에 해당하는 제품이 준비 중입니다.</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>다른 서브 카테고리나 전체 보기를 선택해 보세요.</p>
              <button
                onClick={() => { setSelectedSubCategory('전체보기'); setSearchTerm(''); setGlobalSearchTerm(''); }}
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1rem' }}
              >
                카테고리 초기화
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

                  <div className="product-title" style={{ color: '#0369a1', fontWeight: '800', marginTop: '0.5rem' }}>
                    {product.category}
                  </div>
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
                    상세 정보 및 견적 보기
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
