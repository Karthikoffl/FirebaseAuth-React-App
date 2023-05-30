import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIus7XpWqY1lanUI0BAgR_ZF93jeknQro",
  authDomain: "fir-auth-c0d5a.firebaseapp.com",
  projectId: "fir-auth-c0d5a",
  storageBucket: "fir-auth-c0d5a.appspot.com",
  messagingSenderId: "1066237764439",
  appId: "1:1066237764439:web:c432e48529ddf2befbd412",
};

const app = getApps.length > 0 ? getApps() : initializeApp(firebaseConfig);

export { app };
