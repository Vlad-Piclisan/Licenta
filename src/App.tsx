import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { initializeApp } from "firebase/app";
import { Route, Routes } from "react-router-dom";

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
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="Sign-Up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
