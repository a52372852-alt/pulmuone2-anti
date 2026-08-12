import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/jwFsData';
import { Building2, Award, History, MapPin, Users, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function Company() {
  const [activeTab, setActiveTab] = useState('ceo');

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>ABOUT (주)장원</span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          회사소개 (Company Overview)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
          {COMPANY_INFO.slogan} - 18년 전통의 기술력과 HACCP 위생 인프라로 우리 아이들의 안심 식탁을 책임집니다.
        </p>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
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
            style={{ padding: '0.65rem 1.5rem', borderRadius: 'var(--radius-full)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: CEO Message */}
      {activeTab === 'ceo' && (
        <div className="glass-card" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <span className="badge badge-accent" style={{ marginBottom: '0.8rem' }}>대표이사 인사말</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1.3, marginBottom: '1.25rem' }}>
              "바른 식재료가 우리 아이들의 건강한 미래를 만듭니다."
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.95rem' }}>
              안녕하십니까, (주)장원 대표이사 장원식입니다.
              저희 (주)장원은 2008년 설립 이래 오직 '학교급식 위생·안전'만을 목표로 달리며, 전국 1,200여 개 학교 및 기관에 친환경 식재료를 안정적으로 공급해 왔습니다.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              새벽 콜드체인 수송부터 방사능·잔류농약 100% 정밀 검수 시스템까지, 내 가족이 먹는다는 마음으로 철저한 위생 관리를 약속드립니다.
            </p>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-main)' }}>
              (주)장원 대표이사 <span style={{ color: 'var(--primary)' }}>장 원 식</span>
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
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)' }}>🏆 (주)장원 주요 핵심 지표</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> 설립일: {COMPANY_INFO.established}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> HACCP 인증: {COMPANY_INFO.haccpNo}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> 일일 배송 학교: 전국 1,200개교+
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--primary)" /> 콜드체인 차량: 85대 풀가동
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: History */}
      {activeTab === 'history' && (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={24} color="var(--primary)" /> (주)장원의 발자취 (History)
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
            <Users size={24} color="var(--secondary)" /> (주)장원 체계적 조직 구성
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

      {/* Tab 4: Location */}
      {activeTab === 'location' && (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={24} color="var(--accent)" /> 본사 및 대형 물류센터 위치
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'var(--bg-page)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--text-main)' }}>🏢 본사 및 R&D 센터</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>📍 주소: {COMPANY_INFO.address}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>📞 대표전화: {COMPANY_INFO.tel}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>✉️ 이메일: {COMPANY_INFO.email}</p>
            </div>

            <div style={{ backgroundColor: 'var(--primary-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>🚚 수도권 제1 콜드체인 물류센터</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>경기도 용인시 처인구 남사읍 급식물류대로 88 (HACCP 제2018-0415호 지정)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
