import { useEffect, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Category } from '../category/category';
import { throttle } from 'throttle-debounce';
import styles from './burger-ingredients.module.css';
import cn from 'classnames';
import { useIngredients } from '../../hooks/ingredients';

export const BurgerIngredients = () => {
  const { ingredients } = useIngredients();
  const [current, setCurrent] = useState('buns');
  const containerRef = useRef();
  const bunRef = useRef();
  const mainRef = useRef();
  const sauceRef = useRef();

  const buns = ingredients.filter((item) => item.type === 'bun');
  const main = ingredients.filter((item) => item.type === 'main');
  const sauce = ingredients.filter((item) => item.type === 'sauce');

  function handleClickTab(tab) {
    setCurrent(tab);
    const title = document.getElementById(tab);
    if (title) title.scrollIntoView({ behavior: 'smooth' });
  }

  const getCoords = (ref) => ref.current.getBoundingClientRect();


  useEffect(() => {

    const scrollHandler =
      throttle(250, () => {
        const containerRect = getCoords(containerRef);
        const bunRect = getCoords(bunRef);
        const sauceRect = getCoords(sauceRef);
        const mainRect = getCoords(mainRef);

        const deltas = [bunRect, mainRect, sauceRect].map((rect) => Math.abs(containerRect.top - rect.top));

        const min = Math.min(...deltas);
        const index = deltas.indexOf(min);
        const tab = ['buns', 'main', 'sauce'][index];
        setCurrent(tab);
      })

    const unscrollElement = containerRef.current;
    unscrollElement.addEventListener(
      'scroll', scrollHandler
    );
    return () => {
      unscrollElement.removeEventListener('scroll', scrollHandler)
    }
  }, []);

  return (
    <section className={styles.ingredients}>
      <div className={cn(styles.menu, 'mb-10')}>
        <Tab value='buns' active={current === 'buns'} onClick={handleClickTab}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={handleClickTab}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={handleClickTab}>
          Начинки
        </Tab>
      </div>
      <section ref={containerRef} className={cn(styles.container, 'custom-scroll')}>
        <Category title='Булки' id='buns' ingredients={buns} headerRef={bunRef} />
        <Category title='Соусы' id='sauce' ingredients={sauce} headerRef={sauceRef} />
        <Category title='Начинки' id='main' ingredients={main} headerRef={mainRef} />
      </section>
    </section>
  );
};

export default BurgerIngredients;

