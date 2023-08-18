import { FC, useEffect } from 'react';
import { fetchIngredients } from '../../services/reducers/ingredients';
import { useAppDispatch } from '../../services/store';
import { AppHeader } from '../app-header/app-header';
import { AppRouter } from '../app-router/app-router';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <AppRouter />
    </>
  );
}

