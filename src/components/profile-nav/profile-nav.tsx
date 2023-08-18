import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authLogout } from '../../services/reducers/auth';
import { useAppDispatch } from '../../services/store';
import styles from './profile-nav.module.css';
import cn from 'classnames';

export const ProfileNav: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const res = await dispatch(authLogout()).unwrap();
      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNavClasses = (...classes: cn.ArgumentArray) => ({
    isActive,
  }: {
    isActive: boolean;
  }) => {
    const activeClass = isActive ? styles.active : "";

    return cn(...classes, activeClass);
  };

  return (
    <nav className={cn(styles.menu, "mr-15")}>
      <NavLink to="/profile" className={getNavClasses(styles.link)} end>
        <span
          className={cn(styles.text_container, "text text_type_main-medium")}
        >
          Профиль
        </span>
      </NavLink>

      <NavLink
        to="/profile/orders"
        className={getNavClasses(
          styles.link,
          "text text_type_main-medium text_color_inactive"
        )}
      >
        <span
          className={cn(styles.text_container, "text text_type_main-medium")}
        >
          История заказов
        </span>
      </NavLink>

      <span
        className={cn(styles.text_container, "text text_type_main-medium text_color_inactive mb-20")}
        onClick={onLogout}
      >
        Выход
      </span>

      <p className={cn("text text_type_main-default text_color_inactive")}>
        В этом разделе вы можете
        <br />
        изменить свои персональные данные
      </p>
    </nav>
  );
};
