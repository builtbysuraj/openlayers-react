import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from './context/AuthContext';
import "./index.css";
import "./server.js";
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)