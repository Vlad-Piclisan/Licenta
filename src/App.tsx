import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { Box, Button, CircularProgress, Fade } from "@mui/material";
import { AuthContext, useAuth } from "./hooks/useAuth";

import StartingPage from "./pages/StartingPage";
import { AuthGuard } from "./components/Guards/AuthGuard";
import ApplicationLayout from "./pages/ApplicationLayout";
import Products from "./pages/Products/Products";
import Configurator from "./pages/Configurator/Configurator";
import Cart from "./components/Cart";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Account from "./pages/Account/Account";
import Checkout from "./components/Checkout";

function NotFound() {
  return (
    <div>
      <p>404 Not found</p>
    </div>
  );
}

function App() {
  const { user, userInfo } = useContext(AuthContext);

  if (user === undefined) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ApplicationLayout>
            <StartingPage />
          </ApplicationLayout>
        }
      />
      <Route path="Sign-In" element={<SignIn />} />
      <Route path="Sign-Up" element={<SignUp />} />
      <Route
        path="Products"
        element={
          <ApplicationLayout>
            <Products />
          </ApplicationLayout>
        }
      />
      <Route
        path="Configurator"
        element={
          <ApplicationLayout>
            <Configurator />
          </ApplicationLayout>
        }
      />
      <Route
        path="Cart"
        element={
          <ApplicationLayout>
            <Cart />
          </ApplicationLayout>
        }
      />
      <Route
        path="Forgot-Password"
        element={<ForgotPassword />}
      />
      {/* <Route
        path="Main"
        element={
          <AuthGuard>
            <Main />
          </AuthGuard>
        }
      /> */}
      <Route
        path="/Account"
        element={
          <ApplicationLayout>
            <AuthGuard>
              <Account />
            </AuthGuard>

          </ApplicationLayout>
        }
      />
      <Route
        path="/Checkout"
        element={
          <ApplicationLayout>
            <AuthGuard>
              <Checkout></Checkout>
            </AuthGuard>

          </ApplicationLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
