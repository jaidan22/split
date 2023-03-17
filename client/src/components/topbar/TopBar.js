import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import SearchBar from "../searchBar/SearchBar";
import "./topbar.scss";

const TopBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="topbar flex sm:flex-row flex-col sm:justify-between sm:items-center justify-start sm:h-1-8 bg-white w-auto sm:mt-8 sm:mb-6 sm:mr-10 my-3 mx-2 rounded-lg  py-3">
      <div className="profile h-full flex items-center ml-8 font-sans">
        <img
          src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${currentUser.username}`}
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

      <SearchBar/>
    </div>
  );
};

export default TopBar;
