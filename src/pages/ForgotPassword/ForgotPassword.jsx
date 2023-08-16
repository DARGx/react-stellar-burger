import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoggedIn } from "../../hooks/logged-in";
import { useDispatch } from "react-redux";
import { authActions } from "../../services/reducers/auth";
import styles from "./ForgotPassword.module.css";
import * as api from "../../utils/api";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  useLoggedIn();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await api.restorePassword({ email });
      if (res.success) {
        dispatch(authActions.setRestoreOk());
        navigate("/reset-password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          placeholder="Укажите e-mail"
          type="email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
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
              onClick={() => navigate("/reset-password")}
            >
              Войти
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
