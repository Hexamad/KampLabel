export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  dimension1: number;
  dimension2: number;
  dimension3: number;
  dimensionUnit: DimensionUnit;
  quantity: number;
  quantityUnit: QuantityUnit;
  price: number;
}

export type DimensionUnit = 'mm' | 'cm' | 'inch' | 'feet';
export type QuantityUnit = 'pcs' | 'kg';

export const dimensionUnits: DimensionUnit[] = ['mm', 'cm', 'inch', 'feet'];
export const quantityUnits: QuantityUnit[] = ['pcs', 'kg'];

export const productCategories = [
  'Mattress',
  'Pillow',
  'Bedsheet',
  'Cushion',
  'Comforter',
  'Other'
];