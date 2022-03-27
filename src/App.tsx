import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC8VCLKJ6zDh3zVzK-UJuOPrnbLWMXrUgw",

  authDomain: "licenta-30277.firebaseapp.com",

  projectId: "licenta-30277",

  storageBucket: "licenta-30277.appspot.com",

  messagingSenderId: "674750166386",

  appId: "1:674750166386:web:96d6a033328c3cdacf19eb",
};

const app = initializeApp(firebaseConfig);

function App() {
  return <div>Meche :)</div>;
}

export default App;
