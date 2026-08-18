import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { COMPANY_INFO } from '../data/jwFsData';
import { ArrowLeft, Calendar, Download } from 'lucide-react';

export default function BoardPage({ category, heading, icon: Icon, emptyText }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setSelectedPost(null);
    setLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from('board_posts')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      if (!error) setPosts(data || []);
      setLoading(false);
    })();
  }, [category]);

  const formatDate = (iso) => iso ? iso.slice(0, 10) : '';

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 3.5rem' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {Icon && <Icon size={22} color="#d97706" />} {heading}
      </h2>

      {selectedPost ? (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <button
            onClick={() => setSelectedPost(null)}
            className="btn btn-outline"
            style={{ marginBottom: '1.25rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} /> 목록으로 돌아가기
          </button>

          <div style={{ borderBottom: '2px solid #0284c7', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.6rem' }}>
              {selectedPost.title}
            </h3>
            <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
              <span>✍️ 작성자: <strong>{COMPANY_INFO.name}</strong></span>
              <span>📅 작성일: {formatDate(selectedPost.created_at)}</span>
            </div>
          </div>

          {selectedPost.attachment_url && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <a
                href={selectedPost.attachment_url}
                download={selectedPost.attachment_name || true}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.8rem 1.4rem', backgroundColor: '#0b69c7', color: '#ffffff',
                  borderRadius: '8px', fontWeight: '800', fontSize: '0.95rem', textDecoration: 'none'
                }}
              >
                <Download size={18} /> {selectedPost.attachment_name || '첨부파일'} 다운로드
              </a>
            </div>
          )}

          {(selectedPost.images || []).map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${selectedPost.title} 이미지 ${idx + 1}`}
              style={{ width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto 1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
          ))}

          <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#334155', whiteSpace: 'pre-line', textAlign: 'center' }}>
            {selectedPost.body}
          </div>
        </div>
      ) : loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>불러오는 중...</div>
      ) : posts.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
          {emptyText || '아직 등록된 글이 없습니다.'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {posts.map(post => (
            <div
              key={post.id}
              className="product-item-card"
              onClick={() => setSelectedPost(post)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ width: '100%', height: '150px', overflow: 'hidden', borderRadius: '4px' }}>
                {post.images?.[0] ? (
                  <img src={post.images[0]} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    {Icon && <Icon size={28} />}
                  </div>
                )}
              </div>
              <div className="product-subtitle" style={{ marginTop: '0.6rem' }}>{post.title}</div>
              <div style={{ marginTop: '0.3rem', fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={12} /> {formatDate(post.created_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
