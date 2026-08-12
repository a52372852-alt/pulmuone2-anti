import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WEEKLY_SCHEDULE } from '../data/mockData';
import { ALLERGY_LIST } from '../data/allergyData';
import { Calendar as CalendarIcon, Printer, Download, Sparkles, Flame, CheckCircle, AlertCircle } from 'lucide-react';

export default function WeeklyMenu() {
  const { selectedSchool, myAllergies } = useApp();
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Default Thursday (Today)

  const activeDay = WEEKLY_SCHEDULE[selectedDayIndex];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`${selectedSchool.name} 2026년 8월 2주차 식단표 PDF 다운로드가 시작되었습니다.`);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Top Title & Actions Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-primary">2026년 8월 2주차 주간 식단표</span>
            <span className="badge badge-accent">영양 보장 식단</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
            {selectedSchool.name} 주간 식단표 달력
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            주간 날짜별 급식 메뉴와 포함된 알레르기 유발물질 번호를 한눈에 확인하세요.
          </p>
        </div>

        <div className="no-print" style={{ display: 'flex', gap: '0.6rem' }}>
          <button onClick={handlePrint} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Printer size={16} /> 식단표 인쇄
          </button>
          <button onClick={handleDownload} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Download size={16} /> 식단표 다운로드 (PDF)
          </button>
        </div>
      </div>

      {/* Days Selection Tabs */}
      <div className="no-print" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        {WEEKLY_SCHEDULE.map((item, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              style={{
                flex: 1,
                minWidth: '130px',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                color: isSelected ? 'white' : 'var(--text-main)',
                border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: isSelected ? '0 4px 12px var(--primary-glow)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              {item.isToday && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '10px',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  fontSize: '0.65rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  fontWeight: '800'
                }}>
                  TODAY
                </span>
              )}
              <div style={{ fontSize: '0.8rem', opacity: isSelected ? 0.9 : 0.6 }}>{item.date}</div>
              <div style={{ fontSize: '1rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{item.day}</span>
                {item.isSpecial && <span>🎉</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Detail Content */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{activeDay.date}</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{activeDay.day} 중식 식단</span>
              {activeDay.isSpecial && <span className="badge badge-accent">🎉 세계 음식의 날 특식</span>}
            </h3>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Flame size={20} /> {activeDay.lunch.calories} kcal
            </span>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
            식단 구성 메뉴
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {activeDay.lunch.menu.map((menuName, index) => (
              <div key={index} style={{
                backgroundColor: 'var(--bg-page)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem'
                }}>
                  {index + 1}
                </span>
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{menuName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Included Allergy Breakdown */}
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={16} color="var(--accent)" />
            이날 식단에 포함된 알레르기 유발 물질 ({activeDay.lunch.allergies.length}개)
          </h4>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {activeDay.lunch.allergies.map(allergyId => {
              const info = ALLERGY_LIST.find(a => a.id === allergyId);
              const isMyAllergy = myAllergies.includes(allergyId);
              return (
                <span
                  key={allergyId}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    backgroundColor: isMyAllergy ? '#fee2e2' : 'var(--bg-page)',
                    color: isMyAllergy ? '#dc2626' : 'var(--text-main)',
                    border: isMyAllergy ? '1px solid #fca5a5' : '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>{info?.icon || '⚠️'}</span>
                  <span>{info?.name} ({allergyId}번)</span>
                  {isMyAllergy && <span style={{ fontWeight: '800' }}>[내 알레르기]</span>}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Calorie Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>
          📊 이번 주 일별 칼로리 & 특징 요약
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>요일</th>
                <th style={{ padding: '0.75rem' }}>날짜</th>
                <th style={{ padding: '0.75rem' }}>대표 메뉴</th>
                <th style={{ padding: '0.75rem' }}>칼로리</th>
                <th style={{ padding: '0.75rem' }}>특징</th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_SCHEDULE.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: row.isToday ? 'var(--primary-light)' : 'transparent' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>{row.day}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{row.date}</td>
                  <td style={{ padding: '0.75rem' }}>{row.lunch.menu.slice(0, 3).join(', ')}...</td>
                  <td style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--accent)' }}>{row.lunch.calories} kcal</td>
                  <td style={{ padding: '0.75rem' }}>
                    {row.isSpecial ? <span className="badge badge-accent">특식 데이</span> : <span className="badge badge-primary">일반식</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
