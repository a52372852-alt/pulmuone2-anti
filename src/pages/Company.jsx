import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/jwFsData';
import { Building2, Award, History, MapPin, Users, Phone, Mail, CheckCircle2, ExternalLink } from 'lucide-react';

export default function Company() {
  const [activeTab, setActiveTab] = useState('ceo');

  // 네이버 지도 연결 주소 (충남 홍성군 홍성읍 백월로 59 내포물류센터)
  const naverMapUrl = "https://map.naver.com/v5/search/" + encodeURIComponent(COMPANY_INFO.address);

  return (
    <div className="container animate-fade-in" style={{ padding: '1.5rem 1.25rem 3rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.3rem' }}>ABOUT 주식회사 서진</span>
        <h2 style={{ fontSize: '2.1rem', fontWeight: '800', marginBottom: '0.3rem' }}>
          회사소개 (Company Overview)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
          {COMPANY_INFO.slogan} - 신선한 자연 식재료와 HACCP 위생 인프라로 우리 아이들의 안심 식탁을 책임집니다.
        </p>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { id: 'ceo', label: 'CEO 인사말' },
          { id: 'history', label: '회사 연혁' },
          { id: 'organization', label: '조직도 & 경영철학' },
          { id: 'location', label: '오시는 길' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.55rem 1.4rem', borderRadius: 'var(--radius-full)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: CEO Message */}
      {activeTab === 'ceo' && (
        <div className="glass-card" style={{ padding: '1.8rem 2.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
          <div style={{ paddingTop: '0.2rem' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.7rem' }}>대표이사 인사말</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1.3, marginBottom: '1.25rem' }}>
              "바른 식재료가 우리 아이들의 건강한 미래를 만듭니다."
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.95rem' }}>
              안녕하십니까, 주식회사 서진입니다.
              저희 주식회사 서진은 오직 '학교급식 위생·안전'만을 목표로 달리며, 전국 초·중·고등학교 및 유치원, 복지기관에 친환경 식재료를 안정적으로 공급해 왔습니다.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              새벽 콜드체인 수송부터 방사능·잔류농약 정밀 검수 시스템까지, 내 가족이 먹는다는 마음으로 철저한 위생 관리를 약속드립니다.
            </p>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-main)' }}>
              주식회사 서진 <span style={{ color: 'var(--primary)' }}>임직원 일동</span>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--primary-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* 🌟 Newly Uploaded Official Seajin Logo Image (300x300 Size) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '0.8rem',
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '0.75rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)'
            }}>
              <img
                src="/seajin-official-logo.jpg"
                alt="주식회사 서진 공식 로고"
                style={{
                  width: '300px',
                  height: '300px',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--primary)', margin: 0, textAlign: 'center' }}>
              🏆 주식회사 서진 주요 핵심 지표
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> 상호명: {COMPANY_INFO.name}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> 본사 및 내포물류센터: {COMPANY_INFO.address}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> 대표전화: {COMPANY_INFO.tel} (팩스: {COMPANY_INFO.fax})
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> HACCP 위생 검수 지정 물류 센터 운영
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: History (주식회사 서진의 발자취로 수정 완료) */}
      {activeTab === 'history' && (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={24} color="var(--primary)" /> 주식회사 서진의 발자취 (History)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', borderLeft: '2px solid var(--primary)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
            {COMPANY_INFO.history.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-1.95rem',
                  top: '0.2rem',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  border: '3px solid var(--bg-surface)'
                }}></div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>{item.year}년</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-main)', marginTop: '0.2rem' }}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Organization */}
      {activeTab === 'organization' && (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={24} color="var(--secondary)" /> 주식회사 서진 체계적 조직 구성
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { name: "품질위생안전본부", role: "HACCP 검수, 방사능/잔류농약 정밀분석" },
              { name: "식재료 물류사업부", role: "새벽 콜드체인 수송, 3℃ 적정온도 배송" },
              { name: "영양컨설팅팀", role: "나이스(NEIS) 연동 표준 식단개발 및 상담" },
              { name: "고객행복센터", role: "1:1 영양사 및 조리실 맞춤 케어" },
            ].map((dept, i) => (
              <div key={i} style={{ backgroundColor: 'var(--bg-page)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.4rem' }}>{dept.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{dept.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Location (네이버 지도 길찾기 연동) */}
      {activeTab === 'location' && (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={24} color="var(--accent)" /> 본사 및 물류센터 위치 (오시는 길)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* 좌측: 회사 기본 정보 */}
            <div style={{ backgroundColor: 'var(--bg-page)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--text-main)' }}>🏢 주식회사 서진 본사 및 내포물류센터</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '700' }}>📍 주소: {COMPANY_INFO.address}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>📞 대표전화: {COMPANY_INFO.tel}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>📠 팩스: {COMPANY_INFO.fax}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>✉️ 이메일: {COMPANY_INFO.email}</p>
            </div>

            {/* 우측: 네이버 지도 길찾기 전용 카드 (요청대로 해당 위치로 변경) */}
            <div style={{
              backgroundColor: '#ecfdf5',
              padding: '1.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid #10b981',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🗺️</div>
              <h4 style={{ fontWeight: '900', fontSize: '1.15rem', color: '#065f46', marginBottom: '0.4rem' }}>네이버 지도 길찾기</h4>
              <p style={{ fontSize: '0.88rem', color: '#047857', marginBottom: '1.1rem', fontWeight: '600' }}>
                주식회사 서진 내포물류센터 오시는 길 및 실시간 실시간 경로를 확인하세요.
              </p>

              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  backgroundColor: '#03C75A',
                  color: '#ffffff',
                  padding: '0.8rem 1.4rem',
                  borderRadius: '8px',
                  fontWeight: '900',
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(3, 199, 90, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>네이버 지도로 길찾기 바로가기</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
