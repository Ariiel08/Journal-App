import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from "../../store/auth";

export const Navbar = ({sidebarWidth}) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar 
            position="fixed"
            sx={{
                width: {sm: `calc(100% - ${sidebarWidth}px)`},
                ml: {sm: `${sidebarWidth}`}
            }}
            variant="dense"
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{mr: 2, display: {sm: 'none'}}}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction="row" justifyContent='center' alignItems="center" sx={{ml: 15}}>
                    <Typography variant="h6" component="div">JournalApp</Typography>
                </Grid>

                <Grid container justifyContent="end" direction="row" alignItems="center" flexBasis={0}>
                    <Button onClick={onLogout} variant="contained" color="secondary">
                        <Typography sx={{fontSize: 14, mr: 1}}>Logout</Typography>
                        <LogoutOutlined sx={{fontSize: 20}} />
                    </Button>
                </Grid>
            </Toolbar>

        </AppBar>
    )
}
