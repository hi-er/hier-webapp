import React from "react";
import { Navigate , Route, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log(isAuthenticated);
    let location = useLocation();
  
    if (!isAuthenticated) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} />;
    }
  
    return children;
  }

export default ProtectedRoute;