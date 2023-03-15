import React, { useContext, useEffect, useState } from "react";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";

const UsersPanel = () => {
  const { logout, setLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      request
        .get("/previous")
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
    <div className="userspanel h-7-8 sm:mb-8 sm:mr-10 my-3 mx-2 p-4 bg-white rounded-lg relative">
      <h2 className="text-left font-bold text-3xl">Users</h2>
      <List>
        {data?.map((d) => {
          return (
            <ListItem>
              <ListItemButton onClick={() => navigate(`/users/${d.username}`)}>
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${d.username}`}
                      alt=""
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={d.name} secondary={d.username} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default UsersPanel;
