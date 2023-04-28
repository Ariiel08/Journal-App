import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline, Note, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { useForm } from "../../hooks/useForm";
import { useToast } from "../../hooks/useToast";
import { ImageGallery } from "../components"
import { Toast } from "../../ui";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

export const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNote, isSaving } = useSelector(state => state.journal)
    const { title, body, date, onInputChange, formState } = useForm(activeNote);
    const { isActive, setIsActive, handleClose } = useToast();

    
    const formattedDate = useMemo(() => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat("en-EN", { dateStyle: "full" }).format(newDate);;
        
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    const fileInputRef = useRef();

    const onSaveNote = () => {
        setIsActive(true);
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid 
            className="animate__animated animate__fadeIn animate__faster"
            container 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{mb: 1}}>

            <Grid item>
                <Typography fontSize={39} fontWeight="light">{formattedDate}</Typography>
            </Grid>

            

            <Grid item>

                <input 
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    onClick={onSaveNote}
                    color="primary" sx={{p: 2}}
                >
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

            <Toast 
                isActive={isActive} 
                handleClose={handleClose}
                title={`"${title}" updated`}
                subtitle={"Your changes has been saved"}
            />

            <Grid container justifyContent="end">
                <Button
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color="error"
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>

            <ImageGallery images={activeNote.imageUrls}/>
        </Grid>
    )
}
