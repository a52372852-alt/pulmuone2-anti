import React from 'react';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO } from '../data/jwFsData';

export default function Footer() {
  const { setCurrentPage } = useApp();

  return (
    <footer className="no-print" style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      padding: '3.5rem 0 2rem 0',
      marginTop: '4rem',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <img src={`${import.meta.env.BASE_URL}seajin-logo.jpg`} alt="주식회사 서진" style={{ height: '42px', objectFit: 'contain' }} />
            </div>
            <p style={{ lineHeight: 1.65, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {COMPANY_INFO.slogan}<br />
              HACCP 위생인증 안심 식자재 지정 유통기업
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.8rem' }}>서브페이지 메뉴</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><button onClick={() => setCurrentPage('company')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>🏢 회사소개 (CEO/연혁/오시는길)</button></li>
              <li><button onClick={() => setCurrentPage('business')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>💼 사업분야 (학교/영유아/복지)</button></li>
              <li><button onClick={() => setCurrentPage('hygiene')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>🛡️ 위생 & 품질관리 (HACCP)</button></li>
              <li><button onClick={() => setCurrentPage('products')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>🥬 식자재 상품 카탈로그</button></li>
              <li><button onClick={() => setCurrentPage('customer')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>📞 고객센터 & 견적 문의</button></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.8rem' }}>본사 및 내포물류센터 정보</h4>
            <p style={{ lineHeight: 1.6 }}>
              상호: 주식회사 서진<br />
              주소: 충남 홍성군 홍성읍 백월로 59 내포물류센터<br />
              대표전화: 041-634-1762 | 팩스: 041-634-9828<br />
              이메일: {COMPANY_INFO.email}
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.8rem' }}>
          <p>© 2026 주식회사 서진 (SEAJIN CO., LTD.). All rights reserved.</p>
          <p style={{ marginTop: '0.2rem' }}>신선하고 믿을 수 있는 학교급식 식자재유통 전문기업 주식회사 서진</p>
        </div>
      </div>
    </footer>
  );
}
