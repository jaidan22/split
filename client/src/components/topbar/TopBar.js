import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./topbar.scss";

const TopBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="topbar flex sm:flex-row flex-col sm:justify-between sm:items-center justify-start sm:h-1-8 bg-white w-auto sm:mt-8 sm:mb-6 sm:mr-10 my-3 mx-2 rounded-lg  py-3">
      <div className="profile h-full flex items-center ml-8 font-sans">
        <img
          src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg"
          alt="profile image"
          className="h-10 rounded-xl"
        />
        <div className="details flex flex-col items-start ml-3">
          <span className="name font-semibold text-base">
            {currentUser.name}
          </span>
          <span className="username text-sm text-gray-600">
            {currentUser.username}
          </span>
        </div>
      </div>

      <input
        type="text"
        name="search"
        placeholder="Search"
        autoFocus="true"
        className="search bg-gray-100 px-4 py-2 rounded-2xl border-0 sm:mr-4 sm:my-0 sm:mx-0 sm:ml-0 ml-4 my-2 mx-2 outline-none grow"
      />
    </div>
  );
};

export default TopBar;
