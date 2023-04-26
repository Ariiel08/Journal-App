import { LibraryAdd, PostAdd } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';

export const NothingSelectedView = () => {
    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'grey.main', borderRadius: 3}}
        >
            <Grid item xs={12}>
                <PostAdd sx={{fontSize: 70, color: 'secondary.main'}} />
            </Grid>

            <Grid item xs={12}>
                <Typography color="secondary.main" variant="h6">Select or create an entry</Typography>
            </Grid>

        </Grid>
    )
}
