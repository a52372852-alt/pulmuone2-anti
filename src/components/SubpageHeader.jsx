import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

export const PAGE_HEADER_CONFIG = {
  company: {
    title: '회사소개',
    engTitle: 'COMPANY OVERVIEW',
    category: '기업안내',
    description: '주식회사 서진은 최고의 신선도와 엄격한 위생 관리로 학교급식 식자재 유통을 선도합니다.',
    breadcrumb: ['홈', '회사소개'],
    bgImage: '/off03.png'
  },
  business: {
    title: '사업영역',
    engTitle: 'BUSINESS AREA',
    category: '사업안내',
    description: '학교급식, HMR 식자재 유통 및 풀무원 바른급식 파트너십을 추진합니다.',
    breadcrumb: ['홈', '사업영역'],
    bgImage: '/subpage-company-bg.jpg'
  },
  products: {
    title: '제품소개',
    engTitle: 'PRODUCTS CATALOG',
    category: '식자재 카탈로그',
    description: '풀무원 바른급식 파트너 제품 및 주식회사 서진의 엄선된 맞춤형 식자재를 소개합니다.',
    breadcrumb: ['홈', '제품소개'],
    bgImage: '/subpage-products-bg.jpg'
  },
  promotions: {
    title: '서진 행사지',
    engTitle: 'NEW & PROMOTIONS',
    category: '프로모션',
    description: '이달의 신상품 추천과 특별 할인 혜택 행사 상품을 만나보세요.',
    breadcrumb: ['홈', '서진 행사지'],
    bgImage: '/subpage-promotions-bg.jpg'
  },
  recipes: {
    title: '서진 레시피',
    engTitle: 'RECIPES & MEALS',
    category: '급식 정보',
    description: '영양 균형을 고려한 월간/주간 식단표와 인기 급식 레시피를 제공합니다.',
    breadcrumb: ['홈', '서진 레시피'],
    bgImage: '/subpage-recipes-bg.jpg'
  },
  hygiene: {
    title: '위생 & 품질관리',
    engTitle: 'HYGIENE & QUALITY',
    category: '안전성 검증',
    description: 'HACCP 기준 체계적인 위생 검수 및 콜드체인 물류 시스템을 운용합니다.',
    breadcrumb: ['홈', '위생/품질관리'],
    bgImage: '/subpage-company-bg.jpg'
  },
  customer: {
    title: '고객센터',
    engTitle: 'CUSTOMER CENTER',
    category: '고객 지원',
    description: '공지사항 확인 및 학교급식 신규 납품/견적 문의 1:1 상담 서비스를 이용하세요.',
    breadcrumb: ['홈', '고객센터'],
    bgImage: '/subpage-customer-bg.jpg'
  },
  search: {
    title: '학교급식 조회',
    engTitle: 'SCHOOL MEAL SEARCH',
    category: '스마트 알리미',
    description: '전국 초·중·고등학교 급식 식단, 영양 정보 및 알레르기 성분을 조회합니다.',
    breadcrumb: ['홈', '학교급식 조회'],
    bgImage: '/subpage-recipes-bg.jpg'
  },
  community: {
    title: '급식 커뮤니티',
    engTitle: 'COMMUNITY',
    category: '소통 공간',
    description: '학교 영양사 및 급식 관계자분들의 정보 공유와 소통을 위한 커뮤니티입니다.',
    breadcrumb: ['홈', '급식 커뮤니티'],
    bgImage: '/subpage-customer-bg.jpg'
  },
  nutrition: {
    title: '영양 & 건강 가이드',
    engTitle: 'NUTRITION GUIDE',
    category: '건강 정보',
    description: '성장기 학생들을 위한 균형 잡힌 영양 지침과 식생활 정보를 제공합니다.',
    breadcrumb: ['홈', '영양 가이드'],
    bgImage: '/subpage-recipes-bg.jpg'
  },
  kitchen: {
    title: '조리실 시설안내',
    engTitle: 'KITCHEN EQUIPMENT',
    category: '시설 장비',
    description: '스마트 학교급식 조리실 기구 및 현대화 위생 설비를 안내합니다.',
    breadcrumb: ['홈', '조리실 시설안내'],
    bgImage: '/subpage-company-bg.jpg'
  },
  admin: {
    title: '관리자',
    engTitle: 'ADMIN',
    category: '사이트 관리',
    description: '관리자 로그인 페이지입니다. 상품 정보와 게시판 글을 관리합니다.',
    breadcrumb: ['홈', '관리자'],
    bgImage: '/admin-hero.png',
    overlay: 'linear-gradient(90deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.32) 50%, rgba(15, 23, 42, 0.15) 100%)'
  }
};

export default function SubpageHeader() {
  const { currentPage, setCurrentPage } = useApp();

  // If on home page, do not display subpage header
  if (currentPage === 'home' || !PAGE_HEADER_CONFIG[currentPage]) {
    return null;
  }

  const config = PAGE_HEADER_CONFIG[currentPage];
  const rawBgImg = config.bgImage || '/subpage-company-bg.jpg';
  const bgImg = `${import.meta.env.BASE_URL}${rawBgImg.replace(/^\//, '')}`;

  return (
    <div
      key={currentPage}
      className="subpage-header-banner"
      style={{
        position: 'relative',
        color: '#ffffff',
        padding: '3rem 1.25rem 3.5rem 1.25rem',
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
    >
      <div
        className="hero-bg-kenburns"
        style={{ backgroundImage: `url("${bgImg}")` }}
      />

      {/* Light/Medium Soft Overlay for high readability over real photo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: config.overlay || 'linear-gradient(90deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.55) 50%, rgba(15, 23, 42, 0.25) 100%)',
          zIndex: 1
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          className="hero-card-fade-in"
          style={{
            maxWidth: '680px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '1.5rem 1.75rem',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Clean & Sharp Breadcrumb Path (홈 > 서브페이지명) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.92rem',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '0.8rem',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
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
                fontSize: '0.92rem',
                fontWeight: '800'
              }}
            >
              <HomeIcon size={15} /> 홈
            </button>

            <span style={{ color: '#e2e8f0', margin: '0 0.15rem', fontWeight: '900' }}>&gt;</span>

            <span style={{ color: '#fde047', fontWeight: '900' }}>{config.title}</span>
          </div>

          {/* Title and Eng Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase' }}>
              {config.engTitle}
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.02em', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
              {config.title}
            </h2>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.98rem', color: 'rgba(241, 245, 249, 0.95)', lineHeight: '1.6', fontWeight: '500' }}>
              {config.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
