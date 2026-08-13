import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Flame, Sparkles, ChevronLeft, ChevronRight, BookOpen, Clock } from 'lucide-react';

// 🌟 풍성한 학교급식 인기 추천 레시피 데이터 (총 18개 - 1페이지당 9개씩 2페이지 분량)
const RECIPE_LIST = [
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
    id: 2,
    title: '풀무원 바른콩 몽글 순두부 찌개',
    category: '국 / 찌개',
    calories: '210 kcal',
    time: '15분',
    ingredients: '풀무원 바른콩 몽글 순두부 150g, 바지락, 양파, 대파, 바지락 육수',
    recipe: '1. 바지락 육수에 양파와 대파를 넣고 끓입니다.\n2. 양념장을 풀고 순두부를 큼직하게 넣어 보글보글 끓입니다.\n3. 마지막에 달걀과 대파를 넣어 마무리합니다.',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: '궁중 떡잡채 (학생/어린이 맞춤)',
    category: '반찬 / 볶음',
    calories: '320 kcal',
    time: '20분',
    ingredients: '가래떡 80g, 소고기 40g, 파프리카, 표고버섯, 간장 소스',
    recipe: '1. 떡볶이 떡을 말랑하게 데쳐 참기름으로 간을 합니다.\n2. 소고기와 표고버섯을 볶은 후 야채를 넣고 간장 양념으로 불향을 냅니다.',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: '풀스키친 듬뿍 치즈 오븐 스파게티',
    category: '면류 / 양식',
    calories: '480 kcal',
    time: '20분',
    ingredients: '스파게티 면 80g, 풀스키친 토마토 미트소스, 모짜렐라 치즈 50g',
    recipe: '1. 스파게티 면을 8분간 삶아 올리브유에 버무립니다.\n2. 진한 미트소스를 얹은 후 모짜렐라 치즈를 듬뿍 올립니다.\n3. 190℃ 오븐에서 8분간 노릇하게 구워냅니다.',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: '친환경 찹쌀 탕수육 & 달콤 과일 소스',
    category: '중식 / 메인',
    calories: '510 kcal',
    time: '30분',
    ingredients: '국산 돼지 안심 100g, 찹쌀가루, 파인애플, 목이버섯, 새콤달콤 소스',
    recipe: '1. 안심 고기에 찹쌀 반죽 옷을 입혀 튀깁니다.\n2. 파인애플과 야채를 달콤한 소스에 넣어 끓입니다.\n3. 갓 튀긴 탕수육에 소스를 부어 바삭하게 제공합니다.',
    img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: '영양 듬뿍 닭곰탕 & 쫄깃 소면',
    category: '국 / 탕',
    calories: '380 kcal',
    time: '35분',
    ingredients: '국산 닭고기 120g, 대파, 마늘, 수제 닭육수, 국수 소면',
    recipe: '1. 푹 끓인 닭육수에 찢은 닭고기살을 넣습니다.\n2. 삶은 소면을 그릇에 담고 깊은 닭곰탕 국물을 부어 제공합니다.',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    title: '수제 데리야끼 춘천 닭갈비',
    category: '육류 / 볶음',
    calories: '430 kcal',
    time: '25분',
    ingredients: '닭다리살 100g, 고구마, 떡사리, 양배추, 특제 데리야끼 양념',
    recipe: '1. 닭다리살을 양념에 30분간 재워둡니다.\n2. 달군 팬에 고구마와 양배추를 먼저 볶다가 닭고기와 떡을 넣어 잘 볶아냅니다.',
    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    title: '구수한 시골 감자 수제비국',
    category: '국 / 탕',
    calories: '290 kcal',
    time: '20분',
    ingredients: '감자 60g, 쫄깃 수제비 80g, 호박, 멸치 다시마 육수',
    recipe: '1. 멸치 육수가 끓으면 감자와 수제비를 넣어 익힙니다.\n2. 애호박과 국간장으로 간을 맞추어 구수하게 완성합니다.',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 9,
    title: '풀무원 올바른 핫도그 & 크리스피 감자튀김',
    category: '간식 / 특식',
    calories: '420 kcal',
    time: '15분',
    ingredients: '풀무원 올바른 핫도그 1개, 웨지 감자튀김, 케첩, 머스터드',
    recipe: '1. 핫도그를 오븐 및 에어프라이어에 노릇하게 바삭 구워냅니다.\n2. 웨지 감자를 함께 튀겨 수제 소스와 곁들입니다.',
    img: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80'
  },
  // 🌟 Page 2 (10 ~ 18번 레시피)
  {
    id: 10,
    title: '궁중 한우 소불고기 덮밥',
    category: '덮밥 / 메인',
    calories: '520 kcal',
    time: '20분',
    ingredients: '한우 설도 90g, 팽이버섯, 당면, 양파, 배 간장 양념',
    recipe: '1. 한우 고기를 얇게 슬라이스하여 배 간장 양념에 재웁니다.\n2. 야채와 당면을 넣고 국물이 자작하게 볶아 따뜻한 밥 위에 얹습니다.',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 11,
    title: '매콤 달콤 오징어 볶음 & 해물파전',
    category: '해산물 / 메인',
    calories: '410 kcal',
    time: '25분',
    ingredients: '국산 오징어 80g, 콩나물, 대파, 매콤 양념장',
    recipe: '1. 오징어를 칼집 내어 야채와 함께 센 불에서 재빨리 볶아냅니다.\n2. 해물파전과 함께 배식하여 아삭한 조화를 만듭니다.',
    img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 12,
    title: '얼큰 해물 뚝배기 순두부',
    category: '국 / 찌개',
    calories: '230 kcal',
    time: '20분',
    ingredients: '순두부 150g, 새우, 오징어, 조개, 매운 고추기름',
    recipe: '1. 고추기름에 해물을 볶아 불향을 낸 뒤 뚝배기 육수를 붓습니다.\n2. 순두부를 듬뿍 넣어 시원하고 칼칼하게 끓여냅니다.',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 13,
    title: '쫄깃 바삭 찹쌀 꿔바로우',
    category: '중식 / 메인',
    calories: '490 kcal',
    time: '25분',
    ingredients: '돼지 등심 100g, 찹쌀 전분, 레몬 유자 소스',
    recipe: '1. 넓적한 돼지 등심에 찹쌀 옷을 얇게 입혀 두 번 튀겨냅니다.\n2. 상큼한 레몬 유자 소스를 버무려 겉바속촉 맛을 냅니다.',
    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 14,
    title: '고소한 들깨 미역국 & 훈제오리 구이',
    category: '국 / 세트',
    calories: '450 kcal',
    time: '30분',
    ingredients: '완도 미역, 들깨가루, 훈제오리 슬라이스 80g, 머스타드 소스',
    recipe: '1. 미역을 참기름에 볶은 후 들깨가루를 넣어 구수하게 끓입니다.\n2. 훈제오리를 오븐에 구워 기름을 빼고 서빙합니다.',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 15,
    title: '크림 로제 파스타 & 수제 치킨너겟',
    category: '양식 / 메인',
    calories: '530 kcal',
    time: '20분',
    ingredients: '스파게티 면, 로제 크림소스, 안심 치킨너겟',
    recipe: '1. 생크림과 토마토 소스를 조화시킨 로제 파스타를 볶습니다.\n2. 바삭하게 튀긴 치킨너겟을 사이드로 첨가합니다.',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 16,
    title: '진한 사골 우거지 갈비탕',
    category: '국 / 탕',
    calories: '390 kcal',
    time: '40분',
    ingredients: '소갈비 90g, 삶은 우거지, 진사골 육수, 팽이버섯',
    recipe: '1. 우거지를 된장 양념에 무친 후 진한 사골 육수에 넣습니다.\n2. 푹 삶은 소갈비를 함께 끓여 깊은 풍미를 완성합니다.',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 17,
    title: '달콤 고구마 치즈 돈가스',
    category: '육류 / 메인',
    calories: '560 kcal',
    time: '25분',
    ingredients: '국산 돼지고기, 고구마 무스, 모짜렐라 치즈',
    recipe: '1. 돼지고기 속에 고구마 무스와 모짜렐라 치즈를 넣습니다.\n2. 노릇하게 튀겨내어 겉은 바삭하고 속은 촉촉하게 만듭니다.',
    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 18,
    title: '상큼 과일 샐러드 & 수제 드레싱',
    category: '샐러드 / 후식',
    calories: '180 kcal',
    time: '10분',
    ingredients: '양상추, 방울토마토, 파인애플, 오리엔탈드레싱',
    recipe: '1. 신선한 샐러드 야채를 깨끗이 세척 후 한입 크기로 담습니다.\n2. 상큼한 오리엔탈 수제 드레싱을 곁들입니다.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  }
];

export default function WeeklyMenu() {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 🌟 1페이지당 exact 9개 배치 설정
  const itemsPerPage = 9;
  const totalPages = Math.ceil(RECIPE_LIST.length / itemsPerPage);

  // 현재 페이지에 해당하는 9개 레시피 슬라이싱
  const indexOfLastItem = currentPageNum * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = RECIPE_LIST.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPageNum(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      
      {/* 🌟 Header Title */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>SCHOOL MEAL RECIPES</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
            학교급식 인기 추천 레시피 카탈로그
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.4rem' }}>
            학교 영양사 선생님들이 선호하시는 영양 만점 인기 추천 레시피 모음입니다. (1페이지당 9개씩 배치)
          </p>
        </div>

        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '0.5rem 1rem', borderRadius: '20px' }}>
          총 {RECIPE_LIST.length}개 레시피 (페이지 {currentPageNum} / {totalPages})
        </div>
      </div>

      {/* 🌟 3x3 Grid: 1페이지에 9개 레시피 배치 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {currentRecipes.map(recipe => (
          <div
            key={recipe.id}
            className="glass-card product-item-card"
            style={{
              padding: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'all 0.25s ease'
            }}
          >
            {/* Image Thumbnail */}
            <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
              <img
                src={recipe.img}
                alt={recipe.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'rgba(3, 105, 161, 0.9)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                backdropFilter: 'blur(4px)'
              }}>
                {recipe.category}
              </span>
            </div>

            {/* Content Body */}
            <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>
                {recipe.title}
              </h3>

              <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.82rem', color: '#64748b', fontWeight: '600', marginBottom: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#d32f2f' }}>
                  <Flame size={14} /> {recipe.calories}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Clock size={14} /> 조리시간: {recipe.time}
                </span>
              </div>

              <div style={{ fontSize: '0.83rem', color: '#475569', backgroundColor: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '1rem', flex: 1 }}>
                <strong>주요 재료:</strong> {recipe.ingredients}
              </div>

              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="btn btn-outline"
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  fontSize: '0.88rem',
                  fontWeight: '800',
                  color: '#0369a1',
                  borderColor: '#0284c7',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <BookOpen size={16} /> 조리법 상세보기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 Pagination Controller (1페이지에 9개씩 나머지는 다른 페이지로 이동) */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPageNum - 1)}
          disabled={currentPageNum === 1}
          style={{
            padding: '0.5rem 0.9rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: currentPageNum === 1 ? '#f1f5f9' : '#ffffff',
            color: currentPageNum === 1 ? '#94a3b8' : '#334155',
            fontWeight: '800',
            fontSize: '0.88rem',
            cursor: currentPageNum === 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem'
          }}
        >
          <ChevronLeft size={16} /> 이전
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => {
          const isActive = currentPageNum === number;
          return (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '6px',
                border: isActive ? '1px solid #0369a1' : '1px solid #cbd5e1',
                backgroundColor: isActive ? '#0369a1' : '#ffffff',
                color: isActive ? '#ffffff' : '#334155',
                fontWeight: '900',
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 10px rgba(3, 105, 161, 0.25)' : 'none'
              }}
            >
              {number}
            </button>
          );
        })}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPageNum + 1)}
          disabled={currentPageNum === totalPages}
          style={{
            padding: '0.5rem 0.9rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: currentPageNum === totalPages ? '#f1f5f9' : '#ffffff',
            color: currentPageNum === totalPages ? '#94a3b8' : '#334155',
            fontWeight: '800',
            fontSize: '0.88rem',
            cursor: currentPageNum === totalPages ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem'
          }}
        >
          다음 <ChevronRight size={16} />
        </button>
      </div>

      {/* 🌟 Recipe Detail Modal */}
      {selectedRecipe && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '2rem',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>{selectedRecipe.category}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                  {selectedRecipe.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                ✕
              </button>
            </div>

            <img
              src={selectedRecipe.img}
              alt={selectedRecipe.title}
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.25rem' }}
            />

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0369a1', marginBottom: '0.4rem' }}>🛒 추천 식자재 및 재료 규격</div>
              <div style={{ fontSize: '0.9rem', color: '#334155' }}>{selectedRecipe.ingredients}</div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.6rem' }}>👨‍🍳 단체급식 맞춤 조리 순서</div>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.8', color: '#334155', whiteSpace: 'pre-line', backgroundColor: '#fff', padding: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                {selectedRecipe.recipe}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.5rem', fontWeight: '800' }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
