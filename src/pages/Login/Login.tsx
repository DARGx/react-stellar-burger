import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authLogin } from '../../services/reducers/auth';
import { useLoggedIn } from '../../hooks/logged-in';
import styles from './Login.module.css';
import { useAppSelector, useAppDispatch } from '../../services/store';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const returnUrl = useAppSelector((state) => state.auth.returnUrl);

  useLoggedIn();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await dispatch(authLogin(formValue)).unwrap();
      if (res.success) {
        navigate(returnUrl || '/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Вход</p>
        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          value={formValue.email}
          onChange={onChange}
        />
        <Input
          placeholder="Пароль"
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setShowPassword(!showPassword)}
          name="password"
          value={formValue.password}
          onChange={onChange}
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>

        <div className={styles.wrapper}>
          <div className={styles.bar}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Button
              htmlType="button"
              type="secondary"
              extraClass={styles.button}
              size="medium"
              onClick={() => navigate("/register")}
            >
              Зарегистрироваться
            </Button>
          </div>
          <div className={styles.bar}>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Button
              htmlType="button"
              type="secondary"
              extraClass={styles.button}
              size="medium"
              onClick={() => navigate("/forgot-password")}
            >
              Восстановить пароль
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
