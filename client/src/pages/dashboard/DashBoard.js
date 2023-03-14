import React from "react";
import CardPanel from "../../components/cardpanel/CardPanel";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topbar/TopBar";
import "./dashboard.scss";

const DashBoard = () => {
  return (
    <div className="dashboard bg-neutral-300 h-screen w-screen relative flex">
      <Sidebar />

      <div className="main h-screen sm:w-10/12 w-screen">
        <TopBar />
        <CardPanel />
      </div>
    </div>
  );
};

export default DashBoard;
