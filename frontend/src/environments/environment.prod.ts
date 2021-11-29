export const environment = {
  production: true,
  api_url: "https://api.onepercentpeople.com/v1",
  plaid_client_id: '56c75e0edb2afcb6184d2c0a',
  plaid_public_key: 'd17298a88d20be6c0fb14bb7513747',
  plaid_default_config: {
    apiVersion: "v2",
    env: "sandbox",
    token: undefined,
    webhook: "https://onepercentpeople.com/dashboard",
    product: ["auth"],
    countryCodes: ['US'],
    key: 'd17298a88d20be6c0fb14bb7513747',
  },
  firebaseConfig: {
    apiKey: "AIzaSyCrH_R2GcKWIg3O3KzmweENa2peHKNwhrU",
    authDomain: "one-percent-people.firebaseapp.com",
    projectId: "one-percent-people",
    storageBucket: "one-percent-people.appspot.com",
    messagingSenderId: "394307317510",
    appId: "1:394307317510:web:cc001476986bdf52c13887",
    measurementId: "G-9CVD4L8DFQ"
  }
};
