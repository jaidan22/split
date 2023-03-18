import { Modal } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { request } from "../../axios";

// CREATE EXPENSE MODAL
const CreateExpModal = ({ open, setOpen, data }) => {
  const [splitType, setSplitType] = useState(0);
  const [amount, setAmount] = useState(0);
  const [expName, setExpName] = useState();
  const [users, setUsers] = useState([]);
  const checkRef = useRef([]);
  const amtRef = useRef([]);

  const verify = () => {
    if (amount == 0 || !users || !expName) {
      alert("All fields are required");
      return false;
    }

    let total = 0;
    users.map((user) => {
      if (user[1] == 0) {
        alert("Minimum amount of 1 is required for all users");
        return false;
      } else {
        total += Number(user[1]);
      }
    });
    if (total != amount) {
      console.log({ amount, total });
      alert("Total amount is not matching");
      return false;
    }

    return true;
  };

  const newExpense = async () => {
    if (!verify()) return;
    try {
      const body = {
        title: expName,
        borrowers: users,
        amount: Number(amount),
        group: data._id,
      };
      console.log(body);
      const res = request.post("/expense", body);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const clearAll = () => {
    // setAmount(0);
    // setExpName("");
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
    console.log(users);
  }, [users]);

  useEffect(() => {
    setUsers([]);
    setSplitType(0);
  }, []);

  return (
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
              clearAll();
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
          // disabled={users?.length == 0}
          className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center w-auto  h-auto px-4 py-2 bg-slate-600 rounded-lg text-slate-50 items-center my-4"
        >
          Add
        </button>
      </div>
    </Modal>
  );
};

export default CreateExpModal;
