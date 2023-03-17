import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./searchbar.scss";

const SearchBar = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [searchRes, setSearchRes] = useState([]);

  const showResults = (val) => {
    setKeyword(val);
    if (val == "") setOpen(false);
    else {
      const result = users.filter((user) => {
        if (user.username.toLowerCase().match(val.toLowerCase())) return user;
        else if (user.name.toLowerCase().match(val.toLowerCase())) return user;
        else return null;
      });
      setSearchRes(result);
      console.log(result);
      setOpen(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get("/users");
        const users = res.data.filter(
          (x) => x.username != currentUser.username
        );
        setUsers(users);
        // console.log(users);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="searchbar relative">
      <input
        type="text"
        name="search"
        placeholder="Search"
        autoFocus={true}
        value={keyword}
        onBlur={() => showResults("")}
        onChange={(e) => {
          showResults(e.target.value);
        }}
        className="search bg-gray-100 px-4 py-2 rounded-2xl border-0 sm:mr-4 sm:my-0 sm:mx-0 sm:ml-0 ml-4 my-2 mx-2 outline-none grow"
      />

      {open && (
        <div className="result-container absolute bg-gray-200 sm:right-4 sm:top-12 top-12 h-auto rounded-2xl">
          {searchRes?.map((d) => (
            // <List>
            <ListItem>
              <ListItemButton onClick={() => navigate(`/users/${d.username}`)}>
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${d.username}`}
                      alt=""
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={d.name} secondary={d.username} />
              </ListItemButton>
            </ListItem>
            // </List>
          ))}
          {searchRes.length == 0 && (
            <div className="text-red-600 font-bold my-4">No users found ! </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
