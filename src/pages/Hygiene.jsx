import React from 'react';
import { HYGIENE_SYSTEMS } from '../data/jwFsData';
import { ShieldAlert, Thermometer, TestTube, CheckCircle2, Award, Zap } from 'lucide-react';

export default function Hygiene() {
  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>SAFETY & HYGIENE</span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          위생 & 품질관리 시스템 (Hygiene Control)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          주식회사 서진은 365일 무결점 HACCP 인증 위생 체계와 방사능·잔류농약 100% 정밀검사를 수행합니다.
        </p>
      </div>

      {/* 5 Step Process Grid */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={24} color="var(--primary)" /> 365일 안심 급식 위생관리 5단계 프로세스
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {HYGIENE_SYSTEMS.map(item => (
            <div key={item.step} style={{
              backgroundColor: 'var(--bg-page)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '0.8rem',
                right: '0.8rem',
                fontSize: '0.8rem',
                fontWeight: '800',
                color: 'var(--primary)',
                backgroundColor: 'var(--primary-light)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px'
              }}>
                STEP {item.step}
              </div>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.6rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.4rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Testing Laboratory & Cold Chain Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <TestTube size={22} color="var(--accent)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>자체 품질검사 연구소 (R&D)</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            당일 입고되는 농·수·축산물 전 품목에 대하여 잔류농약 320종 및 방사능(요오드, 세슘) 간이 검사를 매일 새벽 수행합니다.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--accent)" /> 방사능 정밀분석기(NaI 델타 스펙트럼) 도입
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--accent)" /> 잔류농약 속성 검사 키트 매일 100% 적용
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--accent)" /> 미생물(대장균, 식중독균) 수치 주간 전수검사
            </li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Thermometer size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>콜드체인 적정 온도 유지 시스템</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            입고부터 보관, 포장, 냉장 배송차량 수송까지 전 과정 3℃ 이하 적정 온도를 1초도 이탈하지 않는 자동 릴레이 모니터링을 운영합니다.
          </p>

          <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)' }}>
            <div style={{ fontWeight: '800', color: 'var(--primary)', marginBottom: '0.2rem' }}>🌡️ 실시간 온도 이탈 알람 보장</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>배송차량 온도가 5℃를 초과할 경우 즉시 관제탑 및 기사에게 자동 비상 알림이 작동됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
