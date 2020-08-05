export interface Item {
  id: number;
  name: string;
  category_id: number;
  category: string;
  subcat_id: number;
  subcat: string;
  location?: string;
  description?: string;
  is_found: string;
  date?: string;
  created_at?: string;
  images?: Image[];
}
export interface Image {
  name?: string;
  src?: string;
}

export interface ItemOption {
  name?: string;
  value?: string;
  item_id?: number;
}
