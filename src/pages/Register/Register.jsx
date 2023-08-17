import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authRegister } from "../../services/reducers/auth";
import { useDispatch } from "react-redux";
import { useLoggedIn } from "../../hooks/logged-in";
import styles from "./Register.module.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const[showPassword, setShowPassword] = useState(false);

  useLoggedIn();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await dispatch(authRegister(formValue)).unwrap();
      if (res.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Register error', error);
    }
  };

  const onChange = (event) => {
    const name = event.target.name;

    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          placeholder="Имя"
          type="text"
          name="name"
          value={formValue.name}
          onInput={onChange}
        />
        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          value={formValue.email}
          onInput={onChange}
        />
        <Input
          placeholder="Пароль"
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? 'HideIcon' : "ShowIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          name="password"
          value={formValue.password}
          onInput={onChange}
        />
        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
        </Button>

        <div className={styles.bar}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
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
      </form>
    </div>
  );
};
