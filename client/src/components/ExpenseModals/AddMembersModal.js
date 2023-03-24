import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";

const AddMemModal = ({ open, setOpen, data }) => {
  const [users, setUsers] = useState([]);
  const [newusers, setNewUsers] = useState([]);
  const { setLoading } = useContext(AuthContext);

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
    if (newusers.length === 0) {
      alert("Select atleast one user");
      return;
    }
    try {
      const res = await request.put("/group/addUsers", {
        users: newusers,
        id: data._id,
      });
      window.location.reload();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      // setLoading(true);
      try {
        const res = await request.get("/users");
        const nonExistingUsers = res.data.filter(
          (x) => !data.users?.includes(x.username)
        );
        setUsers(nonExistingUsers);
        // setLoading(false);
      } catch (err) {
        console.log(err);
        // setLoading(false);
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
      <div className="modal absolute top-1/2 left-1/2 bg-white p-8 rounded-2xl overflow-y-scroll">
        <h3 className="block text-left  text-black text-xl font-bold">
          Add Members
        </h3>

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
                defaultChecked={false}
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

export default AddMemModal;
