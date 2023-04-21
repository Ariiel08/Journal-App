import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0E2C40'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
});