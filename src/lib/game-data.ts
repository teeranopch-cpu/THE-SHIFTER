
export type CardType = 'innovation' | 'special' | 'surrender';

export interface CityProblem {
  id: string;
  title: string;
  description: string;
  cards: {
    id: string;
    label: string;
    type: CardType;
    isCorrect: boolean;
  }[];
}

export const CITY_PROBLEMS: CityProblem[] = [];

export type Category = 'Environment and Energy' | 'Economy' | 'Transportation' | 'Living and Citizenship' | 'Government Administration';
