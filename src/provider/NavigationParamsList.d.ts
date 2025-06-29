import { navigationEnums } from './navigationEnums';

export type NavigationParamsList = {
  [navigationEnums.MAIN]: undefined;
  [navigationEnums.HOME]: undefined;
  
  [navigationEnums.PROFILE]: undefined;
  [navigationEnums.SERIES_STREAM]: undefined;
  [navigationEnums.SERIES_DETAILS]: undefined;
  [navigationEnums.MOVIES]: undefined;
  [navigationEnums.MOVIES_DETAILS]: undefined;
  [navigationEnums.MOVIES_STREAM]: undefined;
  [navigationEnums.PROFILE_SETTINGS]: undefined;
  [navigationEnums.PROFILE_PLAYLIST]: undefined;
  [navigationEnums.PROFILE_LANGUAGE]: undefined;
  [navigationEnums.PROFILE_CLEAR_CACHE]: undefined;
  [navigationEnums.PROFILE_APPLICATION_INFO]: undefined;

  // Auth
  [navigationEnums.ONBOARD1]: undefined;
  [navigationEnums.ONBOARD2]: undefined;
  [navigationEnums.ONBOARD3]: undefined;
  [navigationEnums.LOGIN_SCREEN]: undefined;
  [navigationEnums.SIGNUP_SCREEN]: undefined;
  [navigationEnums.FORGET_PASSWORD_SCREEN]: undefined;
  [navigationEnums.OTP_SCREEN]: undefined;
  [navigationEnums.CHANGE_PASSWORD_SCREEN]: undefined;
  [navigationEnums.CHANGE_PASSWORD_SUCCESS_SCREEN]: undefined;
  [navigationEnums.REGISTER_SUCCESS_SCREEN]: undefined;

  //SERVICE
  [navigationEnums.STABLE]: undefined;
  [navigationEnums.SERVICE]: undefined;
  [navigationEnums.STABLE_SERVICES_DETAILS]: {id:any};
  [navigationEnums.HORSES]: undefined;

};