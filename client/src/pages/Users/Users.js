import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topbar/TopBar";
import UsersPanel from "../../components/UsersPanel.js/UsersPanel";

const Users = () => {
  return (
    <div className="users bg-neutral-300 h-screen w-screen relative flex">
      <Sidebar />

      <div className="main h-screen sm:w-10/12 w-screen">
        <TopBar />
        <UsersPanel />
      </div>
    </div>
  );
};

export default Users;
