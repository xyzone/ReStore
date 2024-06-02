import { useEffect, useState } from "react"  
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header"; 
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "../util/util";
import agent from "../api/agent"; 
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/BasketSlice";
export default function App() { 
 
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const buyerId = getCookie('buyerId'); 
    if(buyerId){
      agent.Basket.get()
      .then(b=> {dispatch(setBasket(b)); console.log(b, buyerId, 'triggered set backset')})
      .catch(error => console.log(error))
      .finally(() => setLoading(false)) 
    } 
  }, [dispatch]);



  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212',
      }
    }
  });

  
  function handleThemeChange() {
    setDarkMode(() => !darkMode)
  }
  
  if(loading) return <LoadingComponent message="Initital App"></LoadingComponent>

  return (
    <ThemeProvider theme={theme} >
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"></ToastContainer>
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet></Outlet>
      </Container> 
    </ThemeProvider>
  )


} 
