import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_SCHOOLS } from '../data/mockData';
import { Search, MapPin, CheckCircle, School, Star, Users } from 'lucide-react';

export default function SchoolSearch() {
  const { selectedSchool, setSelectedSchool, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('전체');

  const filteredSchools = SAMPLE_SCHOOLS.filter(s => {
    const matchesName = s.name.includes(searchTerm) || s.region.includes(searchTerm);
    const matchesType = selectedType === '전체' || s.type === selectedType;
    return matchesName && matchesType;
  });

  const handleSelect = (school) => {
    setSelectedSchool(school);
    setCurrentPage('home');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-primary">나이스(NEIS) 오픈데이터 지원</span>
          <span className="badge badge-accent">전국 학교 급식 망망대해</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
          전국 초·중·고등학교 급식 검색
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          학교명이나 지역을 검색하여 원하는 학교의 실시간 급식 식단표를 확인하세요.
        </p>
      </div>

      {/* Search Filter Bar */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="학교명 또는 지역 검색 (예: 강남구, 한국고, 주문초)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 3rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-page)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Type Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['전체', '초등학교', '중학교', '고등학교'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`btn btn-sm ${selectedType === type ? 'btn-primary' : 'btn-outline'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* School Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredSchools.map(school => {
          const isSelected = selectedSchool.id === school.id;
          return (
            <div
              key={school.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                boxShadow: isSelected ? '0 6px 18px var(--primary-glow)' : 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="badge badge-primary" style={{ marginBottom: '0.3rem' }}>{school.type}</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{school.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: '700', fontSize: '0.9rem' }}>
                    <Star size={16} fill="#f59e0b" />
                    <span>{school.rating}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={15} color="var(--primary)" />
                    <span>{school.region}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Users size={15} color="var(--accent)" />
                    <span>재학생 수 {school.students}명</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSelect(school)}
                className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                style={{ width: '100%' }}
              >
                {isSelected ? (
                  <>
                    <CheckCircle size={16} /> 현재 설정된 학교 (오늘의 급식 보기)
                  </>
                ) : (
                  '이 학교 급식표 보기'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
