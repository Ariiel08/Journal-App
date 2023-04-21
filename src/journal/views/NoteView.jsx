import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NoteView = () => {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 1}}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">October 19th, 2023</Typography>
            </Grid>

            <Grid item>
                <Button color="primary" sx={{p: 2}}>
                    <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    fullWidth
                    placeholder="Insert a title"
                    label="Title"
                    sx={{mb: 1}}
                />

                <TextField 
                    type="text"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                />

            </Grid>

            <ImageGallery />
        </Grid>
    )
}
