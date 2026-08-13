import React, { useState } from 'react';
import { BUSINESS_AREAS } from '../data/jwFsData';
import { CheckCircle2, ChevronRight, ShieldCheck, Truck, Users } from 'lucide-react';

export default function Business() {
  const [selectedId, setSelectedId] = useState('school');
  const activeArea = BUSINESS_AREAS.find(b => b.id === selectedId);

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>BUSINESS AREAS</span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          주식회사 서진 사업분야 (Services)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          학교급식부터 영유아, 복지, 기업 구내식당까지 맞춤형 식자재 솔루션을 제공합니다.
        </p>
      </div>

      {/* Grid of 4 Business Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {BUSINESS_AREAS.map(item => {
          const isSelected = item.id === selectedId;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="glass-card"
              style={{
                padding: '1.5rem',
                border: isSelected ? `2px solid ${item.color}` : '1px solid var(--border-color)',
                backgroundColor: isSelected ? 'var(--bg-surface)' : 'var(--bg-card)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? `0 8px 24px rgba(0,0,0,0.12)` : 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{item.icon}</div>
              <span className="badge" style={{ backgroundColor: `${item.color}20`, color: item.color, fontWeight: '700', marginBottom: '0.4rem' }}>
                {item.stats}
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '0.3rem', marginBottom: '0.3rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Business Area Detail */}
      {activeArea && (
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem', borderLeft: `6px solid ${activeArea.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{activeArea.icon}</span>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{activeArea.title} 상세안내</h3>
              <span style={{ color: activeArea.color, fontWeight: '700', fontSize: '0.9rem' }}>{activeArea.subtitle}</span>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '1.75rem', backgroundColor: 'var(--bg-page)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {activeArea.description}
          </p>

          <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>
            ✨ 핵심 경쟁력 및 특징
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {activeArea.features.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <CheckCircle2 size={20} color={activeArea.color} />
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
