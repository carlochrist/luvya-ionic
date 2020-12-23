import * as firebase from "firebase";
import { toast } from "./toast";

const firebaseConfig = {
  apiKey: "AIzaSyDL9jQJPOo2mDZbb38K1HNyqsvLryLPjrs",
  authDomain: "luvya-app-new.firebaseapp.com",
  databaseURL: "https://luvya-app-new.firebaseio.com",
  projectId: "luvya-app-new",
  storageBucket: "luvya-app-new.appspot.com",
  messagingSenderId: "981263410376",
  appId: "1:981263410376:web:9b3664a22b0fa4d0e571fd",
};

firebase.default.initializeApp(firebaseConfig);

export async function loginUser(username: string, password: string) {
  const email = `${username}@luvya.com`;

  try {
    const res = await firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(res);
    return true;
  } catch (error) {
    toast(error.message, 4000);
    return false;
  }
}

export async function registerUser(username: string, password: string) {
  const email = `${username}@luvya.com`;

  try {
    const res = await firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(res);
    return true;
  } catch (error) {
    toast(error.message, 4000);
    return false;
  }
}
