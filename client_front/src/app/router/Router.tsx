import { Navigate, createBrowserRouter } from "react-router-dom";

import HomePage from "../../features/home/HomePage";
import App from "../layout/App"; 
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";


export const myRouter = createBrowserRouter([
 
    {
        path: '/',
        element: <App/>,
        children: [
            { path: '', element: <HomePage></HomePage>},
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:pid', element: <ProductDetail /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'basket', element: <BasketPage></BasketPage> },
            { path: 'checkout', element: <CheckoutPage></CheckoutPage> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
])