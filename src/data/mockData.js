export const SAMPLE_SCHOOLS = [
  { id: "SCH-001", name: "서울한국고등학교", region: "서울특별시 강남구", type: "고등학교", students: 1150, rating: 4.8 },
  { id: "SCH-002", name: "정원주문초등학교", region: "경기도 수원시 팔달구", type: "초등학교", students: 780, rating: 4.9 },
  { id: "SCH-003", name: "빛가람중학교", region: "전라남도 나주시", type: "중학교", students: 640, rating: 4.7 },
  { id: "SCH-004", name: "부산해운대고등학교", region: "부산광역시 해운대구", type: "고등학교", students: 920, rating: 4.6 },
  { id: "SCH-005", name: "대구세동초등학교", region: "대구광역시 수성구", type: "초등학교", students: 510, rating: 4.9 },
];

export const TODAY_MEALS = {
  breakfast: {
    title: "조식",
    time: "07:30 - 08:30",
    calories: 620,
    rating: 4.7,
    items: [
      { name: "발아현미밥", allergies: [] },
      { name: "소고기무국", allergies: [5, 6, 16] },
      { name: "수제돈가스 & 브라운소스", allergies: [1, 2, 5, 6, 10, 12] },
      { name: "배추김치", allergies: [9, 13] },
      { name: "샤인머스캣 쥬스", allergies: [13] }
    ],
    nutrition: { carbs: 85, protein: 32, fat: 18, sodium: 620 }
  },
  lunch: {
    title: "중식 (오늘의 추천 특식)",
    time: "12:10 - 13:20",
    calories: 785,
    rating: 4.95,
    isSpecial: true,
    specialTag: "🎉 이달의 특식 - 수제 마라샹궈 & 멘보샤",
    items: [
      { name: "뿌링클 닭다리구이", allergies: [1, 2, 5, 6, 15] },
      { name: "수제 멘보샤 & 칠리소스", allergies: [1, 5, 6, 9, 12] },
      { name: "얼큰 차돌짬뽕국", allergies: [5, 6, 9, 10, 16, 17] },
      { name: "마늘종 볶음밥", allergies: [5, 6, 10] },
      { name: "수제 석류푸딩 & 젤리", allergies: [2] },
      { name: "유기농 깍두기", allergies: [9, 13] }
    ],
    nutrition: { carbs: 98, protein: 42, fat: 24, sodium: 790 }
  },
  dinner: {
    title: "석식",
    time: "18:00 - 19:00",
    calories: 690,
    rating: 4.8,
    items: [
      { name: "치즈불닭덮밥", allergies: [2, 5, 6, 15] },
      { name: "맑은 콩나물국", allergies: [5] },
      { name: "바삭 군만두 (3개)", allergies: [5, 6, 10] },
      { name: "단무지 무침", allergies: [13] },
      { name: "아이스초코 우유", allergies: [2] }
    ],
    nutrition: { carbs: 88, protein: 35, fat: 20, sodium: 680 }
  }
};

export const WEEKLY_SCHEDULE = [
  {
    day: "월요일",
    date: "2026-08-10",
    lunch: {
      menu: ["기장밥", "한우 갈비탕", "오징어 볶음", "계란말이", "포기김치", "수박"],
      calories: 740,
      allergies: [1, 5, 6, 16, 17]
    }
  },
  {
    day: "화요일",
    date: "2026-08-11",
    lunch: {
      menu: ["김치볶음밥 & 수제후라이", "해물 짬뽕국", "왕새우튀김", "깍두기", "망고 스무디"],
      calories: 790,
      allergies: [1, 5, 6, 9, 10, 17]
    }
  },
  {
    day: "수요일 (세계 음식의 날)",
    date: "2026-08-12",
    isSpecial: true,
    lunch: {
      menu: ["투움바 파스타", "수제 찹스테이크", "시저 샐러드", "마늘 바게트", "생과일 에이드"],
      calories: 820,
      allergies: [1, 2, 5, 6, 12, 16]
    }
  },
  {
    day: "목요일 (오늘)",
    date: "2026-08-13",
    isToday: true,
    lunch: {
      menu: ["뿌링클 닭다리구이", "수제 멘보샤", "얼큰 차돌짬뽕국", "마늘종 볶음밥", "석류푸딩"],
      calories: 785,
      allergies: [1, 2, 5, 6, 9, 15, 16, 17]
    }
  },
  {
    day: "금요일",
    date: "2026-08-14",
    lunch: {
      menu: ["차조밥", "돼지등뼈 감자탕", "동그랑땡 전", "도토리묵 무침", "갓김치", "아쿠아젤리"],
      calories: 760,
      allergies: [1, 5, 6, 10]
    }
  }
];

export const SPECIAL_MEAL_VOTES = [
  { id: 1, title: "치즈 폭탄 수제버거 & 감자튀김", votes: 342, tag: "인기 No.1", icon: "🍔" },
  { id: 2, title: "일식 마제소바 & 바삭 치킨가라아게", votes: 289, tag: "트렌디 특식", icon: "🍜" },
  { id: 3, title: "직화 돼지갈비 덮밥 & 수제 식혜", votes: 215, tag: "한식 영양특식", icon: "🍱" },
  { id: 4, title: "투움바 로제 떡볶이 & 모듬튀김", votes: 198, tag: "분식 데이", icon: "🍢" },
];

export const STUDENT_REVIEWS = [
  { id: 1, author: "김*진 (3학년 2반)", school: "서울한국고", mealType: "중식", rating: 5, content: "오늘 뿌링클 닭다리 진짜 대박이었어요!! 멘보샤 바삭하고 칠리소스 환상조합 ㅠㅠ", date: "오늘 13:05", likes: 24, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80" },
  { id: 2, author: "박*우 (1학년 5반)", school: "서울한국고", mealType: "중식", rating: 5, content: "차돌짬뽕국 고기도 푸짐하고 얼큰해서 다 비웠어요. 다음에도 멘보샤 꼭 해주세요!", date: "오늘 13:12", likes: 18, image: null },
  { id: 3, author: "이*서 (2학년 1반)", school: "서울한국고", mealType: "조식", rating: 4.5, content: "아침 수제돈가스 따뜻하고 바삭해서 힘차게 하루 시작했어요 ㅎㅎ", date: "오늘 08:20", likes: 11, image: null }
];

export const INGREDIENT_ORIGINS = [
  { name: "쌀 (현미, 기장 포함)", origin: "국내산 (전남 해남)", status: "100% 무농약 유기농" },
  { name: "돼지고기 (돈가스, 탕수육, 제육)", origin: "국내산 (제주 무항생제 돼지)", status: "1등급 신선육" },
  { name: "쇠고기 (차돌박이, 갈비탕)", origin: "국내산 한우 (강원 횡성)", status: "1++등급" },
  { name: "닭고기 (치킨, 찜닭)", origin: "국내산 (하림 무항생제 닭)", status: "당일 도축 신선육" },
  { name: "배추김치 (고춧가루)", origin: "국내산 (충북 괴산)", status: "수제 직접 담근 김치" },
  { name: "오징어 / 낙지", origin: "국내산 (동해안 선상 냉동)", status: "HACCP 인증" },
  { name: "두부 / 콩나물", origin: "국내산 콩 100%", status: "유전자 변형 없음 (Non-GMO)" }
];
