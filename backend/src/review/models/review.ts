export interface Review {
  id: number;
  landlord: string;
  country_code: string;
  city: string;
  state: string;
  zip: string;
  review: string;
  repair: number;
  health: number;
  stability: number;
  privacy: number;
  respect: number;
  dataadded: Date; // auto-generated by db
  flagged: boolean;
  flagged_reason: string;
  admin_approved: boolean | null;
  admin_edited: boolean;
}
