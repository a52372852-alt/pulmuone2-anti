export const BRANDS = [
  { id: 'pulmuone', name: '풀무원[풀스키친]', active: true },
  { id: 'slowmade', name: '더 슬로우메이드' },
  { id: 'choroc', name: '초록푸드' },
  { id: 'geupsik', name: '급식대장' },
  { id: 'aram', name: '아람농장' },
  { id: 'cheonho', name: '천호엔케어' },
  { id: 'lnc', name: '(주)엘엔씨' },
  { id: 'sempyo', name: '샘표식품' },
  { id: 'haagen', name: '하겐다즈', hasArrow: true },
  { id: 'ewsoo', name: '이우수' },
  { id: 'oljang', name: '올장' },
  { id: 'ourmeal', name: '아워밀[위즈쉐프]' },
  { id: 'damyang', name: '담양올밀크 [또요]' },
  { id: 'ahamandu', name: '아하만두[아하타임]' },
  { id: 'matjarak', name: '맛자락[맑은해오름]' },
  { id: 'yonggung', name: '용궁식품' },
  { id: 'meatbelly', name: '미트벨리' },
  { id: 'yammy', name: '야미푸드' },
  { id: 'familylove', name: '가족사랑[산과들]' },
  { id: 'chamfre', name: '참프레' },
  { id: 'harim', name: '하림' },
  { id: 'yedam', name: '(유)예담' },
  { id: 'jinju', name: '진주햄' },
  { id: 'jisan', name: '지산푸드' },
  { id: 'poonglim', name: '풍림푸드' },
  { id: 'haemaru', name: '해마루' },
  { id: 'dongwon', name: '동원F&B' },
  { id: 'lotte', name: '롯데웰푸드' },
  { id: 'sandul', name: '산들강-오리류' },
  { id: 'badawon', name: '바다원-건어물' },
  { id: 'idles', name: '아이들' },
  { id: 'kumho', name: '금호식품' },
  { id: 'cheongatti', name: '청아띠' },
  { id: 'miso', name: '미소참순대' },
  { id: 'daewang', name: '대왕' },
  { id: 'hasong', name: '하송/서안이가/사조' },
];

export const PROMOTION_PRODUCTS = [
  {
    id: 1,
    brandId: 'pulmuone',
    category: '풀무원[풀스키친] - 경두부류',
    name: '국산콩 리얼탱탱 찌개전용두부',
    spec: '3kg',
    originalPrice: '30,750',
    salePrice: '26,140',
    term: '(26년 1~2학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 2,
    brandId: 'pulmuone',
    category: '풀무원[풀스키친] - 경두부류',
    name: '국산콩 리얼탱탱 슬라이스두부(마파용)',
    spec: '3kg(10g*300ea)',
    originalPrice: '35,520',
    salePrice: '30,190',
    term: '(26년 1~2학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=80'
  },
  {
    id: 3,
    brandId: 'pulmuone',
    category: '풀무원[풀스키친] - 경두부류',
    name: '국산콩 리얼탱탱 슬라이스두부(부침용)',
    spec: '3kg(30g*102ea)',
    originalPrice: '33,120',
    salePrice: '28,150',
    term: '(26년 1~2학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 4,
    brandId: 'pulmuone',
    category: '풀무원[풀스키친] - 경두부류',
    name: '풀무원 국산콩 전통부침두부',
    spec: '3kg',
    originalPrice: '31,410',
    salePrice: '26,700',
    term: '(26년 1~2학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=80'
  },
  {
    id: 5,
    brandId: 'pulmuone',
    category: '풀무원[풀스키친]',
    name: '풀무원 국산콩 검은콩 두부',
    spec: '3kg',
    originalPrice: '36,880',
    salePrice: '31,350',
    term: '(26년 1~2학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 6,
    brandId: 'pulmuone',
    category: '풀무원[풀스키친]',
    name: '스틱피쉬커틀렛(네모)',
    spec: '600g(40g*15ea)',
    originalPrice: '14,060',
    salePrice: '9,840',
    term: '(26년 1학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80'
  },
  {
    id: 7,
    brandId: 'pulmuone',
    category: '풀무원[풀스키친]',
    name: '두부담은 돈가스',
    spec: '1kg(20g*50ea)',
    originalPrice: '18,500',
    salePrice: '14,200',
    term: '(26년 1~2학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 8,
    brandId: 'harim',
    category: '하림 - 닭고기류',
    name: '무항생제 신선 닭북채(닭다리)',
    spec: '1kg',
    originalPrice: '12,500',
    salePrice: '9,800',
    term: '(26년 1학기)',
    isEvent: true,
    img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80'
  }
];

export const MAIN_NOTICES = [
  "9월 하림 안내창2",
  "9월 아하만두 안내창2 / 하림 안내창1",
  "9월 아워밀 안내창3 / 용궁 / 하겐다즈 / 아하만두 안내...",
  "9월 아워밀 안내창2"
];

export const RECOMMENDED_RECIPES = [
  { id: 1, title: "풀무원 두부 스틱 핑거 샐러드", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80" },
  { id: 2, title: "검은콩 두부 소고기 전골 레시피", image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=300&q=80" }
];
