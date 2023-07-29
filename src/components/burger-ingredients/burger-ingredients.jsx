import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Category } from '../category/category';
import PropTypes from 'prop-types'
import ingredientPropTypes from '../../utils/prop-types';
import styles from './burger-ingredients.module.css'
import cn from 'classnames';


export const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState('buns');

  const buns = ingredients.filter(item => item.type === 'bun');
  const main = ingredients.filter(item => item.type === 'main');
  const sauce = ingredients.filter(item => item.type === 'sauce');

  function handleClickTab(tab) {
    setCurrent(tab);
    const title = document.getElementById(tab);
    if (title) title.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={styles.ingredients}>
      <div className={cn(styles.menu, 'mb-10')}>
        <Tab value="buns" active={current === 'buns'} onClick={handleClickTab}>
          Булки
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={handleClickTab}>
          Соусы
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleClickTab}>
          Начинки
        </Tab>
      </div>
      <section className={cn(styles.container, 'custom-scroll')}>
        <Category
          title="Булки"
          id="buns"
          ingredients={buns}
        />
        <Category
          title="Начинки"
          id="main"
          ingredients={main}
        />
        <Category
          title="Соусы"
          id="sauce"
          ingredients={sauce}
        />
      </section>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default BurgerIngredients;

