export interface Ingredient {
  _id: string;
  __v: number;
  type: IngredientType;
  price: number;
  name: string;
  image: string;
  image_mobile: string;
  image_large: string;
  fat: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
}

export interface IngredientWithUid extends Ingredient {
  uniqueId: string;
}

export enum IngredientType {
  BUN = 'bun',
  MAIN = 'main',
  SAUCE = 'sauce',
}