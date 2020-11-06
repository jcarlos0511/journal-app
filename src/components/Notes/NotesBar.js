import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/auth";
import {
  hideModal,
  handleSidebar,
  showProfileModal,
} from "../../actions/modals";
import {
  ArrowDown,
  LogoutIcon,
  MenuIcon,
  NoteIcon,
  ProfileIcon,
} from "../../icons";

const NotesBar = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.modals);
  const { displayName, photoURL } = useSelector((state) => state.auth);

  const handleOpenSidebar = () => {
    dispatch(handleSidebar());
  };

  const handleShowProfileModal = () => {
    dispatch(showProfileModal());
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(hideModal());
  };

  return (
    <div className="notes__bar">
      <button className="button_rounded" onClick={handleOpenSidebar}>
        <MenuIcon />
      </button>

      <div className="notes__bar_profile">
        <img src={photoURL} alt="profile" />

        <button
          className="notes__bar_profile_btn"
          onClick={handleShowProfileModal}
        >
          <span>{displayName}</span>

          <ArrowDown />
        </button>

        {profile && (
          <div className="notes__bar_modal">
            <ul>
              <li>
                <Link to="/">
                  <ProfileIcon />
                  <span>My Profile</span>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <NoteIcon />
                  <span>My Notes</span>
                </Link>
              </li>

              <hr />

              <li>
                <button onClick={handleLogOut}>
                  <LogoutIcon />
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesBar;
