import { useAuth } from "../../hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from '../../services/reducers/auth'
import { useEffect } from "react";

export const ProtectedRouteElement = ({ element }) => {
  const { user, isFinished } = useAuth();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFinished && !user) {
      dispatch(authActions.setReturnUrl(pathname));
    }
  }, [isFinished, user]);

  if (!isFinished) {
    return null;
  }

  if (user) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};
