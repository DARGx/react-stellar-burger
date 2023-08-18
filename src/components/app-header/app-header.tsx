import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from "react-router-dom";
import { FC } from 'react'
import styles from '../app-header/app-header.module.css';
import cn from 'classnames';


interface IAppHeaderProps {}

export const AppHeader: FC<IAppHeaderProps> = () => {
  const location = useLocation();
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  }

  return (
    <header className={cn(styles.header, 'pt-4 pb-4')}>
      <nav className={cn(styles.nav)}>
        <div className={cn(styles.header__container, styles.link__container_left)}>
          <NavLink to="/" className={styles.link}>
            <BurgerIcon type={isActive('/') ? 'primary' : 'secondary'} />
            <span className={cn(
              'text text_type_main-default ml-2',
              isActive('/') && styles.link_active,
            )}>Конструктор</span>
          </NavLink>
          <NavLink to="/feed" className={styles.link}>
            <ListIcon type={isActive('/feed') ? 'primary' : 'secondary'} />
            <span className={cn(
             'text text_type_main-default ml-2',
              isActive('/feed') && styles.link_active,
            )}>Лента заказов</span>
          </NavLink>
        </div>

        <div className={cn(styles.header__container, styles.logo)}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        <div className={cn(styles.header__container, styles.header__container_right)}>
          <NavLink to="/profile" className={styles.link}>
            <ProfileIcon type={isActive('/profile') ? 'primary' : 'secondary'} />
            <span className={cn(
              'text text_type_main-default ml-2',
              isActive('/profile') && styles.link_active,
            )}>Личный кабинет</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader;



