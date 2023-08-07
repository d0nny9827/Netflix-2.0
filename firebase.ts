import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2hmTD2v1VbSAhC8nFaxX3-REkRVT680g",
  authDomain: "netflix-clone-39f47.firebaseapp.com",
  projectId: "netflix-clone-39f47",
  storageBucket: "netflix-clone-39f47.appspot.com",
  messagingSenderId: "861310553373",
  appId: "1:861310553373:web:b5099c741ca185b692a5f4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider()

export default app;
export { auth,googleProvider };
