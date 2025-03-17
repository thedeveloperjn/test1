export interface getAllColorFamilyResponse {
  status: boolean;
  code: number;
  count: number;
  message: string;
  data: ColorFamily[];
}

export interface ColorFamily {
  _id: string;
  colorName: string;
  hexaColor: string;
  __v: number;
}
