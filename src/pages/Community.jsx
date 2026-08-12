import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SPECIAL_MEAL_VOTES, STUDENT_REVIEWS } from '../data/mockData';
import { MessageSquare, Award, Star, Send, ThumbsUp, CheckCircle, Heart, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Community() {
  const { selectedSchool } = useApp();
  const [votes, setVotes] = useState(SPECIAL_MEAL_VOTES);
  const [hasVotedId, setHasVotedId] = useState(null);
  const [reviews, setReviews] = useState(STUDENT_REVIEWS);

  // New Review Form State
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  // Suggestion Box Form State
  const [suggestion, setSuggestion] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const handleVoteClick = (id) => {
    if (hasVotedId === id) return;
    setVotes(prev => prev.map(v => v.id === id ? { ...v, votes: v.votes + 1 } : v));
    setHasVotedId(id);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newRev = {
      id: Date.now(),
      author: author.trim() || '익명 학생',
      school: selectedSchool.name,
      mealType: '중식',
      rating: parseFloat(rating),
      content: content.trim(),
      date: '방금 전',
      likes: 0,
      image: null
    };

    setReviews([newRev, ...reviews]);
    setContent('');
    setAuthor('');
    alert('급식 후기가 등록되었습니다! 감사합니다 ❤️');
  };

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSuggestionSubmitted(true);
    setSuggestion('');
    setTimeout(() => setSuggestionSubmitted(false), 4000);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-accent">급식소 소통 공간</span>
          <span className="badge badge-primary">{selectedSchool.name}</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
          급식 소리함 & 특식 메뉴 투표소
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          맛있었던 식단 후기를 공유하고, 다음 달 먹고 싶은 특식에 투표해보세요!
        </p>
      </div>

      {/* Grid Layout: Left Special Meal Vote / Right Review Form & List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Left: Special Meal Voting Center */}
        <div className="glass-card" style={{ padding: '1.75rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Award size={24} color="var(--accent)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>🏆 다음 달 희망 특식 득표전</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            매달 학생 득표수 1위 메뉴는 영양사 선생님께서 다음 달 특식으로 준비해주십니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {votes.map(item => {
              const isVoted = hasVotedId === item.id;
              const totalVotes = votes.reduce((acc, curr) => acc + curr.votes, 0);
              const percent = Math.round((item.votes / totalVotes) * 100);

              return (
                <div 
                  key={item.id}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isVoted ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                    boxShadow: isVoted ? '0 4px 12px rgba(249, 115, 22, 0.2)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '1rem' }}>{item.icon} {item.title}</span>
                    <span className="badge badge-accent">{item.tag}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    <span>득표율 {percent}% ({item.votes}표)</span>
                    {isVoted && <span style={{ color: 'var(--accent)', fontWeight: '800' }}>✓ 투표 완료</span>}
                  </div>

                  <div style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                    <div style={{ width: `${percent}%`, height: '100%', backgroundColor: 'var(--accent)', borderRadius: '4px', transition: 'width 0.4s ease' }}></div>
                  </div>

                  <button
                    onClick={() => handleVoteClick(item.id)}
                    className={`btn btn-sm ${isVoted ? 'btn-accent' : 'btn-outline'}`}
                    style={{ width: '100%' }}
                    disabled={hasVotedId !== null && hasVotedId !== item.id}
                  >
                    <ThumbsUp size={14} /> {isVoted ? '내가 선택한 메뉴!' : '이 메뉴에 투표하기'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Review Form & Recent Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Create Review Form */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Heart size={18} color="var(--accent)" /> 오늘 급식 리뷰 작성하기
            </h3>

            <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="닉네임 (예: 3학년 김*진)"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-page)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem'
                  }}
                />
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-page)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    fontWeight: '700'
                  }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5점)</option>
                  <option value={4.5}>⭐⭐⭐⭐✨ (4.5점)</option>
                  <option value={4}>⭐⭐⭐⭐ (4점)</option>
                  <option value={3}>⭐⭐⭐ (3점)</option>
                </select>
              </div>

              <textarea
                placeholder="오늘 급식 중 가장 맛있었던 메뉴와 솔직한 한줄 후기를 남겨주세요!"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  resize: 'none'
                }}
              />

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={15} /> 급식 후기 등록
              </button>
            </form>
          </div>

          {/* Student Reviews Feed List */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MessageSquare size={18} color="var(--primary)" /> 학생들의 급식 소리함 피드
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {reviews.map(item => (
                <div key={item.id} style={{
                  backgroundColor: 'var(--bg-page)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.author}</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>{item.mealType}</span>
                    </div>
                    <span style={{ color: '#f59e0b', fontWeight: '700', fontSize: '0.85rem' }}>★ {item.rating}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.45 }}>{item.content}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Private Suggestion Box */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Lock size={22} color="var(--primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>영양사 선생님께 보내는 익명 급식 건의함</h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          급식 개선 아이디어, 위생 문의, 메뉴 제안 등 의견을 전달해주시면 영양 선생님께서 안전하게 검토하십니다.
        </p>

        {suggestionSubmitted ? (
          <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle size={20} /> 소중한 건의사항이 영양사 선생님께 익명으로 잘 전달되었습니다!
          </div>
        ) : (
          <form onSubmit={handleSuggestionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <textarea
              placeholder="건의할 내용을 입력해 주세요 (예: 샐러드 드레싱 종류를 다양하게 해주시면 좋겠습니다)"
              rows={3}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-page)',
                color: 'var(--text-main)',
                fontSize: '0.9rem'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
                익명으로 제출하기 (개인정보 미포함)
              </label>
              <button type="submit" className="btn btn-primary btn-sm">
                건의함에 넣기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
