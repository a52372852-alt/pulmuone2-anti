import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useApp } from '../context/AppContext';

import { LogIn, LogOut, UploadCloud, CheckCircle2, X, Pencil, Trash2 } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState('');
  const [resetting, setResetting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setResetMsg('');
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 비밀번호 재설정 메일 발송 (입력된 이메일 주소로)
  const handleResetPassword = async () => {
    setError('');
    setResetMsg('');
    if (!email.includes('@')) {
      setResetMsg('❌ 먼저 위에 이메일 주소를 입력해주세요.');
      return;
    }
    setResetting(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    setResetting(false);
    if (resetError) {
      setResetMsg('❌ 발송 실패: ' + resetError.message);
      return;
    }
    setResetMsg('✅ "' + email + '"로 비밀번호 재설정 메일을 보냈습니다. 메일함(스팸함도)을 확인해주세요.');
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

        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
          <button
            type="button"
            onClick={handleResetPassword}
            disabled={resetting}
            style={{
              background: 'none', border: 'none', color: '#0b69c7', fontSize: '0.88rem',
              fontWeight: '700', cursor: 'pointer', textDecoration: 'underline', padding: 0
            }}
          >
            {resetting ? '메일 보내는 중...' : '비밀번호를 잊으셨나요?'}
          </button>
          <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.6', textAlign: 'left' }}>
            위 이메일 칸에 주소를 입력한 뒤 눌러주세요. 해당 메일로 재설정 링크가 발송됩니다.
          </p>
          {resetMsg && (
            <div style={{ marginTop: '0.6rem', fontSize: '0.85rem', fontWeight: '700', lineHeight: '1.6', textAlign: 'left', color: resetMsg.startsWith('✅') ? '#15803d' : '#d32f2f' }}>
              {resetMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const emptyForm = { name: '', salePrice: '', originalPrice: '', spec: '', mainIngredient: '', storage: '', shelfLife: '', term: '', isEvent: false, noticeMemo: '' };

function ProductEditor() {
  const { products, refreshProducts, brands } = useApp();
  const [selectedBrandId, setSelectedBrandId] = useState('');

  useEffect(() => {
    if (!selectedBrandId && brands.length > 0) setSelectedBrandId(brands[0].id);
  }, [brands]); // eslint-disable-line react-hooks/exhaustive-deps
  const [selectedProductId, setSelectedProductId] = useState(''); // '' | 'new' | id
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const brandProducts = products.filter(p => p.brandId === selectedBrandId);
  const selectedProduct = selectedProductId === 'new' ? null : products.find(p => p.id === Number(selectedProductId));
  const isEditing = selectedProductId !== '';

  useEffect(() => { setSelectedProductId(''); }, [selectedBrandId]);

  useEffect(() => {
    if (selectedProductId === 'new') {
      setForm(emptyForm);
      setImagePreview('');
      setImageFile(null);
      setSavedMsg('');
      return;
    }
    if (!selectedProduct) return;
    setForm({
      name: selectedProduct.name || '',
      salePrice: selectedProduct.salePrice || '',
      originalPrice: selectedProduct.originalPrice || '',
      spec: selectedProduct.spec || '',
      mainIngredient: selectedProduct.mainIngredient || '',
      storage: selectedProduct.storage || '',
      shelfLife: selectedProduct.shelfLife || '',
      term: selectedProduct.term || '',
      isEvent: !!selectedProduct.isEvent,
      noticeMemo: selectedProduct.noticeMemo || '',
    });
    setImagePreview(selectedProduct.img || '');
    setImageFile(null);
    setSavedMsg('');
  }, [selectedProductId]); // eslint-disable-line react-hooks/exhaustive-deps

  const setField = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setSavedMsg('❌ 제품명을 입력해주세요.'); return; }
    setSaving(true);
    setSavedMsg('');

    let imageUrl = selectedProduct?.img || null;
    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const path = `product-${selectedBrandId}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(path, imageFile);
      if (uploadError) {
        setSaving(false);
        setSavedMsg('❌ 사진 업로드 실패: ' + uploadError.message);
        return;
      }
      imageUrl = supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
    }

    const brandName = brands.find(b => b.id === selectedBrandId)?.name || selectedBrandId;
    const payload = {
      brand_id: selectedBrandId,
      category: selectedProduct?.category || `${brandName} - ${brandName}`,
      name: form.name,
      sale_price: form.salePrice,
      original_price: form.originalPrice,
      spec: form.spec,
      main_ingredient: form.mainIngredient,
      storage: form.storage,
      shelf_life: form.shelfLife,
      term: form.term,
      is_event: form.isEvent,
      notice_memo: form.noticeMemo,
      img: imageUrl,
      updated_at: new Date().toISOString(),
    };

    const { error: saveError } = selectedProductId === 'new'
      ? await supabase.from('products').insert(payload)
      : await supabase.from('products').update(payload).eq('id', selectedProduct.id);

    setSaving(false);
    if (saveError) { setSavedMsg('❌ 저장 실패: ' + saveError.message); return; }

    await refreshProducts();
    setImageFile(null);
    setSavedMsg(selectedProductId === 'new' ? '✅ 새 상품이 등록되었습니다!' : '✅ 저장되었습니다! 사이트에 바로 반영됩니다.');
    if (selectedProductId === 'new') setSelectedProductId('');
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    if (!window.confirm(`"${selectedProduct.name}" 상품을 삭제할까요?`)) return;
    setDeleting(true);
    await supabase.from('products').delete().eq('id', selectedProduct.id);
    setDeleting(false);
    setSelectedProductId('');
    await refreshProducts();
  };

  const fields = [
    ['제품명', 'name', 'text'],
    ['단가', 'salePrice', 'text', '예: 26,140'],
    ['정상가', 'originalPrice', 'text', '예: 30,750'],
    ['제품규격', 'spec', 'text', '예: 3kg'],
    ['주원료', 'mainIngredient', 'text', '예: 대두(국산)100%, 정제소금'],
    ['보관방법', 'storage', 'text', '예: 냉장보관 (0~10℃)'],
    ['유통기한', 'shelfLife', 'text', '예: 냉장 10일'],
    ['공급 기간', 'term', 'text', '예: (26년 1~2학기)'],
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      <div>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
          ① 브랜드를 선택하세요
        </label>
        <select value={selectedBrandId} onChange={(e) => setSelectedBrandId(e.target.value)} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
          {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      <div>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
          ② 상품을 선택하거나 새로 추가하세요
        </label>
        <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
          <option value="">-- 선택하세요 --</option>
          <option value="new">➕ 새 상품 추가</option>
          {brandProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {isEditing && (
        <div style={{ border: '2px solid #0b69c7', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#f8fafc' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b69c7', marginBottom: '1.25rem' }}>
            {selectedProductId === 'new' ? '새 상품 등록' : `"${selectedProduct?.name}" 수정`}
          </h3>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
              ③ 상품 사진
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              {imagePreview && (
                <img src={imagePreview} alt="미리보기" style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              )}
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.4rem', backgroundColor: '#0b69c7', color: '#ffffff', borderRadius: '8px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer' }}>
                <UploadCloud size={20} /> 사진 선택하기
                <input type="file" accept="image/*" onChange={handleImagePick} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {fields.map(([label, key, , placeholder], idx) => (
            <div key={key} style={{ marginBottom: '1.1rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                ④{idx > 0 ? `-${idx + 1}` : ''} {label}
              </label>
              <input type="text" value={form[key]} onChange={setField(key)} placeholder={placeholder} style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          ))}

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.isEvent} onChange={(e) => setForm(prev => ({ ...prev, isEvent: e.target.checked }))} />
            행사 상품으로 표시
          </label>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
              ⑤ 조리사 안내 메모
            </label>
            <textarea value={form.noticeMemo} onChange={setField('noticeMemo')} placeholder="예: 이번 달부터 포장 규격이 변경되었습니다." rows={4} style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical', fontFamily: 'inherit' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.05rem', fontWeight: '900', justifyContent: 'center' }}>
              {saving ? '저장 중...' : selectedProductId === 'new' ? '등록하기' : '저장하기'}
            </button>
            {selectedProductId !== 'new' && (
              <button onClick={handleDelete} disabled={deleting} style={{ padding: '1rem 1.25rem', fontSize: '0.95rem', fontWeight: '800', color: '#d32f2f', border: '1px solid #fca5a5', borderRadius: '8px', backgroundColor: '#fef2f2', cursor: 'pointer' }}>
                {deleting ? '삭제 중...' : '삭제'}
              </button>
            )}
          </div>

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
  { id: 'promotion', label: '서진 행사지' },
  { id: 'recipe', label: '서진 레시피' },
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
  const [existingAttachment, setExistingAttachment] = useState(null); // { url, name }
  const [newAttachmentFile, setNewAttachmentFile] = useState(null);
  const [body, setBody] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
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
    setExistingAttachment(null);
    setNewAttachmentFile(null);
    setBody('');
    setDriveUrl('');
    setSavedMsg('');
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title || '');
    setExistingImages(post.images || []);
    setNewImageFiles([]);
    setExistingAttachment(post.attachment_url ? { url: post.attachment_url, name: post.attachment_name } : null);
    setNewAttachmentFile(null);
    setBody(post.body || '');
    setDriveUrl(post.drive_url || '');
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

  const handlePickAttachment = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewAttachmentFile(file);
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

    let attachmentUrl = existingAttachment?.url || null;
    let attachmentName = existingAttachment?.name || null;
    if (newAttachmentFile) {
      const ext = newAttachmentFile.name.split('.').pop();
      const path = `attach-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(path, newAttachmentFile);
      if (uploadError) {
        setSaving(false);
        setSavedMsg('❌ 첨부파일 업로드 실패: ' + uploadError.message);
        return;
      }
      attachmentUrl = supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
      attachmentName = newAttachmentFile.name;
    }

    let saveError;
    if (editingId) {
      ({ error: saveError } = await supabase.from('board_posts').update({
        title, images: finalImages, body, attachment_url: attachmentUrl, attachment_name: attachmentName, drive_url: driveUrl.trim() || null,
      }).eq('id', editingId));
    } else {
      ({ error: saveError } = await supabase.from('board_posts').insert({
        title, images: finalImages, body, category, attachment_url: attachmentUrl, attachment_name: attachmentName, drive_url: driveUrl.trim() || null,
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

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
            ③ 첨부파일 (PPTX, 선택)
          </label>
          {(existingAttachment || newAttachmentFile) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', padding: '0.6rem 0.9rem', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0369a1', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                📎 {newAttachmentFile ? newAttachmentFile.name : existingAttachment.name}
              </span>
              <button onClick={() => { setExistingAttachment(null); setNewAttachmentFile(null); }} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <X size={13} />
              </button>
            </div>
          )}
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.4rem', backgroundColor: '#0b69c7', color: '#ffffff', borderRadius: '8px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer' }}>
            <UploadCloud size={20} />
            PPTX 파일 선택하기
            <input type="file" accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={handlePickAttachment} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
            ④ 구글 드라이브 링크 (선택)
          </label>
          <input
            type="url"
            value={driveUrl}
            onChange={(e) => setDriveUrl(e.target.value)}
            placeholder="https://drive.google.com/... 주소를 붙여넣으세요"
            style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.6' }}>
            ※ 용량이 큰 파일은 구글 드라이브에 올린 뒤 링크를 붙여넣으세요. 게시글에 <strong>"구글 드라이브에서 보기"</strong> 버튼이 생깁니다.<br />
            드라이브에서 파일 우클릭 → 공유 → <strong>"링크가 있는 모든 사용자"</strong>로 설정해야 다른 사람이 열 수 있습니다.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
            ⑤ 내용
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
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</div>
                  <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    등록일: {(post.created_at || '').slice(0, 10)}
                  </div>
                </div>
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

function BrandEditor() {
  const { brands, refreshBrands } = useApp();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const handleAdd = async () => {
    const name = newName.trim();
    if (!name) { setMsg('❌ 브랜드 이름을 입력해주세요.'); return; }
    setBusy(true);
    setMsg('');
    const id = 'brand-' + Date.now();
    const maxOrder = brands.reduce((m, b) => Math.max(m, b.sort_order || 0), 0);
    const { error } = await supabase.from('brands').insert({ id, name, sort_order: maxOrder + 1 });
    setBusy(false);
    if (error) { setMsg('❌ 추가 실패: ' + error.message); return; }
    setNewName('');
    await refreshBrands();
    setMsg('✅ "' + name + '" 브랜드가 추가되었습니다.');
  };

  const handleSaveEdit = async (brand) => {
    const name = editingName.trim();
    if (!name) { setMsg('❌ 브랜드 이름을 입력해주세요.'); return; }
    setBusy(true);
    setMsg('');
    const { error } = await supabase.from('brands').update({ name }).eq('id', brand.id);
    setBusy(false);
    if (error) { setMsg('❌ 수정 실패: ' + error.message); return; }
    setEditingId(null);
    await refreshBrands();
    setMsg('✅ 수정되었습니다.');
  };

  const handleDelete = async (brand) => {
    if (!window.confirm(`"${brand.name}" 브랜드를 삭제할까요?\n(이 브랜드로 등록된 상품은 목록에서 보이지 않게 됩니다)`)) return;
    setBusy(true);
    setMsg('');
    const { error } = await supabase.from('brands').delete().eq('id', brand.id);
    setBusy(false);
    if (error) { setMsg('❌ 삭제 실패: ' + error.message); return; }
    await refreshBrands();
    setMsg('✅ 삭제되었습니다.');
  };

  // 위/아래 화살표로 순서 변경 (두 항목의 sort_order를 서로 맞바꿈)
  const handleMove = async (index, direction) => {
    const target = brands[index + direction];
    const current = brands[index];
    if (!target || !current) return;
    setBusy(true);
    setMsg('');
    await supabase.from('brands').update({ sort_order: target.sort_order }).eq('id', current.id);
    await supabase.from('brands').update({ sort_order: current.sort_order }).eq('id', target.id);
    setBusy(false);
    await refreshBrands();
  };

  // 드래그로 순서 변경: 놓은 위치 기준으로 전체 순번을 다시 매김
  const handleDropReorder = async (fromIdx, toIdx) => {
    if (fromIdx === toIdx || fromIdx == null || toIdx == null) return;
    const reordered = [...brands];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);

    setBusy(true);
    setMsg('');
    for (let i = 0; i < reordered.length; i++) {
      if (reordered[i].sort_order !== i + 1) {
        await supabase.from('brands').update({ sort_order: i + 1 }).eq('id', reordered[i].id);
      }
    }
    setBusy(false);
    await refreshBrands();
    setMsg('✅ 순서가 변경되었습니다.');
  };

  const btnStyle = (color, bg, border) => ({
    padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: '700', color,
    border: `1px solid ${border}`, borderRadius: '6px', backgroundColor: bg,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ border: '2px solid #0b69c7', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#f8fafc' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b69c7', marginBottom: '1rem' }}>새 브랜드 추가</h3>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
            placeholder="예: 서진식품"
            style={{ flex: 1, minWidth: '200px', padding: '0.8rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <button onClick={handleAdd} disabled={busy} className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', fontWeight: '900' }}>
            추가하기
          </button>
        </div>
        {msg && (
          <div style={{ marginTop: '0.9rem', fontSize: '0.92rem', fontWeight: '800', color: msg.startsWith('✅') ? '#15803d' : '#d32f2f' }}>
            {msg}
          </div>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.4rem' }}>브랜드 목록 (총 {brands.length}개)</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.9rem' }}>
          ▲▼ 버튼을 누르거나, 왼쪽 <strong>⠿</strong> 손잡이를 잡고 끌어서(드래그) 순서를 바꿀 수 있습니다. 바꾼 순서는 사이트 메뉴에 그대로 반영됩니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {brands.map((brand, idx) => (
            <div
              key={brand.id}
              onDragOver={(e) => { e.preventDefault(); if (dragOverIdx !== idx) setDragOverIdx(idx); }}
              onDrop={(e) => { e.preventDefault(); handleDropReorder(dragIdx, idx); setDragIdx(null); setDragOverIdx(null); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.9rem',
                border: dragOverIdx === idx && dragIdx !== null && dragIdx !== idx ? '2px dashed #0b69c7' : '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: dragIdx === idx ? '#e0f2fe' : '#ffffff',
                opacity: dragIdx === idx ? 0.6 : 1,
                transition: 'background 0.12s ease, border-color 0.12s ease'
              }}
            >
              <span
                draggable
                onDragStart={() => { setDragIdx(idx); setMsg(''); }}
                onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                title="끌어서 순서 변경"
                style={{ cursor: 'grab', color: '#94a3b8', fontSize: '1.05rem', padding: '0 0.15rem', flexShrink: 0, userSelect: 'none' }}
              >
                ⠿
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', width: '26px', flexShrink: 0 }}>{idx + 1}</span>

              {editingId === brand.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(brand); }}
                    autoFocus
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.95rem', borderRadius: '6px', border: '2px solid #0b69c7' }}
                  />
                  <button onClick={() => handleSaveEdit(brand)} disabled={busy} style={btnStyle('#15803d', '#f0fdf4', '#86efac')}>저장</button>
                  <button onClick={() => setEditingId(null)} style={btnStyle('#64748b', '#ffffff', '#cbd5e1')}>취소</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }}>{brand.name}</span>
                  <button onClick={() => handleMove(idx, -1)} disabled={busy || idx === 0} style={{ ...btnStyle('#0b69c7', '#f0f9ff', '#bae6fd'), opacity: idx === 0 ? 0.35 : 1 }} title="위로">▲</button>
                  <button onClick={() => handleMove(idx, 1)} disabled={busy || idx === brands.length - 1} style={{ ...btnStyle('#0b69c7', '#f0f9ff', '#bae6fd'), opacity: idx === brands.length - 1 ? 0.35 : 1 }} title="아래로">▼</button>
                  <button onClick={() => { setEditingId(brand.id); setEditingName(brand.name); setMsg(''); }} style={btnStyle('#0b69c7', '#f0f9ff', '#bae6fd')}>
                    <Pencil size={13} /> 수정
                  </button>
                  <button onClick={() => handleDelete(brand)} disabled={busy} style={btnStyle('#d32f2f', '#fef2f2', '#fca5a5')}>
                    <Trash2 size={13} /> 삭제
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmailSettings() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentEmail(data?.user?.email || ''));
  }, []);

  const handleChangeEmail = async () => {
    setMsg('');
    const email = newEmail.trim();
    if (!email.includes('@')) { setMsg('❌ 올바른 이메일 주소를 입력해주세요.'); return; }
    if (email === currentEmail) { setMsg('❌ 현재 사용 중인 이메일과 동일합니다.'); return; }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ email });
    setSaving(false);
    if (error) { setMsg('❌ 변경 실패: ' + error.message); return; }
    setNewEmail('');
    setMsg('✅ 변경 요청이 접수되었습니다. "' + email + '" 메일함에서 확인 메일의 링크를 눌러야 최종 적용됩니다.');
  };

  return (
    <div style={{ border: '2px solid #0b69c7', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#f8fafc', maxWidth: '420px' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b69c7', marginBottom: '1rem' }}>로그인 이메일 변경</h3>

      <div style={{ marginBottom: '1.1rem', padding: '0.7rem 0.9rem', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', marginBottom: '0.2rem' }}>현재 로그인 이메일</div>
        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a' }}>{currentEmail || '확인 중...'}</div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>새 이메일</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="예: hb4115@hanmail.net"
          style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
      </div>

      <button onClick={handleChangeEmail} disabled={saving} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: '900', justifyContent: 'center' }}>
        {saving ? '변경 중...' : '이메일 변경하기'}
      </button>

      <p style={{ marginTop: '0.9rem', fontSize: '0.82rem', color: '#64748b', lineHeight: '1.6' }}>
        ※ 변경 버튼을 누르면 새 이메일 주소로 확인 메일이 갑니다. 그 메일의 링크를 눌러야 변경이 완료되며, 그 전까지는 기존 이메일로 로그인하시면 됩니다.
      </p>

      {msg && (
        <div style={{ marginTop: '1rem', fontSize: '0.92rem', fontWeight: '800', lineHeight: '1.6', color: msg.startsWith('✅') ? '#15803d' : '#d32f2f' }}>
          {msg}
        </div>
      )}
    </div>
  );
}

const FREE_LIMIT_BYTES = 1024 * 1024 * 1024; // Supabase 무료 플랜 저장공간 1GB

function StorageUsage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const loadFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from('product-images').list('', {
      limit: 1000,
      sortBy: { column: 'created_at', order: 'asc' }, // 오래된 파일이 위로
    });
    if (error) {
      setMsg('❌ 파일 목록 조회 실패: ' + error.message);
      setLoading(false);
      return;
    }
    setFiles((data || []).filter(f => f.metadata));
    setLoading(false);
  };

  useEffect(() => { loadFiles(); }, []);

  const usedBytes = files.reduce((sum, f) => sum + (f.metadata?.size || 0), 0);
  const usedMB = usedBytes / 1024 / 1024;
  const percent = Math.min(100, (usedBytes / FREE_LIMIT_BYTES) * 100);

  // 사용량에 따른 색상 (여유=초록, 주의=주황, 위험=빨강)
  const color = percent >= 85 ? '#d32f2f' : percent >= 60 ? '#f59e0b' : '#10b981';
  const statusText = percent >= 85 ? '공간이 거의 찼습니다. 오래된 파일을 지워주세요.'
    : percent >= 60 ? '절반 이상 사용했습니다. 관리가 필요합니다.'
    : '여유가 충분합니다.';

  // 도넛 차트 계산
  const R = 70, STROKE = 22, C = 2 * Math.PI * R;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ border: '2px solid #0b69c7', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#f8fafc' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b69c7', marginBottom: '1.25rem' }}>저장공간 사용량</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
          <svg width="180" height="180" viewBox="0 0 180 180" style={{ flexShrink: 0 }}>
            <circle cx="90" cy="90" r={R} fill="none" stroke="#e2e8f0" strokeWidth={STROKE} />
            <circle
              cx="90" cy="90" r={R} fill="none" stroke={color} strokeWidth={STROKE}
              strokeDasharray={`${(percent / 100) * C} ${C}`}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
            <text x="90" y="84" textAnchor="middle" fontSize="30" fontWeight="900" fill={color}>
              {percent.toFixed(1)}%
            </text>
            <text x="90" y="107" textAnchor="middle" fontSize="13" fontWeight="700" fill="#64748b">
              사용 중
            </text>
          </svg>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a' }}>
              {usedMB.toFixed(1)} <span style={{ fontSize: '1rem', color: '#64748b' }}>MB / 1,024 MB</span>
            </div>
            <div style={{ marginTop: '0.4rem', fontSize: '0.9rem', fontWeight: '700', color }}>
              {statusText}
            </div>
            <div style={{ marginTop: '0.9rem', fontSize: '0.88rem', color: '#334155', lineHeight: '1.7' }}>
              파일 개수: <strong>{files.length}개</strong><br />
              남은 공간: <strong>{((FREE_LIMIT_BYTES - usedBytes) / 1024 / 1024).toFixed(1)} MB</strong>
            </div>
            <button onClick={loadFiles} disabled={loading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: '700', color: '#0b69c7', border: '1px solid #bae6fd', borderRadius: '6px', backgroundColor: '#f0f9ff', cursor: 'pointer' }}>
              새로고침
            </button>
          </div>
        </div>

        {msg && (
          <div style={{ marginTop: '1rem', fontSize: '0.92rem', fontWeight: '800', color: msg.startsWith('✅') ? '#15803d' : '#d32f2f' }}>
            {msg}
          </div>
        )}
      </div>

      <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.7', margin: 0 }}>
        현재 저장된 데이터량입니다. 공간이 부족하면 각 게시판(또는 상품 정보 수정)에서 필요 없는 글·상품을 지워주세요.
      </p>
    </div>
  );
}

function PasswordSettings() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = async () => {
    setMsg('');
    if (newPassword.length < 6) { setMsg('❌ 비밀번호는 6자 이상이어야 합니다.'); return; }
    if (newPassword !== confirmPassword) { setMsg('❌ 새 비밀번호가 서로 일치하지 않습니다.'); return; }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);
    if (error) { setMsg('❌ 변경 실패: ' + error.message); return; }
    setNewPassword('');
    setConfirmPassword('');
    setMsg('✅ 비밀번호가 변경되었습니다. 다음 로그인부터 새 비밀번호를 사용하세요.');
  };

  return (
    <div style={{ border: '2px solid #0b69c7', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#f8fafc', maxWidth: '420px' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0b69c7', marginBottom: '1.25rem' }}>비밀번호 변경</h3>

      <div style={{ marginBottom: '1.1rem' }}>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>새 비밀번호</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>새 비밀번호 확인</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '0.7rem', fontSize: '0.95rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
      </div>

      <button onClick={handleChange} disabled={saving} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: '900', justifyContent: 'center' }}>
        {saving ? '변경 중...' : '비밀번호 변경하기'}
      </button>

      {msg && (
        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: '800', color: msg.startsWith('✅') ? '#15803d' : '#d32f2f' }}>
          {msg}
        </div>
      )}
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
        <button
          onClick={() => setActiveTab('brand')}
          style={{
            padding: '0.7rem 1.2rem', fontSize: '0.95rem', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer',
            color: activeTab === 'brand' ? '#0b69c7' : '#94a3b8',
            borderBottom: activeTab === 'brand' ? '3px solid #0b69c7' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          브랜드 메뉴 관리
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          style={{
            padding: '0.7rem 1.2rem', fontSize: '0.95rem', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer',
            color: activeTab === 'storage' ? '#0b69c7' : '#94a3b8',
            borderBottom: activeTab === 'storage' ? '3px solid #0b69c7' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          저장공간
        </button>
        <button
          onClick={() => setActiveTab('account')}
          style={{
            padding: '0.7rem 1.2rem', fontSize: '0.95rem', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer',
            color: activeTab === 'account' ? '#0b69c7' : '#94a3b8',
            borderBottom: activeTab === 'account' ? '3px solid #0b69c7' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          계정 설정
        </button>
      </div>

      {activeTab === 'product' ? <ProductEditor />
        : activeTab === 'post' ? <PostEditor />
        : activeTab === 'brand' ? <BrandEditor />
        : activeTab === 'storage' ? <StorageUsage />
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <EmailSettings />
            <PasswordSettings />
          </div>
        )}
    </div>
  );
}
