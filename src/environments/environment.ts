// import { EnvServiceFactory } from '../app/env.service.provider';
// const env = EnvServiceFactory();
// const { productionMode, PORTAL_API_ENDPOINT, REWARD_API_ENDPOINT,USER_SERVICE_ENDPOINT, PAYMENT_ENDPOINT, DIAL_CODE, Domain, RaffleService } = env;

// let PORTAL_API_ENDPOINT = 'https://devbackendapi.fortunepay.com.ph/api';
// let REWARD_API_ENDPOINT = 'https://devrewardserviceapi.fortunepay.com.ph/api';
// let PAYMENT_ENDPOINT = 'https://devapi.fortunepay.com.ph/v1';
// let USER_SERVICE_ENDPOINT = 'https://devuserservice.fortunepay.com.ph/api/setting/v1';
// let DIAL_CODE = '+91';
// let productionMode = false;
// let Domain = 'https://devbackendapi.fortunepay.com.ph';
// let RaffleService = 'https://devraffleserviceapi.fortunepay.com.ph/api';

let PORTAL_API_ENDPOINT = 'http://devbackendapi.fortunepay.com.ph/api';
let REWARD_API_ENDPOINT = 'http://devrewardserviceapi.fortunepay.com.ph/api';
let PAYMENT_ENDPOINT = 'http://devapi.fortunepay.com.ph/v1';
let USER_SERVICE_ENDPOINT = 'http://devuserservice.fortunepay.com.ph/api/setting/v1';
let DIAL_CODE = '+91';
let productionMode = false;
let Domain = 'http://devbackendapi.fortunepay.com.ph';
let RaffleService = 'http://devraffleserviceapi.fortunepay.com.ph/api';

export const environment = {
  production: productionMode,
  APIEndpoint: PORTAL_API_ENDPOINT,
  REWARDAPTEndpoint: REWARD_API_ENDPOINT,
  PaymentAPIEndpoint: PAYMENT_ENDPOINT,
  USERSERVICEENDPoint: USER_SERVICE_ENDPOINT,
  DIAL_CODE: DIAL_CODE,
  Domain: Domain,
  RaffleService
};
