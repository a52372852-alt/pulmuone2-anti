import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

export const PAGE_HEADER_CONFIG = {
  company: {
    title: '회사소개',
    engTitle: 'COMPANY OVERVIEW',
    category: '기업안내',
    description: '(주)장원은 최고의 신선도와 엄격한 위생 관리로 학교급식 식자재 유통을 선도합니다.',
    breadcrumb: ['홈', '회사소개']
  },
  business: {
    title: '사업영역',
    engTitle: 'BUSINESS AREA',
    category: '사업안내',
    description: '학교급식, HMR 식자재 유통 및 풀무원 바른급식 파트너십을 추진합니다.',
    breadcrumb: ['홈', '사업영역']
  },
  products: {
    title: '제품소개',
    engTitle: 'PRODUCTS CATALOG',
    category: '식자재 카탈로그',
    description: '풀무원 바른급식 파트너 제품 및 (주)장원의 엄선된 맞춤형 식자재를 소개합니다.',
    breadcrumb: ['홈', '제품소개']
  },
  promotions: {
    title: '신상품 & 행사',
    engTitle: 'NEW & PROMOTIONS',
    category: '프로모션',
    description: '이달의 신상품 추천과 특별 할인 혜택 행사 상품을 만나보세요.',
    breadcrumb: ['홈', '신상품&행사']
  },
  recipes: {
    title: '레시피 & 식단',
    engTitle: 'RECIPES & MEALS',
    category: '급식 정보',
    description: '영양 균형을 고려한 월간/주간 식단표와 인기 급식 레시피를 제공합니다.',
    breadcrumb: ['홈', '레시피&식단']
  },
  hygiene: {
    title: '위생 & 품질관리',
    engTitle: 'HYGIENE & QUALITY',
    category: '안전성 검증',
    description: 'HACCP 기준 체계적인 위생 검수 및 cold-chain 물류 시스템 운영.',
    breadcrumb: ['홈', '위생/품질관리']
  },
  customer: {
    title: '고객센터',
    engTitle: 'CUSTOMER CENTER',
    category: '고객 지원',
    description: '공지사항 확인 및 학교급식 신규 납품/견적 문의 1:1 상담 서비스를 이용하세요.',
    breadcrumb: ['홈', '고객센터']
  },
  search: {
    title: '학교급식 조회',
    engTitle: 'SCHOOL MEAL SEARCH',
    category: '스마트 알리미',
    description: '전국 초·중·고등학교 급식 식단, 영양 정보 및 알레르기 성분을 조회합니다.',
    breadcrumb: ['홈', '학교급식 조회']
  },
  community: {
    title: '급식 커뮤니티',
    engTitle: 'COMMUNITY',
    category: '소통 공간',
    description: '학교 영양사 및 급식 관계자분들의 정보 공유와 소통을 위한 커뮤니티입니다.',
    breadcrumb: ['홈', '급식 커뮤니티']
  },
  nutrition: {
    title: '영양 & 건강 가이드',
    engTitle: 'NUTRITION GUIDE',
    category: '건강 정보',
    description: '성장기 학생들을 위한 균형 잡힌 영양 지침과 식생활 정보를 제공합니다.',
    breadcrumb: ['홈', '영양 가이드']
  },
  kitchen: {
    title: '조리실 시설안내',
    engTitle: 'KITCHEN EQUIPMENT',
    category: '시설 장비',
    description: '스마트 학교급식 조리실 기구 및 현대화 위생 설비를 안내합니다.',
    breadcrumb: ['홈', '조리실 시설안내']
  }
};

export default function SubpageHeader() {
  const { currentPage, setCurrentPage } = useApp();

  // If on home page, do not display subpage header
  if (currentPage === 'home' || !PAGE_HEADER_CONFIG[currentPage]) {
    return null;
  }

  const config = PAGE_HEADER_CONFIG[currentPage];

  return (
    <div className="subpage-header-banner" style={{
      background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0d9488 100%)',
      color: '#ffffff',
      padding: '2rem 1.25rem',
      boxShadow: 'inset 0 -2px 10px rgba(0,0,0,0.08)',
      marginBottom: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Circles */}
      <div style={{
        position: 'absolute',
        right: '-30px',
        top: '-40px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.06)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        right: '120px',
        bottom: '-50px',
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.04)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb Path */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.85)',
          marginBottom: '0.75rem',
          fontWeight: '600'
        }}>
          <button
            onClick={() => setCurrentPage('home')}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: 0,
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            <HomeIcon size={14} /> 홈
          </button>

          <ChevronRight size={14} style={{ opacity: 0.7 }} />

          <span>{config.category}</span>

          <ChevronRight size={14} style={{ opacity: 0.7 }} />

          <span style={{ color: '#fef08a', fontWeight: '700' }}>{config.title}</span>
        </div>

        {/* Title and Eng Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '800', opacity: 0.85, textTransform: 'uppercase' }}>
            {config.engTitle}
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {config.title}
          </h2>
          <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '650px', lineHeight: '1.5' }}>
            {config.description}
          </p>
        </div>
      </div>
    </div>
  );
}
