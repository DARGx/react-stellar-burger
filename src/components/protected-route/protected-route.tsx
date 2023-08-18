import { FC, useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { authActions } from '../../services/reducers/auth'
import { useAppDispatch } from '../../services/store';


type ProtectedRouteProps = {
  element: JSX.Element
}

export const ProtectedRouteElement: FC<ProtectedRouteProps> = ({ element }) => {
  const { user, isFinished } = useAuth();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFinished && !user) {
      dispatch(authActions.setReturnUrl(pathname));
    }
  }, [isFinished, user, dispatch, pathname]);

  if (!isFinished) {
    return null;
  }

  if (user) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};
