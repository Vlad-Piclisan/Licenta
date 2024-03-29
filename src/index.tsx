import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initializeApp } from "firebase/app";
import "./index.css";
import { AuthContextProvider } from "./hooks/useAuth";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { CartContextProvider } from "./hooks/useCart";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigsContextProvider } from "./hooks/useConfig";

const firebaseConfig = {
  apiKey: "AIzaSyC8VCLKJ6zDh3zVzK-UJuOPrnbLWMXrUgw",
  authDomain: "licenta-30277.firebaseapp.com",
  projectId: "licenta-30277",
  storageBucket: "licenta-30277.appspot.com",
  messagingSenderId: "674750166386",
  appId: "1:674750166386:web:96d6a033328c3cdacf19eb",
};
const queryClient = new QueryClient()
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <CartContextProvider>
            <ConfigsContextProvider>
              <App />
            </ConfigsContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);
