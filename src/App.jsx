import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/inventory/Inventory";
import AddDevice from "./pages/inventory/AddDevice";
import UpdateDevice from "./pages/inventory/UpdateDevice";
import ViewDevice from "./pages/inventory/ViewDevice";
import Login from "./pages/auth/Login";
import { useCookies } from "react-cookie";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  /*
    Get JWT to check if user is Auth
  */
  const [cookies] = useCookies(["token"]);
  function isAuthenticated() {
    const token = cookies.token;
    return !!token;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated()} navigateTo="/login">
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/devices/add"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated()} navigateTo="/login">
              <AddDevice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/:id"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated()} navigateTo="/login">
              <ViewDevice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/:id/update"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated()} navigateTo="/login">
              <UpdateDevice />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
