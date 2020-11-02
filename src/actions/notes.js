import { db } from "../firebase/firebasConfig";
import { ACTIVE_NOTE, LOADING_NOTES } from "../types";

const activeNote = (id, note) => ({
  type: ACTIVE_NOTE,
  payload: { id, ...note },
});

export const addNote = () => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docReference = await db
      .collection(`${uid}/journal/notes`)
      .add(newNote);

    dispatch(activeNote(docReference.id, newNote));
  } catch (error) {
    console.log(error);
  }
};

const getNotes = async (uid) => {
  try {
    const querySnapshot = await db.collection(`${uid}/journal/notes`).get();

    const notes = [];

    querySnapshot.forEach((note) => {
      notes.push({ id: note.id, ...note.data() });
    });

    return notes;
  } catch (error) {
    console.log(error);
  }
};

const loadedNotes = (notes) => ({ type: LOADING_NOTES, payload: notes });

export const loadingNotes = (uid) => async (dispatch) => {
  const notes = await getNotes(uid);

  dispatch(loadedNotes(notes));
};
