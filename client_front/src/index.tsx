import React from 'react'
import ReactDOM from 'react-dom/client' 
import './app/layout/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './app/router/Router.tsx'; 
import App from './app/layout/App.tsx';
 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App/> */}
    <RouterProvider router={myRouter} />
  </React.StrictMode>
);