import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { request } from "../../axios";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topbar/TopBar";
import UserDetails from "../../components/UserDetails/UserDetails";
import { AuthContext } from "../../context/authContext";
import "./singleuser.scss";

const SingleUser = () => {
  const { setLoading, currentUser } = useContext(AuthContext);
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [transactoinData, setTransactions] = useState();

  const settleAll = async () => {
    try {
      await request.put(`/debts/settleAll/${data.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  const newPayment = async () => {
    setOpen(false);
    // setLoading(true);
    try {
      await request.post("/debts", {
        lender: currentUser.username,
        borrower: username,
        amount,
      });
      // setLoading(false);
      window.location.reload();
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
    // console.log(amount);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      request
        .get(`/user/${username}`)
        .then((res) => {
          setData(res.data);
          return res.data;
        })
        .then((data) => request.get(`/debts/bw/${data.username}`))
        .then((res) => setTransactions(res.data))
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="users bg-neutral-300 h-screen w-screen  flex">
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

          {<UserDetails transactoinData={transactoinData} />}

          <div className="controls flex justify-evenly items-center mt-8">
            <button
              className="settle-all font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={settleAll}
            >
              Settle All
            </button>
            <button
              className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={() => {
                setOpen(true);
              }}
            >
              + New
            </button>

            <Modal
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            >
              <div className="modal absolute top-1/2 left-1/2 bg-white p-8 rounded-2xl">
                <label
                  htmlFor="amount"
                  className="block text-left font-medium text-black text-2xl"
                >
                  Enter Amount
                </label>
                <div className="mt-1">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    autoComplete="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg mt-4 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  onClick={newPayment}
                  className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center w-auto  h-auto px-4 py-2 bg-slate-600 rounded-lg text-slate-50 items-center my-4"
                >
                  Add
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
