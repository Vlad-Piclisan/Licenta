import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initializeApp } from "firebase/app";
import { AuthContextProvider } from "./hooks/useAuth";
const firebaseConfig = {
  apiKey: "AIzaSyC8VCLKJ6zDh3zVzK-UJuOPrnbLWMXrUgw",
  authDomain: "licenta-30277.firebaseapp.com",
  projectId: "licenta-30277",
  storageBucket: "licenta-30277.appspot.com",
  messagingSenderId: "674750166386",
  appId: "1:674750166386:web:96d6a033328c3cdacf19eb",
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
