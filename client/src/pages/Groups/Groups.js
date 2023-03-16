import React from "react";
import GroupPanel from "../../components/GroupPanel/GroupPanel";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topbar/TopBar";

const Groups = () => {
  return (
    <div className="groups bg-neutral-300 h-screen w-screen relative flex">
      <Sidebar />

      <div className="main h-screen sm:w-10/12 w-screen">
        <TopBar />
        <GroupPanel />
      </div>
    </div>
  );
};

export default Groups;
