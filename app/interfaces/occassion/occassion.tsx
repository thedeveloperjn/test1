export interface getAllOcassionResponse {
  status: boolean;
  code: number;
  count: number;
  message: string;
  data: occassion[];
}

export interface occassion {
  _id: string;
  icon: string;
  name: string;
  slug: string;
  deleteStatus: boolean;
  __v: number;
}
