export interface Category {
  id: number;
  name: string;
  meta_des: string;
  meta_keywords: string;
  created_at: string;
}
export interface CategoryDetails {
  id: number;
  name: string;
  meta_des: string;
  meta_keywords: string;
  created_at: string;
  number_sub_categories: number;
  sub_categories: [];
}
