import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import styles from '../app-header/app-header.module.css'
import cn from 'classnames'

export const AppHeader = () => {
  return (

    <header className={cn(styles.header, 'pt-4', 'pb-4')}>

      <nav className={cn(styles.nav)}>

        <div className={cn(styles.header__container, styles.link__container_left)}>
          <a href="/" className={cn(styles.link, styles.link_active)}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">Конструктор</span>
          </a>
          <a href="/" className={cn(styles.link, styles.link_active)}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
          </a>
        </div>

        <div className={cn(styles.header__container, styles.logo)}>
         <a href="/">
          <Logo />
         </a>
        </div>

          <div className={cn(styles.header__container, styles.header__container_right)}>
          <Link to ="/profile" className={cn(styles.link, styles.link_active)}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
              </Link>
          </div>
      </nav>
    </header>

  )
}



