import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../hooks/logged-in";
import { useSelector } from "react-redux";
import styles from "./ResetPassword.module.css";
import * as api from "../../utils/api";
import { AppState } from '../../services/store';

export const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const { restoreOk } = useSelector((state: AppState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useLoggedIn();

  if (!restoreOk) {
    return <Navigate to="/forgot-password" replace />
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await api.resetPassword({ password, token });

      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getValue = (event: React.SyntheticEvent) => (event.target as HTMLInputElement).value;

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
         <Input
          placeholder="Введите новый пароль"
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? 'HideIcon' : "ShowIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          name="password"
          value={password}
          onChange={(e) => setPassword(getValue(e))}
        />
        <Input
          placeholder="Введите код из письма"
          type="text"
          value={token}
          onChange={(e) => setToken(getValue(e))}
        />
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>

        <div className={styles.wrapper}>
          <div className={styles.bar}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
            </p>
            <Button
              htmlType="button"
              type="secondary"
              extraClass={styles.button}
              size="medium"
              onClick={() => navigate("/login")}
            >
              Войти
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
