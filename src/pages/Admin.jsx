import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useApp } from '../context/AppContext';
import { BRANDS, PROMOTION_PRODUCTS } from '../data/jwFsOriginalData';
import { LogIn, LogOut, UploadCloud, CheckCircle2, X, Pencil, Trash2 } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '420px', padding: '4rem 1rem' }}>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2.5rem 2rem', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <LogIn size={32} color="#0b69c7" style={{ marginBottom: '0.75rem' }} />
        <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem' }}>관리자 로그인</h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.3rem' }}>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.3rem' }}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          {error && <div style={{ color: '#d32f2f', fontSize: '0.85rem', fontWeight: '700' }}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', padding: '0.75rem', fontSize: '1rem', fontWeight: '800', justifyContent: 'center' }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}

function ProductEditor() {
  const { productOverrides, refreshProductOverrides } = useApp();
  const [selectedBrandId, setSelectedBrandId] = useState(BRANDS[0].id);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [spec, setSpec] = useState('');
  const [mainIngredient, setMainIngredient] = useState('');
  const [storage, setStorage] = useState('');
  const [shelfLife, setShelfLife] = useState('');
  const [noticeMemo, setNoticeMemo] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const brandProducts = PROMOTION_PRODUCTS.filter(p => p.brandId === selectedBrandId);
  const selectedProduct = PROMOTION_PRODUCTS.find(p => p.id === Number(selectedProductId));

  // 브랜드 바꾸면 상품 선택 초기화
  useEffect(() => {
    setSelectedProductId('');
  }, [selectedBrandId]);

  // 상품 선택하면 현재 저장된 값(있으면)으로 폼 채우기
  useEffect(() => {
    if (!selectedProduct) {
      setImagePreview('');
      setImageFile(null);
      setName('');
      setPrice('');
      setSpec('');
      setMainIngredient('');
      setStorage('');
      setShelfLife('');
      setNoticeMemo('');
      setSavedMsg('');
      return;
    }
    const ov = productOverrides[selectedProduct.id];
    setImagePreview(ov?.image_url || selectedProduct.img || '');
    setImageFile(null);
    setName(ov?.name || selectedProduct.name || '');
    setPrice(ov?.price || selectedProduct.salePrice || '');
    setSpec(ov?.spec || selectedProduct.spec || '');
    setMainIngredient(ov?.main_ingredient || '');
    setStorage(ov?.storage || selectedProduct.storage || '');
    setShelfLife(ov?.shelf_life || '');
    setNoticeMemo(ov?.notice_memo || '');
    setSavedMsg('');
  }, [selectedProductId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!selectedProduct) return;
    setSaving(true);
    setSavedMsg('');

    let imageUrl = productOverrides[selectedProduct.id]?.image_url || null;

    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const path = `product-${selectedProduct.id}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(path, imageFile, { upsert: true });

      if (uploadError) {
        setSaving(false);
        setSavedMsg('❌ 사진 업로드 실패: ' + uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(path);
      imageUrl = publicUrlData.publicUrl;
    }

    const { error: saveError } = await supabase.from('product_overrides').upsert({
      product_id: selectedProduct.id,
      image_url: imageUrl,
      name,
      price,
      spec,
      main_ingredient: mainIngredient,
      storage,
      shelf_life: shelfLife,
      notice_memo: noticeMemo,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);

    if (saveError) {
      setSavedMsg('❌ 저장 실패: ' + saveError.message);
      return;
    }

    await refreshProductOverrides();
    setImageFile(null);
    setSavedMsg('✅ 저장되었습니다! 사이트에 바로 반영됩니다.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* 1. 브랜드 선택 */}
      <div>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
          ① 브랜드를 선택하세요
        </label>
        <select
          value={selectedBrandId}
          onChange={(e) => setSelectedBrandId(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        >
          {BRANDS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      {/* 2. 상품 선택 */}
      <div>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
          ② 수정할 상품을 선택하세요
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        >
          <option value="">-- 상품을 선택하세요 --</option>
          {brandProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {selectedProduct && (
        <div style={{ border: '2px solid #0b69c7', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#f8fafc' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b69c7', marginBottom: '1.25rem' }}>
            "{selectedProduct.name}" 수정
          </h3>

          {/* 3. 사진 업로드 */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
              ③ 상품 사진 (선택 안 하면 기존 사진 유지)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              {imagePreview && (
                <img src={imagePreview} alt="미리보기" style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              )}
              <label
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.9rem 1.4rem', backgroundColor: '#0b69c7', color: '#ffffff',
                  borderRadius: '8px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer'
                }}
              >
                <UploadCloud size={20} />
                사진 선택하기
                <input type="file" accept="image/*" onChange={handleImagePick} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* 4. 제품명 */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ④ 제품명
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* 5. 단가 */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ⑤ 단가
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="예: 26,140"
              style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* 6. 제품규격 */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ⑥ 제품규격
            </label>
            <input
              type="text"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              placeholder="예: 3kg"
              style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* 7. 주원료 */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ⑦ 주원료
            </label>
            <input
              type="text"
              value={mainIngredient}
              onChange={(e) => setMainIngredient(e.target.value)}
              placeholder="예: 대두(국산)100%, 정제소금"
              style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* 8. 보관방법 */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ⑧ 보관방법
            </label>
            <input
              type="text"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              placeholder="예: 냉장보관 (0~10℃)"
              style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* 9. 유통기한 */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ⑨ 유통기한
            </label>
            <input
              type="text"
              value={shelfLife}
              onChange={(e) => setShelfLife(e.target.value)}
              placeholder="예: 냉장 10일"
              style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* 10. 공지 메모 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ⑩ 조리사 안내 메모 (이 상품 사용하는 학교 조리사에게 보여줄 안내글)
            </label>
            <textarea
              value={noticeMemo}
              onChange={(e) => setNoticeMemo(e.target.value)}
              placeholder="예: 이번 달부터 포장 규격이 변경되었습니다. 조리 시 참고해주세요."
              rows={4}
              style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: '900', justifyContent: 'center' }}
          >
            {saving ? '저장 중...' : '저장하기'}
          </button>

          {savedMsg && (
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: '800', color: savedMsg.startsWith('✅') ? '#15803d' : '#d32f2f' }}>
              {savedMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const BOARD_CATEGORIES = [
  { id: 'promotion', label: '신상품&행사' },
  { id: 'recipe', label: '레시피&식단' },
  { id: 'notice', label: '공지사항' },
];

function PostEditor() {
  const [category, setCategory] = useState('promotion');
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = 새 글 작성
  const [title, setTitle] = useState('');
  const [existingImages, setExistingImages] = useState([]); // 이미 저장된 이미지 URL들
  const [newImageFiles, setNewImageFiles] = useState([]); // 새로 추가할 파일들
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const loadPosts = async (cat) => {
    setLoadingPosts(true);
    const { data } = await supabase.from('board_posts').select('*').eq('category', cat).order('created_at', { ascending: false });
    setPosts(data || []);
    setLoadingPosts(false);
  };

  useEffect(() => {
    resetForm();
    loadPosts(category);
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setExistingImages([]);
    setNewImageFiles([]);
    setBody('');
    setSavedMsg('');
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title || '');
    setExistingImages(post.images || []);
    setNewImageFiles([]);
    setBody(post.body || '');
    setSavedMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles(prev => [...prev, ...files]);
  };

  const removeExistingImage = (idx) => {
    setExistingImages(prev => prev.filter((_, i) => i !== idx));
  };

  const removeNewImage = (idx) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setSavedMsg('❌ 제목을 입력해주세요.');
      return;
    }
    setSaving(true);
    setSavedMsg('');

    const uploadedUrls = [];
    for (const file of newImageFiles) {
      const ext = file.name.split('.').pop();
      const path = `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file);
      if (uploadError) {
        setSaving(false);
        setSavedMsg('❌ 사진 업로드 실패: ' + uploadError.message);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(path);
      uploadedUrls.push(publicUrlData.publicUrl);
    }

    const finalImages = [...existingImages, ...uploadedUrls];

    let saveError;
    if (editingId) {
      ({ error: saveError } = await supabase.from('board_posts').update({
        title, images: finalImages, body,
      }).eq('id', editingId));
    } else {
      ({ error: saveError } = await supabase.from('board_posts').insert({
        title, images: finalImages, body, category,
      }));
    }

    setSaving(false);

    if (saveError) {
      setSavedMsg('❌ 저장 실패: ' + saveError.message);
      return;
    }

    await loadPosts(category);
    resetForm();
    setSavedMsg('✅ 저장되었습니다! 사이트에 바로 반영됩니다.');
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`"${post.title}" 글을 삭제할까요?`)) return;
    await supabase.from('board_posts').delete().eq('id', post.id);
    if (editingId === post.id) resetForm();
    await loadPosts(category);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
          어느 게시판에 글을 올릴까요?
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {BOARD_CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              style={{
                padding: '0.6rem 1.1rem', fontSize: '0.9rem', fontWeight: '800', borderRadius: '8px', cursor: 'pointer',
                border: category === c.id ? '2px solid #0b69c7' : '1px solid #cbd5e1',
                backgroundColor: category === c.id ? '#e0f2fe' : '#ffffff',
                color: category === c.id ? '#0b69c7' : '#64748b'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ border: '2px solid #0b69c7', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#f8fafc' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b69c7', marginBottom: '1.25rem' }}>
          {editingId ? '글 수정' : '새 글 작성'} — {BOARD_CATEGORIES.find(c => c.id === category)?.label}
        </h3>

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
            ① 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 9월 하림 안내장"
            style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
            ② 사진 (여러 장 선택 가능)
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {existingImages.map((url, idx) => (
              <div key={'ex' + idx} style={{ position: 'relative' }}>
                <img src={url} alt="" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <button onClick={() => removeExistingImage(idx)} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={13} />
                </button>
              </div>
            ))}
            {newImageFiles.map((file, idx) => (
              <div key={'new' + idx} style={{ position: 'relative' }}>
                <img src={URL.createObjectURL(file)} alt="" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #0b69c7' }} />
                <button onClick={() => removeNewImage(idx)} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
          <label
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.9rem 1.4rem', backgroundColor: '#0b69c7', color: '#ffffff',
              borderRadius: '8px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer'
            }}
          >
            <UploadCloud size={20} />
            사진 추가하기
            <input type="file" accept="image/*" multiple onChange={handleAddImages} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
            ③ 내용
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="안내할 내용을 입력하세요."
            rows={6}
            style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary"
            style={{ flex: 1, padding: '1rem', fontSize: '1.05rem', fontWeight: '900', justifyContent: 'center' }}
          >
            {saving ? '저장 중...' : editingId ? '수정 저장' : '등록하기'}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="btn btn-outline"
              style={{ padding: '1rem 1.25rem', fontSize: '0.95rem', fontWeight: '700' }}
            >
              취소
            </button>
          )}
        </div>

        {savedMsg && (
          <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: '800', color: savedMsg.startsWith('✅') ? '#15803d' : '#d32f2f' }}>
            {savedMsg}
          </div>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.75rem' }}>등록된 글 목록</h3>
        {loadingPosts ? (
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>등록된 글이 없습니다.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {posts.map(post => (
              <div key={post.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                {post.images?.[0] && (
                  <img src={post.images[0]} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                )}
                <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{post.title}</div>
                <button onClick={() => startEdit(post)} style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: '700', color: '#0b69c7', border: '1px solid #bae6fd', borderRadius: '6px', backgroundColor: '#f0f9ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Pencil size={13} /> 수정
                </button>
                <button onClick={() => handleDelete(post)} style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: '700', color: '#d32f2f', border: '1px solid #fca5a5', borderRadius: '6px', backgroundColor: '#fef2f2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Trash2 size={13} /> 삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(undefined); // undefined = 확인 중, null = 비로그인
  const [activeTab, setActiveTab] = useState('product'); // 'product' | 'post'

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', color: '#64748b' }}>확인 중...</div>;
  }

  if (!session) {
    return <LoginForm />;
  }

  return (
    <div className="container" style={{ maxWidth: '640px', padding: '2.5rem 1rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={22} color="#15803d" /> 상품 관리자
        </h2>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.9rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', cursor: 'pointer' }}
        >
          <LogOut size={15} /> 로그아웃
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0' }}>
        <button
          onClick={() => setActiveTab('product')}
          style={{
            padding: '0.7rem 1.2rem', fontSize: '0.95rem', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer',
            color: activeTab === 'product' ? '#0b69c7' : '#94a3b8',
            borderBottom: activeTab === 'product' ? '3px solid #0b69c7' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          상품 정보 수정
        </button>
        <button
          onClick={() => setActiveTab('post')}
          style={{
            padding: '0.7rem 1.2rem', fontSize: '0.95rem', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer',
            color: activeTab === 'post' ? '#0b69c7' : '#94a3b8',
            borderBottom: activeTab === 'post' ? '3px solid #0b69c7' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          게시판 글 관리
        </button>
      </div>

      {activeTab === 'product' ? <ProductEditor /> : <PostEditor />}
    </div>
  );
}
