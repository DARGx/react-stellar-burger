import { FC, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { authActions } from '../../services/reducers/auth'
import { useAppDispatch } from '../../services/store';


type ProtectedRouteProps = {
  element: JSX.Element
}

export const ProtectedRouteElement: FC<ProtectedRouteProps> = ({ element }) => {
  const { user, isError, isPending, isInitial } = useAuth();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(authActions.setReturnUrl(pathname));
    }
  }, [isError, user, dispatch, pathname]);

  if (isPending || isInitial) {
    return null;
  }

  if (user) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};
