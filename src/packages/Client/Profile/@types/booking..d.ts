export type TBooking = {
    _id: string; // Booking ID
    startTime: string; // Format: "HH:mm"
    endTime: string;   // Format: "HH:mm"
    date: string;      // ISO date (e.g., 2025-08-03T00:00:00.000Z)
    bookingId: string; // Legacy or reference booking ID
    totalPrice: number;
    service: string;   // e.g., "Photo session"
    stable: StableInfo;
    customer: string;  // Customer ID
    createdAt: string; // ISO timestamp
  };
  
  export type StableInfo = {
    _id: string;
    en: string; // English name
    ar: string; // Arabic name
    picUrl: string; // Full image URL
  };
  
  
  export type GetBookingsResponse = {
    success: boolean;
    booking: TBooking[];
  };
  