import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { App } from './components/app/app';
import store from './services/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  // <React.StrictMode>
    <>
    <BrowserRouter>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </BrowserRouter>
    </>
  // </React.StrictMode>
);
