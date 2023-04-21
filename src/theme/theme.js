import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#19376D'
        },
        secondary: {
            main: '#0B2447'
        },
        grey: {
            main: grey[300]
        },
        error: {
            main: red.A400
        }
    }
});