import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { AuthContext, AuthGuard, useAuth } from "./hooks/useAuth";
import Main from "./pages/main/main";

function NotFound(){
  return <div>
    <p>
      404 Not found
    </p>
  </div>
}

function App() {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <>"Loading ..."</>;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="Sign-Up" element={<SignUp />} />
        <Route
          path="Main"
          element={
            <AuthGuard>
              <Main />
            </AuthGuard>
          }
        />
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <div>
        {user && (
          <div>
            <p>
              User is signed in with email {user.email}
              <Button
                variant="contained"
                onClick={() => {
                  const auth = getAuth();
                  signOut(auth);
                }}
              >
                Sign Out
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
