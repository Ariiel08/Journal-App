import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";

export const SidebarItem = ({title, body, note}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return (title.length > 17) 
                ? title.substring(0,17) + '...' 
                : title;
    }, [title]);

    const onNote = () => {
        dispatch(setActiveNote(note));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
            
        </ListItem>
    )
}
