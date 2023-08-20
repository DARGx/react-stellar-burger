import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { authUser, patchUser } from "../../services/reducers/auth";
import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { IFormProps } from "../../types/form";
import { ProfileNav } from "../../components/profile-nav/profile-nav";
import styles from "./Profile.module.css";
import cn from "classnames";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [formValue, setFormValue] = useState<IFormProps>({
    name: "",
    email: "",
    password: "",
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValue((formValue) => ({
        ...formValue,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user, setFormValue]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const onCancel = async () => {
    setIsDirty(false);

    try {
      const res = await dispatch(authUser()).unwrap();
      if (res.success) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("User info cancel error", error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
    setIsDirty(true);
  };

  return (
    <div className={cn(styles.main_container, "pt-30")}>
      <ProfileNav />

      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          placeholder="Имя"
          type="text"
          icon={"EditIcon"}
          name="name"
          value={formValue.name}
          onChange={onChange}
        />
        <Input
          placeholder="Логин"
          type="email"
          icon={"EditIcon"}
          name="email"
          value={formValue.email}
          onChange={onChange}
        />
        <Input
          placeholder="Пароль"
          type="password"
          icon={"EditIcon"}
          name="password"
          value={formValue.password}
          onChange={onChange}
        />

        <div className={styles.button_container}>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>

          <Button
            htmlType="reset"
            type="secondary"
            size="medium"
            extraClass={styles.button}
            onClick={onCancel}
            disabled={!isDirty}
          >
            Отмена
          </Button>
        </div>
      </form>

      <div className={cn(styles.menu, "ml-15")}></div>
    </div>
  );
};
