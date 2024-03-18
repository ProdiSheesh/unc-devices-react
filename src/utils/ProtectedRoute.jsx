/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, navigateTo, children }) {
  if (!isLoggedIn) {
    // Store the current URL in localStorage before redirecting
    localStorage.setItem("redirectURL", window.location.pathname);
    return <Navigate to={navigateTo} replace />;
  }
  return children;
}
