import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login } from "./Container";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { validateGoogleToken } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateGoogleToken(token).then((res) => {
            dispatch({
              type: actionType.SET_USER,
              user: res.data,
            });
          });
        });
      } else {
        navigate("/login", { replace: true });
      }
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
