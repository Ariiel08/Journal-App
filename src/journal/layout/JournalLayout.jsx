import { Box, Toolbar } from "@mui/material"
import { Navbar, Sidebar } from "../components";

const sidebarWidth = 240;

export const JournalLayout = ({children}) => {
    return (
        <Box sx={{display: 'flex'}}>

            <Navbar sidebarWidth={ sidebarWidth } />
            <Sidebar sidebarWidth={ sidebarWidth } />

            <Box 
                component='main'
                sx={{flexGrow: 1, p: 3}}
            >
                <Toolbar />

                {children}

            </Box>
        </Box>
    )
}
