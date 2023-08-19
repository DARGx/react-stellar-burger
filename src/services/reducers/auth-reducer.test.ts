import { RequestStatus } from "../../utils/request-status";
import {
  authLogin,
  authLogout,
  authRefresh,
  authRegister,
  authUser,
  patchUser,
  slice,
} from "./auth";

const INITIAL_STATE = {
  accessToken: "",
  refreshToken: "",
  restoreOk: false,
  returnUrl: "",
  user: null,
  status: RequestStatus.INITIAL,
};

const initialState = slice.getInitialState();

describe("auth reducer", () => {
  const returnUrl = "/profile";
  it("getInitialState", () => {
    const nextState = slice.reducer(undefined, { type: "" });

    expect(nextState).toEqual(initialState);
  });

  it("setReturnUrl", () => {
    const nextState = slice.reducer(
      undefined,
      slice.actions.setReturnUrl(returnUrl)
    );

    expect(nextState).toEqual({
      ...initialState,
      returnUrl: returnUrl,
    });
  });

  it("setRestoreOk", () => {
    const nextState = slice.reducer(undefined, slice.actions.setRestoreOk());

    expect(nextState).toEqual({
      ...initialState,
      restoreOk: true,
    });
  });
});

describe("auth extraReducers", () => {
  const user = {
    name: "myname",
    email: "no@email.ru",
    };

    const refreshActionData = {
      accessToken: "accToken",
      refreshToken: "refToken",
      success: true,
      };

    const registerActionData = {
    ...refreshActionData,
    user,
    };
    
    const loginActionData = {
    ...registerActionData,
    password: "",
    };

    const error = {
      name: "Error",
      message: "error",
    };
      
  it("authRegister.fulfilled", () => {
    const action = authRegister.fulfilled(
     registerActionData,
      "auth/register",
      {
        email: "",
        name: "",
        password: "",
      }
    );
    const nextState = slice.reducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      accessToken: registerActionData.accessToken,
      refreshToken: registerActionData.refreshToken,
      user: user,
    });
  });

  it("authLogin.fulfilled", () => {
    const action = authLogin.fulfilled(
      loginActionData,
      "auth/register",
      {
        email: "",
        password: "",
      }
    );
    const nextState = slice.reducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      accessToken: loginActionData.accessToken,
      refreshToken: loginActionData.refreshToken,
      user: user,
    });
  });

  it("authRefresh.fulfilled", () => {
    const action = authRefresh.fulfilled(
      refreshActionData,
      "auth/refresh"
    );
    const nextState = slice.reducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      accessToken: refreshActionData.accessToken,
      refreshToken: refreshActionData.refreshToken,
    });
  });

  it("authLogout.fulfilled", () => {
    const action = authLogout.fulfilled(
      { success: true, message: "ok" },
      "auth/logout"
    );
    const state = {
      ...initialState,
      ...refreshActionData,
      user: user,
      status: RequestStatus.SUCCESS,
    };
    const nextState = slice.reducer(
      state,
      action,
    );
    expect(nextState).toMatchObject({
      ...INITIAL_STATE,
      success: true,
    });
  });

  it("authUser.pending", () => {
    const action = authUser.pending("auth/user");
    const nextState = slice.reducer(
      { ...INITIAL_STATE, status: RequestStatus.PENDING },
      action
    );
    expect(nextState).toMatchObject({ status: RequestStatus.PENDING });
  });

  it("authUser.fullfiled", () => {
    const action = authUser.fulfilled(
      {
        user,
        success: true,
      },
      "auth/user"
    );
    const nextState = slice.reducer(
      { ...INITIAL_STATE, status: RequestStatus.SUCCESS },
      action
    );
    expect(nextState).toMatchObject({ status: RequestStatus.SUCCESS });
  });

  it("authUser.rejected", () => {
    const action = authUser.rejected(
      error,
      "auth/user"
    );
    const nextState = slice.reducer(
          { ...INITIAL_STATE, status: RequestStatus.ERROR },
          action
        );
    expect(nextState).toMatchObject({ status: RequestStatus.ERROR });
  });

  it("authRefresh.rejected", () => {
    const action = authRefresh.rejected(
      error,
      "auth/refresh"
    );
    const nextState = slice.reducer(
      {
        ...INITIAL_STATE,
        status: RequestStatus.ERROR,
      },
      action
    );
    expect(nextState).toMatchObject({ status: RequestStatus.ERROR });
  });

  it("patchUser.fulfilled", () => {
    const action = patchUser.fulfilled({ user, success: true }, "auth/patchUser", {
      name: "",
      email: "",
      password: "",
    });
    const nextState = slice.reducer(
      {
        ...initialState,
        user: null,
      },
      action
    );
    expect(nextState).toMatchObject({
      user,
    });
  });
});
