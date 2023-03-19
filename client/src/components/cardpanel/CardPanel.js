import { request } from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import ListPopUp from "../listPopUp/listPopUp";
import "./cardpanel.scss";
import OptimisedSettle from "./OptimisedSettle";

const CardPanel = () => {
  const { currentUser, loading, setLoading, logout } = useContext(AuthContext);
  const [lended, showLended] = useState(false);
  const [borrowed, showBorrowed] = useState(false);
  const [lendedData, setLendedData] = useState([]);
  const [borrowedData, setBorrowedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      request
        .get(`${process.env.REACT_APP_API_URL}/lended`)
        .then((res) => {
          setLendedData(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          // if (err.response.status == 401) logout();
        });
      request
        .get(`/owed`)
        .then((res) => {
          setBorrowedData(res.data);
          // console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // if (err.response.status == 401) logout();
          setLoading(false);
        });
    };
    getData();
  }, []);

  return (
    <div className="cardpanel h-7-8 sm:mb-8 sm:mr-10 my-3 mx-2 p-4 bg-white rounded-lg overflow-y-scroll">
      <h2 className="text-left font-bold text-3xl">Dashboard</h2>

      <ListPopUp
        title="To Recieve"
        open={showLended}
        active={lended}
        data={lendedData.debts}
        type={0} // for lended
      />
      <ListPopUp
        title="To Pay"
        open={showBorrowed}
        active={borrowed}
        data={borrowedData.debts}
        type={1} // for borrowed
      />

      <div className="summary flex sm:flex-row flex-col w-full items-center justify-evenly py-8 sm:mx-0 m-auto gap-4">
        <div
          className="lended hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-48 p-4 h-32 w-52 bg-green-100 rounded-lg"
          onClick={() => showLended(true)}
        >
          <span className="title font-bold text-lg text-green-800">
            Total Lended
          </span>
          <span className="amt text-green-800 text-5xl mt-4">
            {lendedData.total}
          </span>
        </div>

        <div
          className="borrowed hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-48 p-4 h-32 w-52 bg-red-200 rounded-lg"
          onClick={() => showBorrowed(true)}
        >
          <span className="title text-lg font-bold text-red-800">
            Total Borrowed
          </span>
          <span className="amt text-red-800 text-5xl mt-4">
            {borrowedData.total}
          </span>
        </div>
      </div>

      <OptimisedSettle />
    </div>
  );
};

export default CardPanel;
