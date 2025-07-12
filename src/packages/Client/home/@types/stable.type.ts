export interface Stable {
    _id: string;
    name: string;
    totalRating: number;
    address: string;
    city: string;
    location: string; // URL to Google Maps
    picUrl: string;   // Image URL
    region: string;
  }
  
export interface GetStablesResponse {
    message: string;
    stables: Stable[];
    page: number;
    totalPages: number;
    totalItems: number;
  }