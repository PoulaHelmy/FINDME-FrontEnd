export interface Request {
  id: number;
  name?: string;
  description?: string;
  item_id: number;
  item_name?: string;
  status?: number;
  created_at?: string;
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
