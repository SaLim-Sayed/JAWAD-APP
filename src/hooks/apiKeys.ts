export const apiKeys = {
    auth: {
      register: "/api/v1/auth/register",
      login: "/api/v1/auth/login",
      googleAuth: "/api/v1/auth/googleAuth",
      appleAuth: "/api/v1/auth/appleAuth",
      getUserDetails:"/api/v1/user/details",
    },
    stable: {
      addStable: "/api/v1/stable/add",
      login: "/api/v1/stable/login",
      completed: (id:string) => `/api/v1/stable/completed/${id}`,
      getStable: "/api/v1/stable/get?page=",
      stableDetails: "/api/v1/stable/details/",
      stableDetail:(id:string) => `/api/v1/stable/details/${id}`,

      updateStable:(id:string) => `/api/v1/stable/update/${id}`,
      completeStable:(id:string) => `/api/v1/stable/completed/${id}`,
    },
    horse: {
      addHorse:(stableId:string) => `/api/v1/horse/add/${stableId}`,
      getHorse:(stableId:string) => `/api/v1/horse/get/${stableId}?page=1&nationality=Foreign&service=Ride`,
      horseDetails: "/api/v1/horse/details/",
      horseDetail:(id:string) => `/api/v1/horse/details/${id}`,
      updateHorse: (id:string) => `/api/v1/horse/update/${id}`,
      horseAvailable: "/api/v1/horse/horseAvailable",
      reservedTimes: "/api/v1/horse/reservedTimes",
      deleteHorse:(id:string) => `/api/v1/horse/delete/${id}`,
    },
    event: {
      addEvent: "/api/v1/event/addEvent",
      updateEvent: "/api/v1/event/updateEvent",
      deleteEvent: "/api/v1/event/deleteEvent",
      booking: "/api/v1/event/booking",
      getEvent: "/api/v1/event/get?page=",
      eventDetails: "/api/v1/event/details/",
    },
    photographer: {
      addPhotographer: "/api/v1/photographer/addPhotographer",

      login: "/api/v1/photographer/login",
      getPhotograoher:"/api/v1/photographer/get?page=1",
      completed:(id:string) => `/api/v1/photographer/completed/${id}`,
      getPhotographerDetails:(id:string) => `/api/v1/photographer/get/detail/${id}`,
    },

    booking:{
      payment:"/api/v1/payment/pay",
      Photo_session:"/api/v1/booking/create",
      event:"/api/v1/event/booking",
    },
  };