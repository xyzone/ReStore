import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

interface Props{
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props) {
    const [checked, setChecked] = useState(false)

    function handleChange(){
        setChecked((checked) => !checked)
    
    }
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">
                    RE-Store 
                    
                    <Switch
                        checked={darkMode}
                        onChange={handleThemeChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Typography>
            </Toolbar>
        </AppBar>
    )
}