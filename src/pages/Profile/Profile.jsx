import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, authUser, patchUser } from "../../services/reducers/auth";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import cn from "classnames";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDissabled] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValue({
        ...formValue,
        name: user.name,
        email: user.email,
      });
    }
  }, [user, setFormValue]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await dispatch(patchUser(formValue)).unwrap();
      if (res.success) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("User info update error", error);
    }
  };

  const onCancel = async (event) => {
    setIsButtonDissabled(true);
    try {
      const res = await dispatch(authUser(formValue)).unwrap();
      if (res.success) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("User info cancel error", error);
    }
  };

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

  const onChange = (event) => {
    const name = event.target.name;

    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  const onOrderPage = async () => {
     navigate("/orders")
  };

  return (
    <div className={cn(styles.main_container, "pt-30")}>
      <nav className={cn(styles.menu, "mr-15")}>
        <Link to="/profile" className={cn(styles.link, styles.link_active)}>
          <span
            className={cn(styles.text_container, "text text_type_main-medium")}
          >
            Профиль
          </span>
        </Link>

        <Link
          to="/profile/orders"
          onClick={onOrderPage}
          className={cn(
            styles.link,
            styles.link_inactive,
            "text text_type_main-medium text_color_inactive"
          )}
        >
          <span
            className={cn(styles.text_container, "text text_type_main-medium")}
          >
            История заказов
          </span>
        </Link>

        <Link
          to=""
          onClick={onLogout}
          className={cn(
            styles.link,
            styles.link_inactive,
            "text text_type_main-medium text_color_inactive mb-20"
          )}
        >
          <span
            className={cn(styles.text_container, "text text_type_main-medium")}
          >
            Выход
          </span>
        </Link>

        <p className={cn("text text_type_main-default text_color_inactive")}>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </nav>

      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          placeholder="Имя"
          type="text"
          icon={"EditIcon"}
          name="name"
          value={formValue.name}
          onInput={onChange}
        />
        <Input
          placeholder="Логин"
          type="email"
          icon={"EditIcon"}
          name="email"
          value={formValue.email}
          onInput={onChange}
        />
        <Input
          placeholder="Пароль"
          type="password"
          icon={"EditIcon"}
          name="password"
          value={formValue.password}
          onInput={onChange}
        />

        <div className={styles.button_container}>
          <Button 
            htmlType="submit" 
            type="primary" 
            size="medium"
          >
            Сохранить
          </Button>

          <Button
            htmlType="reset"
            type="secondary"
            size="medium"
            extraClass={styles.button}
            onClick={onCancel}
            disabled={isButtonDisabled}
          >
            Отмена
          </Button>
        </div>
      </form>

      <div className={cn(styles.menu, "ml-15")}></div>
    </div>
  );
};
