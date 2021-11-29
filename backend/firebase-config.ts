const firebase = require("firebase");
const admin = require('firebase-admin');
// import { ServiceAccount } from 'firebase-admin';
import firebaseConfigs from './configs/firebase';
const { web: firebaseWebConfigs, service: firebaseServiceConfigs } = firebaseConfigs;

function firebaseWeb() {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseWebConfigs);
  }

  return firebase;
}

function firebaseAdmin() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceConfigs),
      databaseURL: process.env.FIREBASE_DB_URL
    });
  }

  return admin;
}

module.exports = {
  firebaseWeb,
  firebaseAdmin
}
