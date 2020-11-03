import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getNote } from "../../actions/notes";

const Entry = ({ body, date, id, title, imageURL }) => {
  const dateFormatted = dayjs(date).format("ddd, DD MMM.");
  const hourFormatted = dayjs(date).format("HH:mm:ss");

  const dispatch = useDispatch();

  const handleActiveNote = () => {
    dispatch(getNote(id));
  };

  return (
    <div className="main__entry" onClick={handleActiveNote}>
      {imageURL && (
        <div
          className="main__entry_picture"
          style={{
            backgroundImage: `url(${imageURL})`,
          }}
        ></div>
      )}

      <div className="main__entry_content">
        <h3 className="main__entry_title">{title}</h3>
        <p className="main__entry_description">{body}</p>
      </div>

      <div className="main__entry_date">
        <p>
          <span>{dateFormatted}</span> {hourFormatted}
        </p>
      </div>
    </div>
  );
};

export default Entry;
