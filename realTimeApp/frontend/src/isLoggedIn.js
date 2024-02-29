import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useLocation } from "react-router";

const isLoggedIn = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:3000";
  useEffect(() => {
    const isLoggedIn = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/isLoggedIn`,

        {
          withCredentials: true,
        }
      );
      if (!response.data) {
        navigate("/login");
        return false;
      } else {
        if (path === "/") navigate("/");
        return true;
      }
    };

    isLoggedIn();
  }, []);
};

export default isLoggedIn;
