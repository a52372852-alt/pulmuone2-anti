export const ALLERGY_LIST = [
  { id: 1, name: "난류", icon: "🥚", description: "계란, 메추리알 등" },
  { id: 2, name: "우유", icon: "🥛", description: "우유, 치즈, 가공유 등" },
  { id: 3, name: "메밀", icon: "🍜", description: "메밀 국수, 묵 등" },
  { id: 4, name: "땅콩", icon: "🥜", description: "땅콩, 견과류 소스 등" },
  { id: 5, name: "대두", icon: "🫘", description: "두부, 된장, 간장 등" },
  { id: 6, name: "밀", icon: "🌾", description: "빵, 국수, 튀김 옷 등" },
  { id: 7, name: "고등어", icon: "🐟", description: "고등어 구이, 조림 등" },
  { id: 8, name: "게", icon: "🦀", description: "게장, 게살 파스타 등" },
  { id: 9, name: "새우", icon: "🦐", description: "새우튀김, 칠리새우 등" },
  { id: 10, name: "돼지고기", icon: "🐖", description: "제육볶음, 돈가스 등" },
  { id: 11, name: "복숭아", icon: "🍑", description: "생과일, 통조림 등" },
  { id: 12, name: "토마토", icon: "🍅", description: "토마토 스파게티, 케첩 등" },
  { id: 13, name: "아황산류", icon: "🍷", description: "건조 과일, 건포도 등" },
  { id: 14, name: "호두", icon: "🌰", description: "호두 조림, 빵류 등" },
  { id: 15, name: "닭고기", icon: "🐓", description: "치킨, 찜닭, 삼계탕 등" },
  { id: 16, name: "쇠고기", icon: "🐂", description: "불고기, 미역국, 소갈비 등" },
  { id: 17, name: "오징어", icon: "🦑", description: "오징어 볶음, 짬뽕 등" },
  { id: 18, name: "조개류", icon: "🦪", description: "굴, 전복, 홍합, 바지락 등" },
  { id: 19, name: "잣", icon: "🌲", description: "잣죽, 고명 등" },
];

export const getAllergyNamesByIds = (ids = []) => {
  return ids
    .map(id => ALLERGY_LIST.find(item => item.id === id))
    .filter(Boolean);
};
