export interface Event {
    _id: string;
    name: string;
    city: string;
    region: string;
    description: string;
    address:string;
    location: string;
    date: string;    // ISO date string
    picUrl: string;  // Image URL
    price: number;
  }
  
  export interface GetEventsResponse {
    message: string;
    events: Event[];
    page: number;
    totalPages: number;
    totalItems: number;
  }
  export interface GetEventDetailsResponse {
    message: string;
    event: Event;
  }