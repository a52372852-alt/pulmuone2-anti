import React, { useState } from 'react';
import { Bell, MessageSquare, Edit3, Send, CheckCircle2, Lock, User, Eye, ArrowLeft, Sparkles } from 'lucide-react';
import BoardPage from './BoardPage';

export default function CustomerCenter() {
  const [activeTab, setActiveTab] = useState('notice'); // 'notice' | 'freeboard'

  // 현재 시간 수식용
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const yesterday = new Date(now.getTime() - 22 * 60 * 60 * 1000).toISOString(); // 22시간 전 (24시간 이내)
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(); // 48시간 전

  // 자유게시판 게시글 목록 (기본 샘플 데이터 + timestamp 추가)
  const [posts, setPosts] = useState([
    {
      id: 5,
      title: "2026학년도 2학기 친환경 쌀 공급 단가 문의드립니다.",
      author: "홍성고 영양사",
      date: todayStr,
      timestamp: new Date().toISOString(), // 방금 등록 (24시간 이내 -> NEW 깜빡임 표시)
      views: 42,
      content: "안녕하세요! 홍성고등학교 급식실입니다. 2학기 친환경 쌀 및 찹쌀 공급 단가표 요청드립니다. 항상 신선한 식자재 감사드립니다.",
      comments: [
        { author: "주식회사 서진 마스터", date: todayStr, content: "선생님 안녕하십니까! 서진 영업마스터입니다. 이메일 및 팩스로 2학기 단가표 전달해드렸습니다. 감사합니다!" }
      ]
    },
    {
      id: 4,
      title: "풀스키친 미트볼 아이들이 너무 좋아하네요^^",
      author: "내포초 조리사",
      date: todayStr,
      timestamp: yesterday, // 22시간 전 등록 (24시간 이내 -> NEW 깜빡임 표시)
      views: 89,
      content: "지난주 수요일 특식으로 풀스키친 미트볼 조리해 제공했는데 잔반이 거의 없을 정도로 아이들 반응이 폭발적이었습니다. 추천합니다!",
      comments: [
        { author: "주식회사 서진 마스터", date: todayStr, content: "좋은 후기 감사드립니다! 앞으로도 우리 아이들이 맛있고 건강하게 먹을 수 있는 최상급 식자재로 보답하겠습니다." }
      ]
    },
    {
      id: 3,
      title: "콜드체인 적정온도 배송 시간 확인 건",
      author: "홍남초 영양교사",
      date: "2026-08-08",
      timestamp: twoDaysAgo,
      views: 115,
      content: "새벽 배송 시 냉장 3℃ 온도 기록표 매일 챙겨주셔서 위생 점검 때 큰 도움이 되고 있습니다. 늘 애써주셔서 감사합니다.",
      comments: []
    },
    {
      id: 2,
      title: "알레르기 대체 식자재 소포장 품목 문의",
      author: "덕산중 영양사",
      date: "2026-08-05",
      timestamp: twoDaysAgo,
      views: 67,
      content: "계란/우유 알레르기 학생용 대체식품 소포장 품목 카탈로그가 새로 나왔는지 궁금합니다.",
      comments: [
        { author: "주식회사 서진 마스터", date: "2026-08-05", content: "선생님, 2026 신규 알레르기 케어 전용 소포장 리플렛을 담당 영업자가 직접 가져다 드리겠습니다!" }
      ]
    },
    {
      id: 1,
      title: "주식회사 서진 내포물류센터 견학 후기",
      author: "충남영양사회",
      date: "2026-07-28",
      timestamp: twoDaysAgo,
      views: 204,
      content: "내포물류센터 방사능 정밀 검무 장비 및 3℃ 콜드체인 시설을 둘러보았습니다. 철저한 위생 관리에 깊은 신뢰가 생겼습니다.",
      comments: []
    }
  ]);

  // 🌟 24시간 이내 작성 여부 판단 함수 (24시간 내 게시물 판단)
  const isWithin24Hours = (timestamp) => {
    if (!timestamp) return false;
    const postTime = new Date(timestamp).getTime();
    const currentTime = new Date().getTime();
    const diffHours = (currentTime - postTime) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  // 선택된 게시글 상세보기 상태
  const [selectedPost, setSelectedPost] = useState(null);

  // 비회원 글쓰기 폼 상태
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newContent, setNewContent] = useState('');

  // 비회원 댓글 작성 상태
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // 비회원 글 등록 처리 (등록 시 24시간 이내이므로 NEW 깜빡임 뱃지 자동 부여)
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) {
      alert('작성자, 제목, 내용을 모두 입력해 주세요.');
      return;
    }

    const createdTime = new Date();
    const dateString = createdTime.toISOString().split('T')[0];

    const newPostItem = {
      id: posts.length + 1,
      title: newTitle,
      author: newAuthor,
      date: dateString,
      timestamp: createdTime.toISOString(),
      views: 1,
      content: newContent,
      comments: []
    };

    setPosts([newPostItem, ...posts]);
    setShowWriteModal(false);
    setNewTitle('');
    setNewAuthor('');
    setNewPassword('');
    setNewContent('');
    alert('비회원 게시글이 성공적으로 등록되었습니다! (24시간 동안 NEW 아이콘이 반짝입니다)');
  };

  // 비회원 댓글 등록 처리
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) {
      alert('작성자명과 댓글 내용을 입력해주세요.');
      return;
    }

    const dateString = new Date().toISOString().split('T')[0];
    const updatedPosts = posts.map(p => {
      if (p.id === selectedPost.id) {
        const newComment = {
          author: commentAuthor,
          date: dateString,
          content: commentText
        };
        const updated = { ...p, comments: [...p.comments, newComment] };
        setSelectedPost(updated);
        return updated;
      }
      return p;
    });

    setPosts(updatedPosts);
    setCommentAuthor('');
    setCommentText('');
  };

  const handlePostClick = (post) => {
    // 조회수 1 증가
    const updatedPosts = posts.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p);
    setPosts(updatedPosts);
    setSelectedPost({ ...post, views: post.views + 1 });
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>CUSTOMER CENTER</span>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          고객센터 (Customer Center)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          주식회사 서진의 최신 공지사항을 확인하시거나 자유게시판에 의견 및 문의글을 자유롭게 작성해 보세요. (신규 게시글은 24시간 동안 NEW 아이콘 반짝임)
        </p>
      </div>

      {/* 🌟 Sub Menu Tabs: 공지사항 / 자유게시판 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <button
          onClick={() => { setActiveTab('notice'); setSelectedPost(null); }}
          className={`btn ${activeTab === 'notice' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.65rem 1.5rem', fontWeight: '800', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Bell size={18} /> 📢 공지사항 & 위생안내
        </button>
        <button
          onClick={() => { setActiveTab('freeboard'); setSelectedPost(null); }}
          className={`btn ${activeTab === 'freeboard' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.65rem 1.5rem', fontWeight: '800', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <MessageSquare size={18} /> 💬 자유게시판 (비회원 소통)
        </button>
      </div>

      {/* 1. TAB: 공지사항 */}
      {activeTab === 'notice' && (
        <BoardPage
          category="notice"
          heading="공지사항 & 위생안내"
          icon={Bell}
          emptyText="아직 등록된 공지사항이 없습니다."
        />
      )}

      {/* 2. TAB: 자유게시판 (비회원 글쓰기 & 24시간 깜빡이는 NEW 뱃지) */}
      {activeTab === 'freeboard' && (
        <div>
          {/* Detailed Post View */}
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
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  {selectedPost.title}
                  {isWithin24Hours(selectedPost.timestamp) && (
                    <span className="new-badge-blink">NEW</span>
                  )}
                </h3>
                <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
                  <span>✍️ 작성자: <strong>{selectedPost.author}</strong></span>
                  <span>📅 작성일: {selectedPost.date}</span>
                  <span>👁️ 조회수: {selectedPost.views}</span>
                </div>
              </div>

              {/* Post Body Content */}
              <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#334155', minHeight: '120px', padding: '0.5rem 0', whiteSpace: 'pre-line' }}>
                {selectedPost.content}
              </div>

              {/* Comments Section */}
              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageSquare size={18} /> 댓글 ({selectedPost.comments.length})
                </h4>

                {/* Comment List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  {selectedPost.comments.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>등록된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
                  ) : (
                    selectedPost.comments.map((c, idx) => (
                      <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1.1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.82rem', fontWeight: '800' }}>
                          <span style={{ color: '#0284c7' }}>{c.author}</span>
                          <span style={{ color: '#94a3b8', fontWeight: '500' }}>{c.date}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#334155' }}>{c.content}</div>
                      </div>
                    ))
                  )}
                </div>

                {/* Non-member Comment Input Form */}
                <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <input
                      type="text"
                      placeholder="비회원 작성자명 (예: 이조리사)"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      style={{ padding: '0.45rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', width: '220px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <input
                      type="text"
                      placeholder="댓글 내용을 입력해 주세요."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      댓글 등록
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Freeboard List View */
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                  <MessageSquare size={20} color="var(--primary)" /> 학교급식 관계자 자유 소통 게시판
                </h3>

                {/* Non-member Write Button */}
                <button
                  onClick={() => setShowWriteModal(true)}
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '6px' }}
                >
                  <Edit3 size={16} /> ✏️ 비회원 글쓰기
                </button>
              </div>

              {/* Board Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.75rem', width: '70px' }}>번호</th>
                      <th style={{ padding: '0.75rem' }}>제목</th>
                      <th style={{ padding: '0.75rem', width: '130px' }}>작성자</th>
                      <th style={{ padding: '0.75rem', width: '110px' }}>등록일</th>
                      <th style={{ padding: '0.75rem', width: '70px' }}>조회</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => {
                      const isNew = isWithin24Hours(post.timestamp);
                      return (
                        <tr
                          key={post.id}
                          onClick={() => handlePostClick(post)}
                          style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <td style={{ padding: '0.85rem 0.75rem', fontWeight: '700', color: 'var(--primary)' }}>{post.id}</td>
                          <td style={{ padding: '0.85rem 0.75rem', fontWeight: '700', color: '#0f172a' }}>
                            {post.title}
                            {/* 🌟 24시간 이내 등록된 글에 깜빡이는 NEW 뱃지 표시 */}
                            {isNew && <span className="new-badge-blink">NEW</span>}

                            {post.comments.length > 0 && (
                              <span style={{ fontSize: '0.78rem', color: '#0284c7', marginLeft: '0.4rem', fontWeight: '800' }}>
                                [{post.comments.length}]
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '0.85rem 0.75rem', color: '#475569', fontWeight: '600' }}>{post.author}</td>
                          <td style={{ padding: '0.85rem 0.75rem', color: '#94a3b8' }}>{post.date}</td>
                          <td style={{ padding: '0.85rem 0.75rem', color: '#94a3b8' }}>{post.views}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 🌟 Non-member Write Modal Form */}
          {showWriteModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(4px)'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                width: '90%',
                maxWidth: '550px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Edit3 size={20} /> ✏️ 자유게시판 비회원 글쓰기
                </h3>

                <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <input
                      type="text"
                      placeholder="작성자명 (예: 김영양 / 홍성중)"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      required
                      style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    />
                    <input
                      type="password"
                      placeholder="비밀번호 (수정/삭제용)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="게시글 제목을 입력해 주세요."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: '700' }}
                  />

                  <textarea
                    placeholder="문의사항, 식자재 후기, 급식 소통 내용 등을 자유롭게 작성해 주세요."
                    rows={6}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                    style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowWriteModal(false)}
                      className="btn btn-outline"
                      style={{ padding: '0.55rem 1.2rem' }}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ padding: '0.55rem 1.4rem', fontWeight: '800' }}
                    >
                      게시글 등록하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
