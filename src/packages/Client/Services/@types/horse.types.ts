export interface Horse {
    _id: string;
    name: string;
    price: number;
    type: string;
    level: string;
    picUrls: string[];
  }
  export interface HorseDetail {
    _id: string;
    name: string;
    description: string;
    gender: string;
    price: number;
    type: string;
    level: string;
    feature: string;
    color: string;
    picUrls: string[];
    __v: number;
  }
  
  export interface GetHorseDetailResponse {
    message: string;
    horse: HorseDetail;
  }
  export interface GetHorsesResponse {
    message: string;
    horses: Horse[];
    page: number;
    totalPages: number;
    totalItems: number;
  }