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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '0.85rem'
              }}>
                장원
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-main)' }}>(주)장원 jw-fs.kr</h3>
            </div>
            <p style={{ lineHeight: 1.65, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {COMPANY_INFO.slogan}<br />
              HACCP 인증 제2018-0415호 지정 기업
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
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.8rem' }}>본사 및 물류센터 정보</h4>
            <p style={{ lineHeight: 1.6 }}>
              대표이사: {COMPANY_INFO.ceo}<br />
              본사: {COMPANY_INFO.address}<br />
              대표전화: {COMPANY_INFO.tel} | 팩스: {COMPANY_INFO.fax}<br />
              이메일: {COMPANY_INFO.email}
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.8rem' }}>
          <p>© 2026 (주)장원 (jw-fs.kr Reference Official Site). All rights reserved.</p>
          <p style={{ marginTop: '0.2rem' }}>본 웹사이트의 서브페이지 체계는 (주)장원 Official 웹사이트를 기반으로 제작되었습니다.</p>
        </div>
      </div>
    </footer>
  );
}
