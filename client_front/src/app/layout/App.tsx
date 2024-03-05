import { useEffect, useState } from "react"  
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header"; 
import { Outlet } from "react-router";
import Catalog from "../../features/catalog/Catalog";
 
export default function App() {
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
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet></Outlet>
      </Container> 
    </ThemeProvider>
  )


} 
