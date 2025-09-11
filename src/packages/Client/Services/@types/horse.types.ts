export interface Horse {
    _id: string;
    name: LocalizedField|string;
    price: number;
    type: string;
    level: string;
    picUrls: string[];
    stable:string
  }
  export interface HorseDetail {
    _id: string;
    name: any;
    description: string;
    gender: string;
    price: number;
    type: string;
    level: string;
    feature: string;
    color: string;
    picUrls: string[];
    __v: number;
    stable:string
    videoUrl:string
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

  export interface LocalizedField {
    en: string;
    ar: string;
  }
  
  export interface StableDetails {
    _id: string;
    name: LocalizedField;
    city: LocalizedField;
    region: LocalizedField;
    address: LocalizedField;
    email: string;
    phone: string;
    sessionPercentage: number;
    location: string;
    picUrl: string;
  }
  
  export interface GetStableDetailsResponse {
    message: string;
    stable: StableDetails;
  }
  