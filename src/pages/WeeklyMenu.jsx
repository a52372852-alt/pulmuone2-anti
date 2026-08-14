import React from 'react';
import BoardPage from './BoardPage';
import { ChefHat } from 'lucide-react';

export default function WeeklyMenu() {
  return (
    <BoardPage
      category="recipe"
      heading="레시피&식단"
      icon={ChefHat}
      emptyText="아직 등록된 레시피가 없습니다."
    />
  );
}
