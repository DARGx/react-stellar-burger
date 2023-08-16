import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth"

export const useLoggedIn = () => {
  const { user, isFinished } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFinished && user) {
      console.log(' useLoggedIn has user ');
      navigate('/', { replace: true });
    }
  }, [isFinished]);
};