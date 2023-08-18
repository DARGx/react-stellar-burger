import { FC } from 'react';
import { AppHeader } from '../app-header/app-header';
import { AppRouter } from '../app-router/app-router';

export const App: FC = () => {
  return (
    <div>
      <AppHeader />
      <AppRouter />
    </div>
  );
}

