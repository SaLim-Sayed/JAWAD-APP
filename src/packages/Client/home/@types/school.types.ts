export interface Price {
    _id: string;
    name: string;
    cost: number;
}

export interface TSchool {
    _id: string;
    name: string;
    totalRating: number;
    completed: boolean;
    price: Price[];
    address: string;
    city: string;
    description: string;
    location: string;
    picUrl: string;
    region: string;
}
export interface TSchoolProps {
    _id: string,
        name: string,
        email: string,
        password: string,
        phone: string,
        totalRating: number,
        __v: 1,
        price: Price[];
        address: string,
        city: string,
        description: string,
        location: string,
        picUrl: string,
        region: string
    }
export interface GetSchoolDetailsResponse {
    message: string;
    school: {
        _id: string,
        name: string,
        email: string,
        password: string,
        phone: string,
        totalRating: number,
        __v: 1,
        address: string,
        city: string,
        description: string,
        location: string,
        picUrl: string,
        region: string
    }
}

export interface SchoolsResponse {
    message: string;
    schools: TSchool[];
    page: number;
    totalPages: number;
    totalItems: number;
}
