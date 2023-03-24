import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { request } from "../../axios";

const RemoveMemsModal = ({ open, setOpen, data }) => {
  const [users, setUsers] = useState([]);
  const [dltusers, setExUsers] = useState([]);

  const handleChange = (e) => {
    // console.log(e);
    if (e.target.checked) {
      setExUsers((prevState) => [...prevState, e.target.value]);
    } else {
      setExUsers((prev) => {
        const index = prev.indexOf(e.target.value);
        prev.splice(index, 1);
        return prev;
      });
    }
  };

  const delMems = async () => {
    if (dltusers.length == 0) {
      alert("Select atleast one user");
      return;
    }
    try {
      console.log(dltusers);
      const res = await request.put("/group/dltUsers", {
        users: dltusers,
        id: data._id,
      });
      window.location.reload();
      //   console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get("/users");
        const existingUsers = res.data.filter((x) =>
          data.users?.includes(x.username)
        );
        setUsers(existingUsers);
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
      <div className="modal absolute top-1/2 left-1/2 bg-white p-8 rounded-2xl overflow-y-scroll">
        <h3 className="block text-left  text-black text-xl font-bold">
          Remove Members
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
                disabled={d.username == data.admin}
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
          onClick={delMems}
          className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center w-auto  h-auto px-4 py-2 bg-red-600 rounded-lg text-slate-50 items-center my-4"
        >
          Remove
        </button>
      </div>
    </Modal>
  );
};

export default RemoveMemsModal;
