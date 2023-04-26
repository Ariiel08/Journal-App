import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startAddNote } from "../../store/journal/thunks"

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, activeNote } = useSelector(state => state.journal);

  const onAddNote = () => {
    dispatch(startAddNote());
  }

  return (
    <JournalLayout>

      {
        (!!activeNote) ? <NoteView /> : <NothingSelectedView />
      }

      <IconButton
        onClick={onAddNote}
        size="large"
        disabled={isSaving}
        sx={{
          color: "white",
          backgroundColor: "primary.main",
          ':hover': {backgroundColor: 'secondary.main'},
          position: "fixed",
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </JournalLayout>
  )
}
