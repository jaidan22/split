import { Modal } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { request } from "../../axios";
import GroupExpenses from "../../components/GroupDetails/GroupDetails";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topbar/TopBar";
import { AuthContext } from "../../context/authContext";

const GroupPage = () => {
  const { setLoading, currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState();
  const [expName, setExpName] = useState();
  const [users, setUsers] = useState([]);
  const [splitType, setSplitType] = useState(0);
  const checkRef = useRef([]);
  const amtRef = useRef([]);

  const newExpense = async () => {};

  const clearAll = () => {
    checkRef.current.map((c, i) => {
      c.checked = false;
    });
    amtRef.current.map((a, i) => {
      a.value = null;
    });
  };

  const handleChange = () => {
    checkRef.current.map((c, i) => {
      console.log(splitType);
      const value = c.value;
      const amt = amtRef.current[i].value;
      if (c.checked) {
        setUsers((prev) => {
          const e = prev.findIndex((p) => p.includes(value));
          if (e > -1) {
            prev[e] = [value, splitType == 0 ? amt : (amount * amt) / 100];
            return prev;
          } else
            return [
              ...prev,
              [value, splitType == 0 ? amt : (amount * amt) / 100],
            ];
        });
      } else {
        amtRef.current[i].value = null;
        const indexToRemove = users
          .map((u) => u[0] != value && u)
          .indexOf(false);
        setUsers((prevState) => {
          const newArray = [...prevState];
          if (indexToRemove !== -1) {
            newArray.splice(indexToRemove, 1);
          }
          return newArray;
        });
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get(`/group/${id}`);
        // console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="users bg-neutral-300 h-screen w-screen  flex">
      <Sidebar />

      <div className="main h-screen sm:w-10/12 w-screen">
        <TopBar />
        <div className="userDetails h-7-8 sm:mb-8 sm:mr-10 my-3 mx-2 p-4 bg-white rounded-lg relative">
          <div className="text-left font-bold text-3xl flex justify-start max-h-12">
            <img
              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${data.groupname}`}
              alt="profile url"
              className="w-8 mr-3"
            />
            <h2>{data.groupname}</h2>
          </div>

          {data && <GroupExpenses data={data} />}

          <div className="controls flex justify-evenly items-center mt-8">
            <button
              className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={() => {
                setUsers([]);
                setSplitType(0);
                setOpen(true);
              }}
            >
              New Expense
            </button>

            <button
              className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Members
            </button>

            <button
              className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={() => {
                setOpen(true);
              }}
            >
              Remove Members
            </button>

            <Modal
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            >
              <div className="modal absolute top-1/2 left-1/2 bg-white p-8 rounded-2xl">
                <h3 className="block text-left  text-black text-xl font-bold">
                  New Expense
                </h3>
                <label
                  htmlFor="expName"
                  className="block text-left font-medium text-black text-xl mt-4"
                >
                  Expense Name
                </label>
                <div className="mt-1">
                  <input
                    id="expName"
                    name="expName"
                    type="text"
                    value={expName}
                    onChange={(e) => {
                      setExpName(e.target.value);
                    }}
                    autoComplete="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg mt-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <label
                  htmlFor="amount"
                  className="block text-left font-medium text-black text-xl mt-4"
                >
                  Amount
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg mt-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <label
                  htmlFor="split-type"
                  className="block text-left font-medium text-black text-xl mt-4"
                >
                  Split Type
                </label>
                <div className="mt-1">
                  <select
                    name="split-type"
                    id="split-type"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg mt-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setSplitType(e.target.value);
                      clearAll()
                    }}
                  >
                    <option value={0} defaultChecked>
                      Amount
                    </option>
                    <option value={1}>Percentage</option>
                  </select>
                </div>

                <span className="block text-lefttext-black font-medium text-black text-xl mt-4">
                  Select Users
                </span>

                {data &&
                  data.users?.map((d, i) => (
                    <div className="flex items-center m-2 justify-between">
                      <div className="flex items-center">
                        <input
                          id={d}
                          name={d}
                          type="checkbox"
                          defaultChecked={false}
                          value={d}
                          required
                          onChange={handleChange}
                          ref={(el) => (checkRef.current[i] = el)}
                          className="border-gray-300 rounded w-5 h-5 block border shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <label
                          htmlFor="users"
                          className="block text-left font-medium text-black text-xl ml-2"
                        >
                          {d}
                        </label>
                      </div>
                      <input
                        id="input"
                        type="number"
                        placeholder="0.00"
                        disabled={!checkRef.current[i]?.checked}
                        onChange={handleChange}
                        ref={(el) => (amtRef.current[i] = el)}
                        className="outline-none border-none w-12"
                      />
                    </div>
                  ))}

                <button
                  onClick={newExpense}
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

export default GroupPage;
