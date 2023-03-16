import React, { useContext, useEffect, useState } from "react";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router";
import NewGroupModal from "./NewGroupModal";

const GroupPanel = () => {
  const { setLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      request
        .get("/groups")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="grouppanel h-7-8 sm:mb-8 sm:mr-10 my-3 mx-2 p-4 bg-white rounded-lg relative">
      {/* NEW GROUP MODAL */}
      <NewGroupModal open={open} setOpen={setOpen} />

      <h2 className="text-left font-bold text-3xl">Groups</h2>
      <List>
        {data?.map((d) => {
          return (
            <ListItem>
              <ListItemButton onClick={() => navigate(`/groups/${d._id}`)}>
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={`https://api.dicebear.com/5.x/identicon/svg?seed=${d.groupname}`}
                      alt=""
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={d.groupname} />
              </ListItemButton>
            </ListItem>
          );
        })}
        {data.length == 0 && <span>No groups Found</span>}
      </List>
      <div className="controls flex justify-evenly items-center mt-8">
        <button
          className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
          onClick={() => {
            setOpen(true);
          }}
        >
          New Group
        </button>
      </div>
    </div>
  );
};

export default GroupPanel;
