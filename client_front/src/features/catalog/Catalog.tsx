import { Fragment, useEffect } from "react"
 
import ProductList from "./ProductList"; 
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilter, fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() { 
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch(); 
  const {productsLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog);

  useEffect(() => {
    if(!productsLoaded)dispatch(fetchProductsAsync()); 
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if(!filtersLoaded) dispatch(fetchFilter());
  }, [dispatch, filtersLoaded])
  

  if(status.includes('pending')) return <LoadingComponent message="Loading products"></LoadingComponent>
  return (
  
    <Fragment>
      <ProductList products={products} />
      
    </Fragment>
  )
}