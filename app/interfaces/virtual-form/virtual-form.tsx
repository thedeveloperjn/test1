export interface VirtualFormPersonalInfo {
  name: string;
  contact: string;
  email: string;
  city: string;
}

export interface VirtualShoppingPreferences extends VirtualFormPersonalInfo {
  productCategory: string;
  budgetRange: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export type VirtualShopFormStep = 1 | 2 | 3 | number;

export interface VirtualShopPayload {
  categories: string[];
  name: string;
  contactNo: string;
  emailId: string;
  city: string;
  priceRange: string;
  remarks: string;
  preferedDate: string; // ISO date string
  timeSlot: string; // ISO date string
}
