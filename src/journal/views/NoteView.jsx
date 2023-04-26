import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export const NoteView = () => {

    const { activeNote } = useSelector(state => state.journal)
    const { title, body, date, onInputChange, formState } = useForm(activeNote);
    
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    return (
        <Grid 
            className="animate__animated animate__fadeIn animate__faster"
            container 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{mb: 1}}>

            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
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
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField 
                    type="text"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />

            </Grid>

            <ImageGallery />
        </Grid>
    )
}
