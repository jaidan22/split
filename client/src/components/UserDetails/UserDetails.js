import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Borrowed from "./Borrowed";
import Lended from "./Lended";
import "./userDetails.scss";

const UserDetails = ({ transactoinData }) => {
  const { currentUser, setLoading } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(true);
  const eofRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrolling && eofRef.current?.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div
      className="transactions w-full h-70 mt-4 bg-slate-100 rounded-lg overflow-y-scroll p-4 py-8 sm:mx-0 m-auto"
      onScroll={() => {
        setScrolling(false);
      }}
    >
      {transactoinData?.map((t) => {
        if (t.lender === currentUser.username) return <Lended data={t} />;
        else return <Borrowed data={t} />;
      })}
      {transactoinData?.length === 0 && <span>No Expenses Found !</span>}

      <div ref={eofRef} />
    </div>
  );
};

export default UserDetails;
