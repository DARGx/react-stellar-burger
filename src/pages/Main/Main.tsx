import { FC } from 'react';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import styles from './Main.module.css';
import cn from 'classnames';

export const MainPage: FC = () => {
  return (
    <div className={cn(styles.app)}>
      <h1 className={cn(styles.title, "text text_type_main-large mt-10 mb-5")}>
        Соберите бургер
      </h1>
      <main className={cn(styles.main, "pb-10")}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};
