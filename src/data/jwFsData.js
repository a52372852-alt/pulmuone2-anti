export const COMPANY_INFO = {
  name: "(주)장원",
  slogan: "학교급식 위생·안전 식자재 전문 대표기업",
  ceo: "장원식",
  established: "2008년 3월 15일",
  address: "서울특별시 성동구 아차산로 111 장량빌딩 4~6층",
  tel: "02-468-8000",
  fax: "02-468-8001",
  email: "contact@jw-fs.kr",
  haccpNo: "제 2018-0415호 (식품의약품안전처)",
  history: [
    { year: "2025", title: "전국 1,200개 초·중·고등학교 급식 납품 달성 및 콜드체인 물류센터 확장" },
    { year: "2023", title: "식품안전의 날 표창 수상 (식품의약품안전처장)" },
    { year: "2021", title: "친환경 농산물 및 무항생제 축산물 공급 인증 획득" },
    { year: "2018", title: "HACCP(위생안전관리) 우수사업장 지정" },
    { year: "2012", title: "(주)장원 법인 전환 및 대형 물류 가공센터 준공" },
    { year: "2008", title: "장원푸드 설립" }
  ]
};

export const BUSINESS_AREAS = [
  {
    id: "school",
    title: "학교급식 (School Meals)",
    subtitle: "전국 초·중·고등학교 맞춤 친환경 식자재 유통",
    description: "당일 수확 친환경 농산물과 1등급 무항생제 축산물을 새벽 3℃ 콜드체인 시스템으로 정시 배송합니다.",
    icon: "🏫",
    stats: "1,200+ 학교 납품",
    color: "#10b981",
    features: [
      "교육부 & 나이스(NEIS) 연동 식단 표준 규격 준수",
      "전 품목 당일 검수 및 방사능/잔류농약 정밀 검사",
      "소포장 및 소분 가공 서비스 제공"
    ]
  },
  {
    id: "kindergarten",
    title: "영유아급식 (Early Childhood)",
    subtitle: "유치원 및 어린이집 맞춤 영양 안심 급식",
    description: "영유아 발달 단계에 맞춘 웰빙 식자재와 소화하기 쉬운 저염·무첨가 식재료를 공급합니다.",
    icon: "🧸",
    stats: "450+ 유치원 이용",
    color: "#f59e0b",
    features: [
      "무첨가 원료 및 아토피 예방 친환경 식자재",
      "세척 및 껍질 제거 소분 야채 공급",
      "영유아 전용 규격 포장 시스템"
    ]
  },
  {
    id: "welfare",
    title: "복지급식 (Welfare & Senior)",
    subtitle: "노인복지관, 장애인복지시설 영양맞춤 케어",
    description: "저작 및 연하 능력을 고려한 저염 건강식과 맞춤 영양 밸런스 식자재를 안정적으로 전달합니다.",
    icon: "🤝",
    stats: "180+ 복지기관 연계",
    color: "#6366f1",
    features: [
      "연하 곤란 케어 소프트 푸드 및 고칼슘 식재료",
      "저염·저당 건강 케어 가공식품",
      "정기 배송 및 1:1 맞춤 주문"
    ]
  },
  {
    id: "corporate",
    title: "기업 & 공공기관 (Corporate)",
    subtitle: "대형 구내식당 및 관공서 대량 급식 식자재",
    description: "합리적인 단가와 최고 품질의 식자재 공급으로 기업 구내식당의 만족도를 극대화합니다.",
    icon: "🏢",
    stats: "95개 기업체 공급",
    color: "#06b6d4",
    features: [
      "대량 구매를 통한 원가 절감 및 유통 단가 경쟁력",
      "다양한 신메뉴 개발용 프리미엄 가공품 지원",
      "전담 물류 마스터 배정"
    ]
  }
];

export const HYGIENE_SYSTEMS = [
  {
    step: "01",
    title: "입고 및 야간 온도 검수",
    desc: "새벽 입고 차량 내부 온도 3℃ 이하 유지 검수 및 1차 외관 검사",
    icon: "🚚"
  },
  {
    step: "02",
    title: "방사능 & 잔류농약 간이 검사",
    desc: "당일 입고 농산물 및 수산물 자체 정밀 분석 장비로 100% 전수 테스트",
    icon: "🔬"
  },
  {
    step: "03",
    title: "콜드체인 보관 & 오존 살균",
    desc: "냉장/냉동 보관 창고 오존 살균기 24시간 가동 및 자동 온도 알람",
    icon: "❄️"
  },
  {
    step: "04",
    title: "자체 위생 가공 & 콜드 패킹",
    desc: "HACCP 전용 피킹장에서 위생복 착용 조리사의 부위별 세척 및 소분",
    icon: "🥩"
  },
  {
    step: "05",
    title: "GPS 탑차 당일 아침 정시 배송",
    desc: "학교 급식실 조리 시작 시각에 맞춰 100% 정시 안전 배송 완료",
    icon: "⏱️"
  }
];

export const PRODUCT_CATALOG = [
  { id: 1, category: "농산물", name: "친환경 무농약 친환경 쌀", origin: "국내산 (전남 해남)", spec: "20kg/포", badge: "GAP 인증" },
  { id: 2, category: "농산물", name: "신선 친환경 파프리카 (적/황)", origin: "국내산 (강원 평창)", spec: "5kg/박스", badge: "친환경" },
  { id: 3, category: "축산물", name: "1등급 무항생제 돼지 목심", origin: "국내산 (제주도)", spec: "10kg/냉장", badge: "무항생제" },
  { id: 4, category: "축산물", name: "1++등급 한우 설도 (불고기용)", origin: "국내산 (강원 횡성)", spec: "5kg/냉장", badge: "1++등급" },
  { id: 5, category: "수산물", name: "동해안 선상 냉동 자른 오징어", origin: "국내산 (강원 속초)", spec: "3kg/팩", badge: "HACCP" },
  { id: 6, category: "수산물", name: "국산 순살 고등어 필렛", origin: "국내산 (부산)", spec: "5kg/박스", badge: "가시제거" },
  { id: 7, category: "가공식품", name: "유기농 무첨가 국산 콩 두부", origin: "국내산 콩 100%", spec: "1kg/팩", badge: "Non-GMO" },
  { id: 8, category: "가공식품", name: "수제 사골육수 & 갈비탕 베이스", origin: "국내산 한우 100%", spec: "2kg/팩", badge: "자체제조" }
];

export const NOTICES = [
  { id: 1, title: "[공지] 2026년 2학기 학교급식 식재료 단가표 및 공급 안내", date: "2026-08-10", views: 420 },
  { id: 2, title: "[위생안전] 여름철 식중독 예방을 위한 콜드체인 수송 강화 지침", date: "2026-08-05", views: 680 },
  { id: 3, title: "[품질검사] 8월 1주차 입고 농산물 잔류농약 정밀 검사 적합 판정서", date: "2026-08-01", views: 310 },
  { id: 4, title: "[수상] (주)장원, 2026 대한민국 교육급식 대상 수상 안내", date: "2026-07-20", views: 890 }
];
