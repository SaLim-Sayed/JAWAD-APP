export interface Photographer {
    _id: string;
    name: string;
    picUrls: string[];
    totalRating: number;
    city: string;
  }
  
  export interface GetPhotographersResponse {
    message: string;
    photographers: Photographer[];
    page: number;
    totalPages: number;
    totalItems: number;
  }