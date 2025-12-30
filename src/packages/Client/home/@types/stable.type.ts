export interface Stable {
    _id: string;
    name: string;
    totalRating: number;
    address: string;
    city: string;
    location: string; // URL to Google Maps
    picUrl: string;   // Image URL
    region: string;
    status: "Open"|"Closed";
  }
  
export interface GetStablesResponse {
    message: string;
    stables: Stable[];
    page: number;
    totalPages: number;
    totalItems: number;
  }

  export interface SchoolPrice {
    name: string;
    cost: number;
    _id: string;
    picUrl?: string;
    image?: string; // Alternative field name for image
  }

  export interface GetSchoolDetailsResponse {
    "message": string,
    "school": {
        "_id": string,
        "name": string,
        "email": string,
        "password": string,
        "phone": string,
        "profitPercentage": number,
        "totalRating": number,
        "__v": number,
        "address": string,
        "city": string,
        "description": string,
        "location": string,
        "picUrl": string,
        "picUrls"?: string[],
        "region": string,
        "price": SchoolPrice[],
        "deviceToken"?: string
    }
}