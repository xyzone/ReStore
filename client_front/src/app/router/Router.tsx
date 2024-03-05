import { createBrowserRouter } from "react-router-dom";

import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import { ContactPage } from "@mui/icons-material";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";


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
        ]
    }
])