import { useEffect } from "react";
import { authUser, authRefresh } from "../services/reducers/auth";
import { useAppDispatch, useAppSelector } from "../services/store";
import { getRequestStatus } from "../utils/request-status";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, refreshToken, accessToken, status } = useAppSelector(
    (state) => state.auth
  );
  const { isInitial, isPending, isError, isSuccess } = getRequestStatus(status);

  useEffect(() => {
    (async () => {
      if (isPending || isSuccess) {
        return;
      }

      try {
        if (!accessToken) {
          throw Error("No access token");
        }
        const res = await dispatch(authUser()).unwrap();
        if (res.success) {
        } else {
          throw Error(JSON.stringify(res));
        }
      } catch (error) {
        try {
          const res = await dispatch(authRefresh()).unwrap();
          if (res.success) {
            await dispatch(authUser()).unwrap();
          } else {
            throw Error(JSON.stringify(res));
          }
        } catch (error) {}
      }
    })();
  }, [accessToken, dispatch, isPending, isSuccess, refreshToken]);

  return {
    user,
    isInitial,
    isPending,
    isSuccess,
    isError,
  };
};
