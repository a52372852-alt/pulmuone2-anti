import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Leaf } from 'lucide-react';
import { NavigationBar } from '../components/Navbar';
import ProductCatalog from './ProductCatalog';
import { supabase } from '../lib/supabaseClient';

function PreviewSection({ title, subtitle, color, badgeBg, items, emptyText, onItemClick, onMoreClick }) {
  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1rem', backgroundColor: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>
        <span style={{ fontWeight: '800', fontSize: '0.9rem', color }}>{title} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}>{subtitle}</span></span>
        <span onClick={onMoreClick} style={{ fontSize: '0.75rem', color: '#0b69c7', fontWeight: '700', cursor: 'pointer' }}>+ more</span>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '1.5rem 0.5rem', textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
          {emptyText}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={onItemClick}
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', width: '100%', height: '65px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                {item.images?.[0] && (
                  <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <span style={{ position: 'absolute', top: '3px', left: '3px', backgroundColor: badgeBg, color: '#ffffff', fontSize: '0.62rem', fontWeight: '800', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>
                  NEW
                </span>
              </div>
              <div style={{ padding: '0.4rem', fontSize: '0.73rem', fontWeight: '800', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.title}
              </div>
              <div style={{ padding: '0 0.4rem 0.4rem', fontSize: '0.7rem', color: '#64748b' }}>
                {item.created_at?.slice(0, 10)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { setCurrentPage } = useApp();
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [recentNotices, setRecentNotices] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('board_posts')
        .select('*')
        .eq('category', 'promotion')
        .order('created_at', { ascending: false })
        .limit(3);
      setRecentPosts(data || []);
    })();
    (async () => {
      const { data } = await supabase
        .from('board_posts')
        .select('*')
        .eq('category', 'recipe')
        .order('created_at', { ascending: false })
        .limit(3);
      setRecentRecipes(data || []);
    })();
    (async () => {
      const { data } = await supabase
        .from('board_posts')
        .select('*')
        .eq('category', 'notice')
        .order('created_at', { ascending: false })
        .limit(3);
      setRecentNotices(data || []);
    })();
  }, []);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>

      {/* 🌟 1. FRESH REAL-PHOTO HERO BANNER (상단 높이 100px 확대: minHeight 380px) */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '360px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.75rem 0 1.25rem 0',
        overflow: 'hidden'
      }}>
        <div
          className="hero-bg-kenburns"
          style={{
            backgroundImage: `url("${import.meta.env.BASE_URL}off04.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        />
        <div className="container hero-container" style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>

          {/* 🌟 Bottom Right Basket Area Box: Centered Logo + Centered Text Below */}
          <div className="hero-logo-box hero-card-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
            backdropFilter: 'blur(8px)',
            maxWidth: '330px',
            margin: 0
          }}>
            {/* 1. Official Logo Image Centered */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '0.4rem' }}>
              <img
                src={`${import.meta.env.BASE_URL}ro-01.png`}
                alt="주식회사 서진 로고"
                style={{
                  height: '56px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>

            {/* 2. Text Placed Below Logo Centered */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', width: '100%' }}>
              <h1 style={{
                fontSize: '1.05rem',
                fontWeight: '900',
                lineHeight: '1.4',
                letterSpacing: '-0.02em',
                color: '#0f172a',
                margin: 0,
                textAlign: 'center'
              }}>
                신선하고 믿을 수 있는 <br />
                <span style={{ color: '#0284c7', fontWeight: '900' }}>
                  학교급식 식자재유통 전문기업
                </span>
              </h1>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#64748b',
                marginTop: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem'
              }}>
                <Leaf size={13} color="#10b981" />
                <span>주식회사 서진 · 충남 홍성 내포물류센터</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🌟 2. NAVIGATION BAR LOCATED DIRECTLY BELOW THE HERO IMAGE (히어로 이미지 바로 아래로 위치 복원) */}
      <NavigationBar />

      {/* 🌟 3. MAIN CONTENT SECTION */}
      <div className="container" style={{ marginTop: '2rem' }}>

        {/* Middle 3-Column Content Block */}
        <div className="home-top-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>

          <PreviewSection
            title="서진 행사지"
            subtitle="New & Event"
            color="#d32f2f"
            badgeBg="#d32f2f"
            items={recentPosts}
            emptyText="아직 등록된 소식이 없습니다."
            onItemClick={() => setCurrentPage('promotions')}
            onMoreClick={() => setCurrentPage('promotions')}
          />

          <PreviewSection
            title="추천레시피"
            subtitle="Best Recipe"
            color="#0b69c7"
            badgeBg="rgba(3, 105, 161, 0.85)"
            items={recentRecipes}
            emptyText="아직 등록된 레시피가 없습니다."
            onItemClick={() => setCurrentPage('recipes')}
            onMoreClick={() => setCurrentPage('recipes')}
          />

          <PreviewSection
            title="공지사항"
            subtitle="Notice"
            color="#059669"
            badgeBg="#059669"
            items={recentNotices}
            emptyText="아직 등록된 공지사항이 없습니다."
            onItemClick={() => setCurrentPage('customer')}
            onMoreClick={() => setCurrentPage('customer')}
          />
        </div>

      </div>

      {/* 4. 제품소개 게시판 (네비게이션바 제품소개 클릭 시와 동일한 컴포넌트 재사용) */}
      <ProductCatalog defaultBrandId="all" />
    </div>
  );
}
