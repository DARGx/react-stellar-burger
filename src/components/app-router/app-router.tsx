import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import { MainPage } from '../../pages/Main/Main';
import { LoginPage } from '../../pages/Login/Login';
import { RegisterPage } from '../../pages/Register/Register';
import { ForgotPasswordPage } from '../../pages/ForgotPassword/ForgotPassword';
import { ResetPasswordPage } from '../../pages/ResetPassword/ResetPassword';
import { ProfilePage } from '../../pages/Profile/Profile';
import { IngredientsPage } from '../../pages/Ingredients/Ingredients';
import { NotFoundPage } from '../../pages/NotFound/NotFound';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { IngredientModalPage } from '../../pages/IngredientModal/IngredientModal';
import { OrdersHistoryPage } from '../../pages/OrdersHistory/OrdersHistory';
import { FeedPage } from '../../pages/Feed/Feed';
import { OrderDetailPage } from '../../pages/OrderDetail/OrderDetail';
import { FeedDetailPage } from '../../pages/FeedDetail/FeedDetail';
import { FeedModalPage } from '../../pages/FeedModalPage/FeedModalPage';
import { OrderModalPage } from '../../pages/OrderModalPage/OrderModalPage';

export const AppRouter: FC = () => {
  const { state } = useLocation();

  const isIngredientModal = Boolean(state?.ingredientModal);
  const isFeedModal = Boolean(state?.feedModal);
  const isOrderModal = Boolean(state?.orderModal);
  
  return (
    <>
      <Routes>
        { isIngredientModal && <Route path="/ingredients/:id" element={
        <>
          <MainPage />
          <IngredientModalPage />
        </>}  /> }
        { isFeedModal && <Route path="/feed/:id" element={
          <>
            <FeedPage />
            <FeedModalPage />
          </>
        }
        /> }
        { isOrderModal && <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={
          <>
            <OrdersHistoryPage/>
            <OrderModalPage />
          </>
        } /> } /> }
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients/:id" element={<IngredientsPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}/>
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersHistoryPage/> } />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<OrderDetailPage /> } />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
