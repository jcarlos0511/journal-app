import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateNote, fileUpload, deleteNote } from "../../actions/notes";
import { hideModal } from "../../actions/modals";
import NotesBar from "./NotesBar";
import { MoreIcon } from "../../icons";

const relativeTime = require("dayjs/plugin/relativeTime");
// journal-app

const Notes = () => {
  const { active: note } = useSelector((state) => state.notes);

  const initialState = {
    body: note.body,
    date: note.date,
    id: note.id,
    imageURL: note.imageURL,
    title: note.title,
    updated: note.updated,
  };

  const [noteForm, setNoteForm] = useState(initialState);

  useEffect(() => {
    setNoteForm(initialState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.title, note.body, note.imageURL, note.updated]);

  const { body, date, imageURL, updated, title } = noteForm;

  const dispatch = useDispatch();

  const handleUpdateNote = (updatedNote) =>
    dispatch(updateNote(note.id, updatedNote));

  const handleDeleteNote = () => dispatch(deleteNote(note.id));

  const handleChangeText = ({ target }) => {
    setNoteForm({ ...noteForm, [target.name]: target.value });
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      // test noteForm
      dispatch(fileUpload(file, noteForm));
    }
  };

  const handleChooseFile = () => {
    document.querySelector("#file").click();
  };

  const dayFormatted = dayjs(date).format("DD");
  const monthFormatted = dayjs(date).format("MMM");

  dayjs.extend(relativeTime);

  const lastUpdated = dayjs().to(dayjs(updated));

  return (
    <div className="notes__container">
      <NotesBar />

      <div onClick={() => dispatch(hideModal())} className="notes__content">
        <div className="notes__card">
          {imageURL && (
            <div className="notes__image">
              <img src={imageURL} alt={title} />
            </div>
          )}

          <div className="notes__date">
            <span>{dayFormatted}</span>
            <span>{monthFormatted}</span>
          </div>

          <div className="notes__modal">
            <button className="big_button_rounded">
              <MoreIcon />
            </button>

            <ul>
              <li>
                <button onClick={handleDeleteNote}>Delete note</button>
              </li>
            </ul>
          </div>

          <div className="notes__card_content">
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChangeText}
              className="notes__input_title"
              placeholder="Add amazing title"
            />

            <textarea
              id=""
              cols="30"
              rows="4"
              name="body"
              value={body}
              onChange={handleChangeText}
              className="notes__textarea_desc"
              placeholder="What happened today?"
            />

            <input
              id="file"
              name="file"
              type="file"
              onChange={handleChangeFile}
              style={{ display: "none" }}
            />

            <button onClick={handleChooseFile}>Choose a file</button>

            {updated ? <span>{lastUpdated}</span> : <span>"-"</span>}

            <button
              onClick={() =>
                handleUpdateNote({
                  body,
                  date,
                  imageURL,
                  title,
                  updated: new Date().getTime(),
                })
              }
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
