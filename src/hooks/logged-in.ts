import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth'

export const useLoggedIn = () => {
  const { user, isSuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSuccess, user, navigate]);
};