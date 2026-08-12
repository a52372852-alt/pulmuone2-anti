import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_SCHOOLS } from '../data/mockData';
import { Search, X, MapPin, CheckCircle, School } from 'lucide-react';

export default function SchoolSearchModal() {
  const { isSearchOpen, setIsSearchOpen, selectedSchool, setSelectedSchool } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('전체');

  if (!isSearchOpen) return null;

  const filteredSchools = SAMPLE_SCHOOLS.filter(s => {
    const matchesName = s.name.includes(searchTerm) || s.region.includes(searchTerm);
    const matchesType = selectedType === '전체' || s.type === selectedType;
    return matchesName && matchesType;
  });

  const handleSelect = (school) => {
    setSelectedSchool(school);
    setIsSearchOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="glass-card animate-fade-in" style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.75rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <School size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>전국 학교 검색</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>식단을 조회할 내 학교를 검색해보세요</p>
            </div>
          </div>
          <button onClick={() => setIsSearchOpen(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="학교명 또는 지역 검색 (예: 한국고, 강남구, 초등학교)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-page)',
              color: 'var(--text-main)',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Type Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {['전체', '초등학교', '중학교', '고등학교'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`btn btn-sm ${selectedType === type ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* School List */}
        <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filteredSchools.length > 0 ? (
            filteredSchools.map(school => {
              const isSelected = selectedSchool.id === school.id;
              return (
                <div
                  key={school.id}
                  onClick={() => handleSelect(school)}
                  style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-page)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>{school.name}</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{school.type}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <MapPin size={12} /> {school.region} • 전교생 {school.students}명
                    </p>
                  </div>
                  {isSelected ? (
                    <span style={{ color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.85rem' }}>
                      <CheckCircle size={16} /> 선택됨
                    </span>
                  ) : (
                    <button className="btn btn-sm btn-outline">선택</button>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
              검색 조건에 맞는 학교가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
