import { useEffect, useState, useRef, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Category } from "../category/category";
import { throttle } from "throttle-debounce";
import { useIngredients } from "../../hooks/ingredients";
import { IngredientType } from "../../types/ingredient";
import styles from "./burger-ingredients.module.css";
import cn from "classnames";

export const BurgerIngredients: FC = () => {
  const { ingredients } = useIngredients();
  const [current, setCurrent] = useState(IngredientType.BUN);
  const containerRef = useRef<HTMLElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);

  const buns = ingredients.filter((item) => item.type === IngredientType.BUN);
  const main = ingredients.filter((item) => item.type === IngredientType.MAIN);
  const sauce = ingredients.filter(
    (item) => item.type === IngredientType.SAUCE
  );

  function handleClickTab(tab: string) {
    setCurrent(tab as IngredientType);
    const title = document.getElementById(tab);
    if (title) {
      title.scrollIntoView({ behavior: "smooth" });
    }
  }

  const getCoords = (ref: React.RefObject<HTMLElement>) =>
    ref.current!.getBoundingClientRect();

  useEffect(() => {
    const scrollHandler = throttle(250, () => {
      const containerRect = getCoords(containerRef);
      const bunRect = getCoords(bunRef);
      const sauceRect = getCoords(sauceRef);
      const mainRect = getCoords(mainRef);

      const deltas = [bunRect, mainRect, sauceRect].map((rect) =>
        Math.abs(containerRect.top - rect.top)
      );

      const min = Math.min(...deltas);
      const index = deltas.indexOf(min);
      const tabs = Object.values(IngredientType);
      const tab = tabs[index];
      setCurrent(tab);
    });

    const unscrollElement = containerRef.current!;
    unscrollElement.addEventListener("scroll", scrollHandler);

    return () => {
      scrollHandler?.cancel();
      unscrollElement.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <section className={styles.ingredients}>
      <div className={cn(styles.menu, "mb-10")}>
        <Tab
          value={IngredientType.BUN}
          active={current === IngredientType.BUN}
          onClick={handleClickTab}
        >
          Булки
        </Tab>
        <Tab
          value={IngredientType.SAUCE}
          active={current === IngredientType.SAUCE}
          onClick={handleClickTab}
        >
          Соусы
        </Tab>
        <Tab
          value={IngredientType.MAIN}
          active={current === IngredientType.MAIN}
          onClick={handleClickTab}
        >
          Начинки
        </Tab>
      </div>
      <section
        ref={containerRef}
        className={cn(styles.container, "custom-scroll")}
      >
        <Category
          title="Булки"
          id={IngredientType.BUN}
          ingredients={buns}
          headerRef={bunRef}
        />
        <Category
          title="Соусы"
          id={IngredientType.SAUCE}
          ingredients={sauce}
          headerRef={sauceRef}
        />
        <Category
          title="Начинки"
          id={IngredientType.MAIN}
          ingredients={main}
          headerRef={mainRef}
        />
      </section>
    </section>
  );
};

export default BurgerIngredients;
