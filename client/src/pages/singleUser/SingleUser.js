import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { request } from "../../axios";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topbar/TopBar";
import UserDetails from "../../components/UserDetails/UserDetails";
import { AuthContext } from "../../context/authContext";

const SingleUser = () => {
  const { setLoading } = useContext(AuthContext);
  const { username } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      request
        .get(`/user/${username}`)
        .then(async (res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      };
      getData();
      setLoading(false);
    });

  return (
    <div className="users bg-neutral-300 h-screen w-screen relative flex">
      <Sidebar />

      <div className="main h-screen sm:w-10/12 w-screen">
        <TopBar />
        <div className="userDetails h-7-8 sm:mb-8 sm:mr-10 my-3 mx-2 p-4 bg-white rounded-lg relative">
          <div className="text-left font-bold text-3xl flex justify-start max-h-12">
            <img
              src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.username}`}
              alt="profile url"
              className="w-8 mr-3"
            />
            <h2>{data.name}</h2>
          </div>
          <UserDetails user={data} />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
