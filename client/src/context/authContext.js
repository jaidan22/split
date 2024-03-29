import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);

  const login = async (inputs) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
    } catch (err) {
      alert(err.response.data);
      console.log(err);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
    setLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
