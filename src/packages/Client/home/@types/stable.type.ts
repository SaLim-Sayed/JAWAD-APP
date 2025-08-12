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

  export interface GetSchoolDetailsResponse {
    "message": "تم الحصول علي بيانات المدرسه بنجاح",
    "school": {
        "_id": string,
        "name": string,
        "email": string,
        "password": string,
        "phone": string,
        "totalRating": number,
        "__v": 1,
        "address": string,
        "city": string,
        "description": string,
        "location": string,
        "picUrl": string,
        "region": string
    }
}