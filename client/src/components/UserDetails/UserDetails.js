import React, { useContext, useEffect, useRef, useState } from "react";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Borrowed from "./Borrowed";
import Lended from "./Lended";
import "./userDetails.scss";

const UserDetails = ({ user }) => {
  const { currentUser, setLoading } = useContext(AuthContext);
  const [transactoinData, setTransactions] = useState();
  const eofRef = useRef();

  // window.onload(eofRef.current?.scrollIntoView())
  //   window.addEventListener("load", () => {
  //     eofRef.current?.scrollIntoView();
  //   });

  //   useEffect(() => {
  //     eofRef.current?.scrollIntoView();
  //   }, []);

  useEffect(() => {
    const getTData = async () => {
      setLoading(true);
      try {
        const transactions = await request.get(`/debts/bw/${user.username}`);
        setTransactions(transactions.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTData();
    setLoading(false);
  });

  return (
    <div className="transactions w-full h-70 mt-4 bg-slate-100 rounded-lg overflow-y-scroll p-4 py-8 sm:mx-0 m-auto">
      {transactoinData?.map((t) => {
        if (t.lender == currentUser.username) return <Lended data={t} />;
        else return <Borrowed data={t} />;
      })}
      <div ref={eofRef} />
    </div>
  );
};

export default UserDetails;