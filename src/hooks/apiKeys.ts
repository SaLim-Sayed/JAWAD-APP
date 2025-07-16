export const apiKeys = {
    auth: {
      register: "/api/v1/auth/register",
      login: "/api/v1/auth/login",
      googleAuth: "/api/v1/auth/googleAuth",
      appleAuth: "/api/v1/auth/appleAuth",
    },
    stable: {
      addStable: "/api/v1/stable/add",
      login: "/api/v1/stable/login",
      completed: "/api/v1/stable/completed",
      getStable: "/api/v1/stable/get?page=",
      stableDetails: "/api/v1/stable/stableDetails",
      updateStable: "/api/v1/stable/updateStable",
    },
    horse: {
      addHorse: "/api/v1/horse/add",
      getHorse: "/api/v1/horse/get/685ebadc42f93b3d7279a8cf?page=1&nationality=Foreign&service=Ride",
      horseDetails: "/api/v1/horse/details/",
      updateHorse: "/api/v1/horse/updateHorse",
      horseAvailable: "/api/v1/horse/horseAvailable",
      reservedTimes: "/api/v1/horse/reservedTimes",
      deleteHorse: "/api/v1/horse/deleteHorse",
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
      completed: "/api/v1/photographer/completed",
    },
  };