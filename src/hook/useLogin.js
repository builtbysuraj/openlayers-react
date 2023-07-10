import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function useLogin() {
  const { setIsViewer, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      return false;
    }
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.role === "Admin") {
        setIsAdmin(true);
        navigate("/admin");
        return true;
      } else if (data.role === "Viewer") {
        setIsViewer(true);
        navigate("/maps");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return handleLogin;
}
