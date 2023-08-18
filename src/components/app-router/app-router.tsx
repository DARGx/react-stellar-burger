import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import { MainPage } from '../../pages/Main/Main';
import { LoginPage } from '../../pages/Login/Login';
import { RegisterPage } from '../../pages/Register/Register';
import { ForgotPasswordPage } from '../../pages/ForgotPassword/ForgotPassword';
import { ResetPasswordPage } from '../../pages/ResetPassword/ResetPassword';
import { ProfilePage } from '../../pages/Profile/Profile';
import { IngredientsPage } from '../../pages/Ingredients/Ingredients';
import { NotFoundPage } from '../../pages/NotFound/NotFound';
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { IngredientModalPage } from "../../pages/IngredientModal/IngredientModal";
import { OrdersPage } from "../../pages/Orders/Orders";
import { FeedPage } from "../../pages/Feed/Feed";

export const AppRouter: FC = () => {
  const { state } = useLocation();

  const isModal = Boolean(state?.ingredientModal);
  
  return (
    <>
      <Routes>
        { isModal && <Route path="/ingredients/:id" element={
        <>
          <MainPage />
          <IngredientModalPage />
        </>}  /> }
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients/:id"  element={<ProtectedRouteElement element={<IngredientsPage />}  /> } />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}/>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile/orders" element={<OrdersPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
