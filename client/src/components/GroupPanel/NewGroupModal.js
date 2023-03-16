import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";

const NewGroupModal = ({ open, setOpen }) => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newusers, setNewUsers] = useState([]);
  const [grpname, setGrpname] = useState("");

  const handleChange = (e) => {
    // console.log(e);
    if (e.target.checked) {
      setNewUsers((prevState) => [...prevState, e.target.value]);
    } else {
      setNewUsers((prev) => {
        const index = prev.indexOf(e.target.value);
        prev.splice(index, 1);
        return prev;
      });
    }
  };

  const addMems = async () => {
    if (newusers.length == 0) {
      alert("Select atleast one user");
      return;
    } else if (grpname == "") {
      alert("Group Name can't be empty");
      return;
    }
    try {
      const res = await request.post("/group", {
        groupname: grpname,
        users: newusers,
      });
      window.location.reload();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(newusers);
  }, [newusers]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
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
          Add Members
        </h3>

        <label
          htmlFor="grpname"
          className="block text-left font-medium text-black text-xl mt-4"
        >
          Group Name
        </label>
        <div className="mt-1">
          <input
            id="grpname"
            name="grpname"
            type="text"
            placeholder="Group name"
            value={grpname}
            onChange={(e) => {
              setGrpname(e.target.value);
            }}
            autoComplete="text"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg mt-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <span className="block text-lefttext-black font-medium text-black text-xl mt-4">
          Select Users
        </span>

        {users?.map((d, i) => (
          <div className="flex items-center m-4 justify-between">
            <div className="flex items-center">
              <input
                id={d.username}
                name={d.name}
                type="checkbox"
                defaultChecked={currentUser.username == d.username}
                disabled={currentUser.username == d.username}
                value={d.username}
                required
                onChange={handleChange}
                className="border-gray-300 rounded w-5 h-5 block border shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <img
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${d.username}`}
                alt="profile image"
                className="h-8 w-8 rounded-xl ml-2"
              />
              <label
                htmlFor="users"
                className="block text-left font-medium text-black text-xl ml-2"
              >
                {d.name}
              </label>
            </div>
          </div>
        ))}

        <button
          onClick={addMems}
          className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center w-auto  h-auto px-4 py-2 bg-slate-600 rounded-lg text-slate-50 items-center my-4"
        >
          Add
        </button>
      </div>
    </Modal>
  );
};

export default NewGroupModal;
