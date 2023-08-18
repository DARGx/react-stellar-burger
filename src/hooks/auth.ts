import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authUser, authRefresh } from "../services/reducers/auth";
import { AppState, useAppDispatch } from '../services/store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, refreshToken, accessToken } = useSelector((state: AppState) => state.auth);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    (async () => {
      if (accessToken) {
        try {
          const res = await dispatch(authUser()).unwrap();
          if (res.success) {

          } else {
            throw Error(JSON.stringify(res));
          }
        } catch (error) {
          console.error(error);
        }
      } else if (refreshToken) {
        try {
          const res = await dispatch(authRefresh()).unwrap();
          if (res.success) {
            await dispatch(authUser()).unwrap();
          } else {
            throw Error(JSON.stringify(res));
          }
        } catch (error) {
            console.error(error)
        }
      }

      setIsFinished(true);
    })();

  }, [accessToken, refreshToken, dispatch]);


  return {
    user,
    isFinished,
  }
};