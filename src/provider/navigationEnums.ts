 export const navigationEnums = {
  HOME: "home",
  
   MAIN: "Main",
  SERIES_STREAM: "series/stream",
  SERIES_DETAILS: "series/details",
  MOVIES: "movies",
  MOVIES_DETAILS: "movies/details",
  MOVIES_STREAM: "movies/stream",
  PROFILE_SETTINGS: "profile/settings",
  PROFILE_PLAYLIST: "profile/playlist",
  PROFILE_LANGUAGE: "profile/language",
  PROFILE_CLEAR_CACHE: "profile/clearCache",
  PROFILE_APPLICATION_INFO: "profile/applicationInfo",


  // Auth
  ONBOARD1: "onboard1",
  ONBOARD2: "onboard2",
  ONBOARD3: "onboard3",
  LOGIN_SCREEN: "login/:role",
  SIGNUP_SCREEN: "signUp",
  FORGET_PASSWORD_SCREEN: "forget-password",
  OTP_SCREEN: "otp",
  CHANGE_PASSWORD_SCREEN: "change-password",
  CHANGE_PASSWORD_SUCCESS_SCREEN: "change-password-success",
  REGISTER_SUCCESS_SCREEN: "register-success",
  COMPLETE_STABLE: "complete-stable/:id",
  COMPLETE_PHOTOGRAPHER: "complete-photographer/:id",



  //SERVICE
  STABLE_SERVICES_DETAILS: "stable/services/details/:id",
  STABLE: "stable",
  SERVICE: "service",
  RIDES: "rides",
  PHOTOS: "photos",
  HORSES: "horses/:id", 
  HORSE_DETAILS: "horse/details/:id",
  SERVICES: "services",
  PHOTO_SESSION_DETAILS: "photo/session/details/:id",
  LOGOUT: "logout",

  // Stable
  STABLE_OVERVIEW: "stable/overview",
  HORSE_DETAIL: "horse/details",  
  MY_WALLET: "my/wallet",
  HORSE_EDIT: "horse/edit/:id",
  HORSE_CREATE: "horse/create",
  
  //EVENTs
  EVENTS: "events",
  EVENT_DETAILS: "event/details/:id",
  EVENT_BOOKING: "event/booking/:id?:type",
  EVENT_BOOKING_SUCCESS: "event/booking-success",


  //Profile
  PROFILE: "profile", 
   PROFILE_USER: "profile/user",
   ABOUT_US:"profile/about_us",
   TERMS:"profile/terms",
   CONTACT_US:"profile/contact_us",
   CART:"profile/cart",
   BOOKING_HISTORY:"profile/booking_history",
   BOOKING_DETAILS:"profile/booking_details/:id/:item",
   COMPLAINT:"profile/complaint",
   LANGUAGE:"profile/language",
} as const;