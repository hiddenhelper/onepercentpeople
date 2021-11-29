export default {

  /**
   * Firebase configs for the web account.
   */
  web: {
    apiKey: process.env.FIREBASE_WEB_API_KEY ?? '',
    authDomain: process.env.FIREBASE_WEB_AUTH_DOMAIN ?? '',
    projectId: process.env.FIREBASE_WEB_PROJECT_ID ?? '',
    storageBucket: process.env.FIREBASE_WEB_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.FIREBASE_WEB_MESSAGING_SENDING_ID ?? '',
    appId: process.env.FIREBASE_WEB_APP_ID ?? '',
    measurementId: process.env.FIREBASE_WEB_APP_ID ?? ''
  },

  /**
   * Firebase configs for the admin service account.
   */
  service: {
    type: "service_account",
    project_id: process.env.FIREBASE_SERVICE_PROJECT_ID ?? '',
    private_key_id: process.env.FIREBASE_SERVICE_PRIVATE_KEY_ID ?? '',
    private_key: process.env.FIREBASE_SERVICE_PRIVATE_KEY ?? '',
    client_email: process.env.FIREBASE_SERVICE_CLIENT_EMAIL ?? '',
    client_id: process.env.FIREBASE_SERVICE_CLIENT_ID ?? '',
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_SERVICE_CLIENT_CERT_URL ?? ''
  }
}
