export interface SubCategory {
  id: number;
  name: string;
  meta_des: string;
  meta_keywords: string;
  category: number;
  category_name: string;
  created_at: string;
  inputs?: [];
}
export interface SubCategoryDetails {
  id: number;
  name: string;
  meta_des: string;
  meta_keywords: string;
  category: number;
  created_at: string;
  number_inputs: number;
  inputs: [];
}
