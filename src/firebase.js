import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCHUUrRIs2tu0M-SmPDoQ89jv4EDxE4wPQ",
  authDomain: "dashboard-95c5a.firebaseapp.com",
  databaseURL: "https://dashboard-95c5a-default-rtdb.firebaseio.com",
  projectId: "dashboard-95c5a",
  storageBucket: "dashboard-95c5a.appspot.com",
  messagingSenderId: "772469705724",
  appId: "1:772469705724:web:71f4cf3845251a4464c079",
  measurementId: "G-VLFF27EKJY",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;
