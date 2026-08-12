import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INGREDIENT_ORIGINS } from '../data/mockData';
import { ChefHat, ShieldCheck, Search, Sparkles, CheckCircle2, Award } from 'lucide-react';

export default function KitchenIntro() {
  const { selectedSchool } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrigins = INGREDIENT_ORIGINS.filter(item => 
    item.name.includes(searchTerm) || item.origin.includes(searchTerm)
  );

  const haccpSteps = [
    { step: 1, title: "1. 식재료 검수", desc: "새벽 6시 신선도 & 탑차 온도 측정", icon: "🚚" },
    { step: 2, title: "2. 위생 세척 3회", desc: "초음파 세척기 & 미온수 세척", icon: "🧼" },
    { step: 3, title: "3. 중심온도 가열", desc: "육류 75℃ 이상, 패류 85℃ 가열", icon: "🍳" },
    { step: 4, title: "4. 보온/보냉 배식", desc: "갓 조리한 따뜻한 상태 유지", icon: "🍱" },
    { step: 5, title: "5. 식기 고온소독", desc: "100℃ 고온 증기 살균 소독", icon: "✨" },
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-primary">HACCP 위생 인증 시설</span>
          <span className="badge badge-accent">100% 원산지 투명 공개</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
          {selectedSchool.name} 조리실 & 식자재 원산지
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          학생들의 건강을 최우선으로 생각하는 안전한 급식 조리 현장과 신선한 식재료 원산지를 공개합니다.
        </p>
      </div>

      {/* HACCP 5 Steps Grid */}
      <section className="glass-card" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={22} color="var(--primary)" /> HACCP 5단계 철저 위생 조리 절차
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {haccpSteps.map(item => (
            <div key={item.step} style={{
              backgroundColor: 'var(--bg-page)',
              padding: '1.2rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.2rem', color: 'var(--primary)' }}>{item.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ingredient Origin Table & Search */}
      <section className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ChefHat size={22} color="var(--accent)" /> 주요 식재료 원산지 표시판
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
              모든 식재료는 무농약 유기농 및 무항생제 1등급 인증 농가에서 입고됩니다.
            </p>
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="식재료 검색 (예: 쇠고기, 김치)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-page)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>식재료 품목</th>
                <th style={{ padding: '0.75rem' }}>원산지 (생산지)</th>
                <th style={{ padding: '0.75rem' }}>품질 및 위생 등급</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrigins.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>{row.name}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CheckCircle2 size={15} /> {row.origin}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-primary">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
