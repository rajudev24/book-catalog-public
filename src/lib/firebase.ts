/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.Book_apiKey,
//   authDomain: import.meta.env.Book_authDomain,
//   projectId: import.meta.env.Book_projectId,
//   storageBucket: import.meta.env.Book_storageBucket,
//   messagingSenderId: import.meta.env.Book_messagingSenderId,
//   appId: import.meta.env.Book_appId,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDklnVJ2q0j6tyrTSzV82BZwntzXWKulFo",
  authDomain: "book-catalog-303df.firebaseapp.com",
  projectId: "book-catalog-303df",
  storageBucket: "book-catalog-303df.appspot.com",
  messagingSenderId: "887721102896",
  appId: "1:887721102896:web:d2cd71b64f9f3c054527f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
