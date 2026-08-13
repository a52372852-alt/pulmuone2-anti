import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WEEKLY_SCHEDULE } from '../data/mockData';
import { ALLERGY_LIST } from '../data/allergyData';
import { Calendar as CalendarIcon, Printer, Download, Sparkles, Flame, CheckCircle, AlertCircle, Utensils, BookOpen } from 'lucide-react';


const POPULAR_RECIPES = [
  {
    id: 1,
    title: '바삭바삭 수제 돈가스 & 특제 브라운 소스',
    category: '육류 / 메인',
    calories: '540 kcal',
    time: '25분',
    ingredients: '국산 돼지 등심 100g, 빵가루, 계란, 장원 특제 데미글라스 소스',
    recipe: '1. 돼지 등심을 두드려 부드럽게 한 뒤 소금, 후추로 간을 합니다.\n2. 밀가루, 계란물, 빵가루 순으로 옷을 입힙니다.\n3. 175℃ 기름에서 5~6분간 노릇하게 튀겨냅니다.\n4. 따뜻한 브라운 소스를 얹어 제공합니다.',
    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: '풀무원 바른콩 순두부 찌개',
    category: '국 / 찌개',
    calories: '210 kcal',
    time: '15분',
    ingredients: '풀무원 바른콩 몽글 순두부 150g, 뺘지락, 양파, 대파, 바지락 육수',
    recipe: '1. 바지락 육수에 양파와 대파를 넣고 끓입니다.\n2. 양념장을 풀고 순두부를 큼직하게 넣어 보글보글 끓입니다.\n3. 마지막에 달걀과 대파를 넣어 마무리합니다.',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: '궁중 떡잡채 (어린이/학생 맞춤)',
    category: '반찬 / 볶음',
    calories: '320 kcal',
    time: '20분',
    ingredients: '가래떡 80g, 소고기 40g, 파프리카, 표고버섯, 간장 소스',
    recipe: '1. 떡볶이 떡을 말랑하게 데쳐 참기름으로 핏물을 뺍니다.\n2. 소고기와 표고버섯을 볶은 후 야채를 넣고 간장 양념으로 불향을 냅니다.',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
  }
];

export default function WeeklyMenu({ initialTab = 'menu' }) {
  const { selectedSchool, myAllergies } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Default Thursday (Today)
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const activeDay = WEEKLY_SCHEDULE[selectedDayIndex];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`${selectedSchool.name} 2026년 8월 2주차 식단표 PDF 다운로드가 시작되었습니다.`);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.25rem 3.5rem' }}>
      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
        <button
          onClick={() => setActiveTab('menu')}
          className={`btn ${activeTab === 'menu' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '800' }}
        >
          <CalendarIcon size={18} /> 주간 식단표 달력
        </button>
        <button
          onClick={() => setActiveTab('recipe')}
          className={`btn ${activeTab === 'recipe' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '800' }}
        >
          <BookOpen size={18} /> 학교급식 표준 레시피
        </button>
      </div>

      {activeTab === 'menu' ? (
        <>
          {/* Top Title & Actions Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-primary">2026년 8월 2주차 주간 식단표</span>
                <span className="badge badge-accent">영양 보장 식단</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>
                {selectedSchool.name} 주간 식단표 달력
              </h2>
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
        </>
      ) : (
        /* Recipe Catalog View */
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0369a1' }}>
              🍳 (주)장원 학교급식 인기 추천 레시피
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
              학교 영양사분들이 가장 많이 활용하시는 히트 급식 메뉴의 조리법과 단가 조절 팁입니다.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {POPULAR_RECIPES.map(recipe => (
              <div
                key={recipe.id}
                className="glass-card"
                onClick={() => setSelectedRecipe(recipe)}
                style={{ padding: '1.25rem', cursor: 'pointer', transition: 'transform 0.2s ease' }}
              >
                <img src={recipe.img} alt={recipe.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>{recipe.category}</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.2rem 0 0.5rem' }}>{recipe.title}</h4>
                <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                  <span>🔥 {recipe.calories}</span>
                  <span>⏱️ 조리시간 {recipe.time}</span>
                </div>
                <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>레시피 상세 보기 📖</button>
              </div>
            ))}
          </div>

          {selectedRecipe && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', maxWidth: '550px', width: '100%', padding: '2rem', relative: 'relative' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0369a1', marginBottom: '0.5rem' }}>{selectedRecipe.title}</h3>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}><strong>재료:</strong> {selectedRecipe.ingredients}</div>
                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', whiteSpace: 'pre-line', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {selectedRecipe.recipe}
                </div>
                <button onClick={() => setSelectedRecipe(null)} className="btn btn-primary" style={{ width: '100%' }}>닫기</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

