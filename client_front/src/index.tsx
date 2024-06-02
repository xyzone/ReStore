import React from 'react'
import ReactDOM from 'react-dom/client' 
import './app/layout/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './app/router/Router.tsx'; 
// import { StoreProvider } from './app/context/StoreContext.tsx'; 
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';
import { fetchProductAsync } from './features/catalog/catalogSlice.ts';
  
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
 

root.render(
  <React.StrictMode>
    {/* <StoreProvider> */}
    {/* <App/> */}
    <Provider store={store}> 
      <RouterProvider router={myRouter} />
    </Provider>
    {/* </StoreProvider> */}
  </React.StrictMode>
);