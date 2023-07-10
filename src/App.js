import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MapMain from "./pages/MapMain";

export default function App() {

  const { isAdmin, isViewer } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!isAdmin && !isViewer) {
      return <Navigate to="/login" />;
    }
    return children;
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/maps">
          <Route
            index
            element={
              <ProtectedRoute>
                <MapMain />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
