import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";
import GroupsIcon from "@mui/icons-material/Groups";
import HelpIcon from "@mui/icons-material/Help";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const [sideBar, setSideBar] = useState(false);

  const toggle = () => {
    setSideBar(!sideBar);
  };

  return (
    <>
      {/* NAV SANDWICH */}

      <div
        id="menu-toggle-wrapper"
        onClick={toggle}
        className={sideBar ? "block sm:hidden active" : "block sm:hidden"}
      >
        <div id="menu-toggle"></div>
      </div>

      {/* backgoround while sandwich is active */}
      <div className={`bg active-${sideBar}`}></div>
      <div
        className={`sidebar bg-white sm:my-8 mx-10 sm:w-2/12 block rounded-lg px-2 sm:relative absolute active-${sideBar}`}
      >
        <div className="heading px-3 py-4 pt-8">
          <h1 className="font-extrabold text-4xl text-left flex items-center ">
            <HorizontalSplitIcon className="mr-2" /> split
          </h1>
        </div>
        <nav className="flex flex-col sm:justify-center">
          <a href="/" className=" hover:text-slate-900">
            <div className="navLink flex rounded-lg px-3 py-2 w-full hover:bg-slate-100 hover:text-slate-900 items-center">
              <HomeIcon />
              <span className="ml-2 text-slate-700 font-medium">Home</span>
            </div>
          </a>

          <a href="/users" className=" hover:text-slate-900">
            <div className="navLink flex rounded-lg px-3 py-2 w-full hover:bg-slate-100 hover:text-slate-900 items-center">
              <PeopleIcon />
              <span className="ml-2 text-slate-700 font-medium">Users</span>
            </div>
          </a>

          <a href="/groups" className=" hover:text-slate-900">
            <div className="navLink flex rounded-lg px-3 py-2 w-full hover:bg-slate-100 hover:text-slate-900 items-center">
              <GroupsIcon />
              <span className="ml-2 text-slate-700 font-medium">Groups</span>
            </div>
          </a>
        </nav>

        <div className="lower absolute bottom-12 left-0 w-full">
          <button className="hover:text-slate-900 w-full" onClick={logout}>
            <div className="navLink flex rounded-lg px-4 py-2 w-full hover:bg-slate-100 hover:text-slate-900 items-center">
              <LogoutIcon />
              <span className="ml-2 text-slate-700 font-medium ">Log Out</span>
            </div>
          </button>

          <a href="/help" className=" hover:text-slate-900">
            <div className="navLink flex rounded-lg px-4 py-2 w-full hover:bg-slate-100 hover:text-slate-900 items-center">
              <HelpIcon />
              <span className="ml-2 text-slate-700 font-medium">Help</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
