import { Fragment, useEffect } from "react"
 
import ProductList from "./ProductList"; 
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() { 
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch(); 
  const {productsLoaded, status} = useAppSelector(state => state.catalog);

  useEffect(() => {
    if(!productsLoaded)dispatch(fetchProductsAsync());
  }, [productsLoaded])

  

  if(status.includes('pending')) return <LoadingComponent message="Loading products"></LoadingComponent>
  return (
  
    <Fragment>
      <ProductList products={products} />
      
    </Fragment>
  )
}