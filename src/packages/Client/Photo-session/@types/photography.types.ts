export interface Photographer {
    _id: string;
    name: string;
    picUrls: string[];
    totalRating: number;
    city: string;
  }

  export interface PhotographerPackage {
    number: string;
    price: string;
    _id?: string;
  }

  export interface PhotographerDetails {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    picUrls: string[];
    totalRating: number;
    city: string;
    description?: string;
    packages?: PhotographerPackage[];
    stables?: any[];
    address?: string;
    location?: string;
  }
  
  export interface GetPhotographersResponse {
    message: string;
    photographers: Photographer[];
    page: number;
    totalPages: number;
    totalItems: number;
  }

  export interface GetPhotographerOwnDataResponse {
    message?: string;
    photographer?: PhotographerDetails;
    // Handle case where API returns photographer directly
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    picUrls?: string[];
    totalRating?: number;
    city?: string;
    description?: string;
    packages?: PhotographerPackage[];
    stables?: any[];
    address?: string;
    location?: string;
  }