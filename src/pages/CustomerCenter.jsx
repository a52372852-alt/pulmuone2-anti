import React, { useState } from 'react';
import { NOTICES } from '../data/jwFsData';
import { MessageSquare, Bell, FileText, Send, CheckCircle2, PhoneCall } from 'lucide-react';

export default function CustomerCenter() {
  const [activeTab, setActiveTab] = useState('notice');

  // Order Inquiry Form State
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('신규 납품 견적 문의');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schoolName || !phone) {
      alert('학교/기관명과 연락처를 입력해주세요.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSchoolName('');
      setContactName('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>COMMUNITY & SUPPORT</span>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          고객센터 & 견적 문의 (Customer Center)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          (주)장원의 공지사항을 확인하시거나 신규 식자재 납품/견적 문의를 전달해주시면 전담 마스터가 연락드립니다.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('notice')}
          className={`btn ${activeTab === 'notice' ? 'btn-primary' : 'btn-outline'}`}
        >
          📢 공지사항 & 위생 소식
        </button>
        <button
          onClick={() => setActiveTab('inquiry')}
          className={`btn ${activeTab === 'inquiry' ? 'btn-primary' : 'btn-outline'}`}
        >
          📝 신규 납품 & 견적 문의
        </button>
      </div>

      {activeTab === 'notice' && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Bell size={20} color="var(--primary)" /> (주)장원 최신 소식 및 위생 안내문
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem', width: '80px' }}>번호</th>
                  <th style={{ padding: '0.75rem' }}>제목</th>
                  <th style={{ padding: '0.75rem', width: '120px' }}>등록일</th>
                  <th style={{ padding: '0.75rem', width: '80px' }}>조회수</th>
                </tr>
              </thead>
              <tbody>
                {NOTICES.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: '700', color: 'var(--primary)' }}>{item.id}</td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: '700' }}>{item.title}</td>
                    <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-muted)' }}>{item.date}</td>
                    <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-muted)' }}>{item.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'inquiry' && (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PhoneCall size={24} color="var(--accent)" /> 학교/기관 급식 식자재 신규 납품 & 견적 상담
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            양식을 작성해주시면 담당 물류 영양 마스터가 2시간 이내에 직접 연락을 드립니다.
          </p>

          {submitted ? (
            <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={24} /> 납품 견적 문의가 성공적으로 접수되었습니다. 빠르게 연락드리겠습니다!
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="학교 / 기관명 (예: 서울한국고등학교)"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-page)', color: 'var(--text-main)' }}
                />
                <input
                  type="text"
                  placeholder="담당자 성함 (예: 김영양 영양사)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-page)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="연락처 (예: 010-1234-5678)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-page)', color: 'var(--text-main)' }}
                />
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-page)', color: 'var(--text-main)', fontWeight: '700' }}
                >
                  <option>신규 납품 견적 문의</option>
                  <option>식자재 단가표 요청</option>
                  <option>HACCP 위생 인증서 요청</option>
                  <option>기타 1:1 상담</option>
                </select>
              </div>

              <textarea
                placeholder="문의 내용 및 요구사항을 작성해 주세요 (예: 2026년 2학기 친환경 쌀 및 1등급 돼지고기 견적서 요청)"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-page)', color: 'var(--text-main)' }}
              />

              <button type="submit" className="btn btn-primary">
                <Send size={16} /> 견적 및 상담 접수하기
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
