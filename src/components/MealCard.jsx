import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALLERGY_LIST } from '../data/allergyData';
import { Flame, Star, Sparkles, Heart, AlertTriangle, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MealCard({ meal, mealTypeKey }) {
  const { myAllergies } = useApp();
  const [likeCount, setLikeCount] = useState(meal.rating ? Math.floor(meal.rating * 40) : 150);
  const [hasLiked, setHasLiked] = useState(false);

  // Check if any menu item has user's allergies
  const triggeredAllergies = new Set();
  meal.items.forEach(item => {
    item.allergies.forEach(allergyId => {
      if (myAllergies.includes(allergyId)) {
        triggeredAllergies.add(allergyId);
      }
    });
  });

  const triggeredList = Array.from(triggeredAllergies).map(id => 
    ALLERGY_LIST.find(a => a.id === id)
  ).filter(Boolean);

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(prev => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{meal.title}</h3>
            {meal.isSpecial && (
              <span className="badge badge-accent animate-pulse" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Sparkles size={12} /> 특식
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            운영 시간: {meal.time}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Flame size={18} /> {meal.calories} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '400' }}>kcal</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: '#f59e0b', justifyContent: 'flex-end', marginTop: '0.1rem' }}>
            <Star size={13} fill="#f59e0b" />
            <span style={{ fontWeight: '700' }}>{meal.rating}</span>
          </div>
        </div>
      </div>

      {/* Special Notice Banner if exists */}
      {meal.specialTag && (
        <div style={{
          backgroundColor: 'var(--accent-light)',
          color: 'var(--accent)',
          padding: '0.5rem 0.8rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.85rem',
          fontWeight: '700',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={16} />
          <span>{meal.specialTag}</span>
        </div>
      )}

      {/* Triggered Allergy Warning Alert Banner */}
      {triggeredList.length > 0 && (
        <div className="badge-highlight" style={{
          padding: '0.6rem 0.8rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertTriangle size={18} />
          <div>
            <strong>내 알레르기 주의!</strong>: {triggeredList.map(a => `${a.name}(${a.id})`).join(', ')} 성분 포함
          </div>
        </div>
      )}

      {/* Menu Item List */}
      <div style={{ flex: 1, marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.6rem' }}>
          오늘의 식단 메뉴
        </h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {meal.items.map((item, idx) => {
            const hasUserAllergy = item.allergies.some(aId => myAllergies.includes(aId));
            return (
              <li 
                key={idx}
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: hasUserAllergy ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-surface)',
                  border: hasUserAllergy ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  fontWeight: hasUserAllergy ? '700' : '500'
                }}
              >
                <span style={{ color: hasUserAllergy ? '#dc2626' : 'var(--text-main)' }}>
                  {item.name}
                  {hasUserAllergy && <span style={{ marginLeft: '0.3rem', fontSize: '0.75rem' }}>⚠️</span>}
                </span>

                {/* Allergy Number Badges */}
                <div style={{ display: 'flex', gap: '0.2rem', flexWrap: 'wrap' }}>
                  {item.allergies.map(aNum => {
                    const isMyAllergy = myAllergies.includes(aNum);
                    return (
                      <span 
                        key={aNum} 
                        style={{
                          fontSize: '0.68rem',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '4px',
                          fontWeight: '600',
                          backgroundColor: isMyAllergy ? '#ef4444' : 'var(--border-color)',
                          color: isMyAllergy ? 'white' : 'var(--text-muted)'
                        }}
                        title={`${ALLERGY_LIST.find(a => a.id === aNum)?.name || '알레르기'} (${aNum}번)`}
                      >
                        {aNum}
                      </span>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Nutrition Progress Bars */}
      {meal.nutrition && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '0.8rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>탄수화물 {meal.nutrition.carbs}g</span>
            <span>단백질 {meal.nutrition.protein}g</span>
            <span>지방 {meal.nutrition.fat}g</span>
            <span>나트륨 {meal.nutrition.sodium}mg</span>
          </div>
          <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', gap: '2px' }}>
            <div style={{ width: `${(meal.nutrition.carbs / 200) * 100}%`, backgroundColor: '#3b82f6' }} title="탄수화물"></div>
            <div style={{ width: `${(meal.nutrition.protein / 100) * 100}%`, backgroundColor: '#10b981' }} title="단백질"></div>
            <div style={{ width: `${(meal.nutrition.fat / 60) * 100}%`, backgroundColor: '#f59e0b' }} title="지방"></div>
          </div>
        </div>
      )}

      {/* Interactive Stamp / Like Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handleLike}
          className={`btn ${hasLiked ? 'btn-accent' : 'btn-outline'} btn-sm`}
          style={{ width: '100%' }}
        >
          <Heart size={15} fill={hasLiked ? 'white' : 'none'} color={hasLiked ? 'white' : 'var(--accent)'} />
          <span>{hasLiked ? '맛있었어요! 도장 완료 ❤️' : '오늘 급식 맛있어요! (도장 찍기)'}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.85 }}>{likeCount}</span>
        </button>
      </div>
    </div>
  );
}
