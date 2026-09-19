# AGENTS.md — 주식회사 서진 홈페이지

이 저장소는 **주식회사 서진**(학교급식 식자재유통, 충남 홍성 내포물류센터)의 공식 홈페이지입니다.
완성 후 **클라이언트에게 인계**할 예정이며, 클라이언트는 컴퓨터에 익숙하지 않습니다.

> 폴더명·package.json name이 `pulmuone2-anti` / `school-geupsik-app`으로 되어 있지만,
> 이는 초기 템플릿의 잔재입니다. 현재 프로젝트와 무관하니 혼동하지 마세요.

---

## 1. 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | React 18 + Vite 5 (JavaScript, TypeScript 아님) |
| 상태관리 | React Context 단일 (`src/context/AppContext.jsx`) — Redux 등 없음 |
| 라우팅 | **라우터 라이브러리 없음.** `currentPage` 문자열 + `switch` (`src/App.jsx`) |
| 백엔드 | Supabase (Postgres + Auth + Storage) |
| 아이콘 | `lucide-react` |
| 스타일 | `src/index.css` + 인라인 style 객체 (Tailwind/CSS-in-JS 없음) |
| 배포 | GitHub Pages (`gh-pages` 브랜치) + 커스텀 도메인 |

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # -> dist/
```

테스트·린터·타입체크 설정이 **없습니다**. 검증은 `npm run build` 성공 + 브라우저 육안 확인으로 합니다.

---

## 2. ⚠️ 반드시 지켜야 할 제약

### 2-1. 반응형 금지 — 모바일도 PC 레이아웃 그대로

클라이언트 요구사항입니다. 참고 사이트(jw-fs.kr)처럼 **모바일에서 PC 화면을 손가락으로 확대해서 보는** 방식입니다.

- `index.html`의 viewport: `width=1140, minimum-scale=0.25, maximum-scale=5.0, user-scalable=yes`
- `src/index.css`에서 **모든 `@media` 블록을 의도적으로 제거**했습니다.

**새 `@media` 쿼리를 추가하거나 viewport를 고치지 마세요.** 반응형처럼 보이는 것은 버그가 아니라 사양입니다.

### 2-2. 클라이언트는 컴맹 — 관리자 UI는 극도로 쉽게

관리자 페이지(`src/pages/Admin.jsx`)를 수정할 때:
- 전문용어 금지 (예: "업로드 실패: 403" ❌ → "사진 저장에 실패했어요. 다시 시도해주세요." ⭕)
- 모든 성공/실패 메시지는 한국어 + 이모지(✅/❌)로 명확하게
- 삭제 등 되돌릴 수 없는 동작은 반드시 `window.confirm`
- 필드 순서·라벨을 임의로 바꾸지 말 것 (클라이언트가 이미 익숙해진 화면)

### 2-3. Supabase RLS 정책을 건드리지 말 것

익명 키(publishable)가 `src/lib/supabaseClient.js`에 하드코딩되어 있습니다. **이는 공개되어도 되는 키이며**, 실제 보안은 Postgres RLS 정책이 담당합니다. 정책·GRANT를 임의로 변경하면 사이트 전체가 401로 죽습니다.

과거에 겪은 문제: 프로젝트 생성 시 "Automatically expose new tables"가 꺼져 있어서
`grant usage on schema public` + 테이블/시퀀스 GRANT를 수동으로 부여해야 했습니다. 새 테이블 추가 시 동일한 GRANT가 필요합니다.

---

## 3. Supabase 구조

프로젝트: `wfxhvvyailsparnvvncz` (URL: `https://wfxhvvyailsparnvvncz.supabase.co`)

### 테이블

**`products`** — 제품소개 상품
| 컬럼 | 비고 |
|---|---|
| `id` | PK |
| `brand_id` | → `brands.id` |
| `name` | 제품명 |
| `sale_price` / `original_price` | 단가 / 정상가 (문자열, 예: `"26,140"`) |
| `spec` | 제품규격 |
| `main_ingredient` | 주원료 |
| `storage` | 보관방법 |
| `shelf_life` | 유통기한 |
| `is_event` | 행사 상품 여부 |
| `notice_memo` | 조리사 안내 메모 (상세페이지 📌 박스) |
| `img` | Storage 공개 URL |
| `updated_at` | **랜딩페이지 정렬 기준 (최신순)** |

> DB는 `snake_case`, React는 `camelCase`. 변환은 `AppContext.jsx`의 `refreshProducts()`에서 일괄 처리합니다. 새 컬럼 추가 시 여기 매핑도 같이 추가하세요.

**`brands`** — 제품소개 사이드바 브랜드 (35개, 실제 거래처)
`id` (`brand-<timestamp>`), `name`, `sort_order`
관리자가 추가/수정/삭제 + ▲▼ 버튼 + 드래그로 순서 변경합니다.

**`board_posts`** — 3개 게시판 공용
`id`, `category`, `title`, `body`, `images` (URL 배열), `attachment_url`, `attachment_name`, `drive_url`, `created_at`

`category` 값은 **정확히 이 3개**:
| `category` | 화면 명칭 | 라우트 |
|---|---|---|
| `promotion` | 서진 행사지 | `promotions` |
| `recipe` | 서진 레시피 | `recipes` (→ `WeeklyMenu.jsx`) |
| `notice` | 공지사항 | `customer` |

세 게시판 모두 `src/pages/BoardPage.jsx` 하나를 props로 재사용합니다.

### Storage

버킷 **`product-images`** (public) — 상품 이미지, 게시판 이미지, PPTX 첨부 모두 여기에 저장됩니다.

무료 한도 1GB. 관리자 페이지 "저장공간" 탭에 도넛 차트로 사용량을 표시합니다 (60%/85%에서 주황→빨강).

### Auth

이메일/비밀번호 로그인. 운영 계정은 `hb4115@hanmail.net`.
비밀번호 재설정은 로그인 화면의 "비밀번호를 잊으셨나요?" 버튼 (`resetPasswordForEmail`).

---

## 4. 용량 정책 (중요)

클라이언트는 매달 **200~300MB짜리 행사지 PPTX**를 올립니다. Supabase 무료 한도(저장 1GB / 전송 5GB)로는 감당할 수 없습니다.

**결론: 큰 PPTX는 구글 드라이브에 올리고, 게시판에는 링크만 붙입니다.**
→ `board_posts.drive_url` 컬럼 + `BoardPage.jsx`의 초록색 "구글 드라이브에서 보기" 버튼이 이를 위한 것입니다.

참고로 구글 드라이브는 **100MB를 넘으면 브라우저 미리보기가 안 됩니다** (다운로드만 가능). PPT 압축으로 145MB → 45MB까지 줄인 전례가 있습니다.

이 구조를 "첨부파일 직접 업로드로 단순화"하자고 제안하지 마세요. 이미 검토해서 기각된 방향입니다.

---

## 5. 배포 — 수동, 2단계

CI/CD가 없습니다. `main`에 푸시해도 사이트는 바뀌지 않습니다.

```bash
# 1) 소스 커밋
git add -A && git commit -m "..." && git push origin main

# 2) 빌드 후 gh-pages 브랜치에 dist/ 내용을 올림
npm run build
```

`gh-pages` 브랜치는 **빌드 결과물만** 담깁니다 (`dist/`의 내용이 루트에 위치). git worktree를 쓰면 편합니다:

```bash
git worktree add ../ghp gh-pages
rsync -a --delete --exclude .git dist/ ../ghp/
cd ../ghp && git add -A && git commit -m "deploy" && git push origin gh-pages
```

### 배포 시 주의

- **`public/CNAME`이 반드시 `dist/`에 포함되어야 합니다** (내용: `www.xn--2i4bi2n.com`). 빠지면 커스텀 도메인이 풀립니다.
- `vite.config.js`의 `base`는 `'/'`입니다. 커스텀 도메인용이므로 `/pulmuone2-anti/`로 되돌리지 마세요.
- GitHub가 도메인 재설정 시 CNAME 커밋을 자체적으로 추가하는 경우가 있어, gh-pages 푸시가 non-fast-forward로 거부될 수 있습니다. 이때는 `git fetch && git reset --hard origin/gh-pages` 후 dist를 다시 복사하세요.

### 도메인

**서진.com** = 퓨니코드 `xn--2i4bi2n.com` (호스팅케이알에서 구매)
www / non-www 둘 다 연결, HTTPS 강제(Let's Encrypt) 적용됨.

---

## 6. 페이지 구조

`src/App.jsx`의 `currentPage` 문자열로 전환합니다. `setCurrentPage('...')`를 호출하면 이동합니다.

| `currentPage` | 컴포넌트 | 네비게이션 메뉴 |
|---|---|---|
| `home` | `Home.jsx` | 홈 |
| `company` | `Company.jsx` | 회사소개 |
| `products` | `ProductCatalog.jsx` | 제품소개 |
| `promotions` | `BoardPage` (promotion) | 서진 행사지 |
| `recipes` | `WeeklyMenu.jsx` → `BoardPage` (recipe) | 서진 레시피 |
| `customer` | `CustomerCenter.jsx` | 고객센터 (공지사항 + 자유게시판) |
| `admin` | `Admin.jsx` | 🔒 관리자 |

`business`, `hygiene`, `search`, `community`, `nutrition`, `kitchen`은 초기 템플릿 잔재로, 현재 네비게이션에 노출되지 않습니다.

### 랜딩페이지(`Home.jsx`) 구성 순서 — 변경 금지

1. 히어로 (`public/home-building-front.png`, 우측 하단에 로고 박스, 네비바에 붙어있음)
2. 네비게이션 바
3. 3단 미리보기: **서진 행사지 → 추천레시피 → 공지사항** (이 순서가 클라이언트 지정 사항)
4. 제품소개 게시판 (`<ProductCatalog defaultBrandId="all" />`, 최신 등록순)

### 서브페이지 헤더

`src/components/SubpageHeader.jsx`의 `PAGE_HEADER_CONFIG`에서 페이지별 배경이미지/제목/설명을 관리합니다.

**`public/` 안의 이미지 파일명은 반드시 영문**으로 하세요. 한글 파일명(`관리자상단.png`)을 썼다가 빌드 후 이미지가 조용히 404 나는 문제를 겪었습니다. → `admin-hero.png`로 변경해 해결.

---

## 7. 자잘하지만 재발하기 쉬운 함정

- **샘플 데이터의 타임스탬프에 `new Date()`를 쓰지 말 것.** 매 렌더마다 재계산돼서 "24시간 지나면 사라지는 NEW 배지"가 영원히 사라지지 않습니다. `CustomerCenter.jsx`는 고정 문자열 타임스탬프를 씁니다.
- 회사 연혁은 **`2003.12 주식회사 서진 설립` 한 줄만** 존재합니다 (`src/data/jwFsData.js`). 임의로 연혁을 채우지 마세요.
- 영문 표기는 **SEOJIN** (SEAJIN 아님). `public/seajin-*.png`는 구버전 로고이며 현재 로고는 `ro-01.png`입니다.
- 대표 이메일: `hb4115@hanmail.net`
- `src/data/jwFsOriginalData.js`, `mockData.js`는 초기 템플릿 데이터입니다. 실제 회사 정보는 `jwFsData.js`에 있습니다.

---

## 8. 참고 사이트에 대한 주의

초기에 **jw-fs.kr((주)장원)** 을 레퍼런스로 삼았으나, 클라이언트가 "너무 똑같다"고 지적해 제품소개 사이드바 UI를 독자적으로 재디자인했습니다(그라데이션 헤더 + 알약형 카드 + 초록 점). **장원 사이트를 그대로 베끼는 방향으로 되돌리지 마세요.**
