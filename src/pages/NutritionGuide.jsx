import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALLERGY_LIST } from '../data/allergyData';
import { ShieldAlert, CheckSquare, Calculator, BookOpen, Sparkles, Check, Info } from 'lucide-react';

export default function NutritionGuide() {
  const { myAllergies, toggleAllergy, setMyAllergies } = useApp();

  // Calorie Calculator State
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(17);
  const [height, setHeight] = useState(172);
  const [weight, setWeight] = useState(65);
  const [activity, setActivity] = useState(1.55); // 보통 활동적

  // Basic BMR calculation (Mifflin-St Jeor)
  const bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;
  
  const recommendedCalories = Math.round(bmr * activity);
  const recommendedProtein = Math.round(weight * 1.2);

  const selectAll = () => {
    setMyAllergies(ALLERGY_LIST.map(a => a.id));
  };

  const clearAll = () => {
    setMyAllergies([]);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-accent">식품의약품안전처 기준</span>
          <span className="badge badge-primary">맞춤 건강 관리</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
          알레르기 19종 가이드 & 영양 케어 센터
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          학교 급식표의 번호 표기법을 확인하고, 내 맞춤 알레르기와 일일 권장 칼로리를 계산해보세요.
        </p>
      </div>

      {/* 1. Allergy Selector Section */}
      <section className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={22} color="var(--accent)" />
              내 개인 알레르기 항목 등록 ({myAllergies.length}개 선택됨)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              선택하신 알레르기 물질이 포함된 급식 메뉴는 식단표에서 붉은색 경고 표시와 알림을 드립니다.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={clearAll} className="btn btn-sm btn-outline">전체 해제</button>
            <button onClick={selectAll} className="btn btn-sm btn-primary">전체 선택</button>
          </div>
        </div>

        {/* 19 Allergies Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem' }}>
          {ALLERGY_LIST.map(item => {
            const isChecked = myAllergies.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleAllergy(item.id)}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: isChecked ? '2px solid #ef4444' : '1px solid var(--border-color)',
                  backgroundColor: isChecked ? '#fee2e2' : 'var(--bg-page)',
                  color: isChecked ? '#dc2626' : 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem'
                }}
              >
                <div style={{
                  fontSize: '1.4rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: isChecked ? 'white' : 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{item.name}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>No.{item.id}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isChecked ? '#b91c1c' : 'var(--text-muted)' }}>
                    {item.description}
                  </div>
                </div>

                {isChecked && <Check size={18} style={{ color: '#dc2626', fontWeight: '800' }} />}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Interactive Calorie & Protein Calculator */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Calculator size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>내 권장 칼로리 & 단백질 계산기</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ flex: 1, fontSize: '0.85rem', fontWeight: '600' }}>
                성별
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: '0.2rem' }}
                >
                  <option value="male">남학생</option>
                  <option value="female">여학생</option>
                </select>
              </label>

              <label style={{ flex: 1, fontSize: '0.85rem', fontWeight: '600' }}>
                나이 (만 세)
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: '0.2rem' }}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ flex: 1, fontSize: '0.85rem', fontWeight: '600' }}>
                키 (cm)
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: '0.2rem' }}
                />
              </label>

              <label style={{ flex: 1, fontSize: '0.85rem', fontWeight: '600' }}>
                체중 (kg)
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: '0.2rem' }}
                />
              </label>
            </div>

            {/* Results Box */}
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>일일 권장 칼로리</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>{recommendedCalories} kcal</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>하루 권장 단백질</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent)' }}>약 {recommendedProtein}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Nutrition Column */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BookOpen size={22} color="var(--secondary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>이달의 영양 소식지 (영양사 칼럼)</h3>
          </div>

          <div style={{ backgroundColor: 'var(--bg-page)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>8월 수분 & 면역력 케어</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              "무더운 여름철, 학업 집중도를 높이는 급식 수분 섭취법"
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              여름철 땀 배출이 증가하면 체내 전해질이 줄어들어 졸음과 집중력 저하가 올 수 있습니다.
              학교 급식에서는 수분이 풍부한 샤인머스캣, 수박, 오이무침을 적극 구성하고 있으니 식사 시 채소와 과일을 꼭 챙겨 드세요!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
