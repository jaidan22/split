import React, { useContext, useEffect, useRef, useState } from "react";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";
import ExpenseCard from "./ExpenseCard";

const GroupExpenses = ({ expenseData }) => {
  const { currentUser, setLoading } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(true);
  const eofRef = useRef();

  useEffect(() => {
    setLoading(false);
    scrolling && eofRef.current?.scrollIntoView({ behavior: "smooth" });
  },[]);

  return (
    <div
      className="expenses w-full h-70 mt-4 bg-slate-100 rounded-lg overflow-y-scroll p-4 py-8 sm:mx-0 m-auto"
      onScroll={() => {
        setScrolling(false);
      }}
    >
      {expenseData?.map((t) => {
        const borrowed = t.borrowers
          .map((b) => b.includes(currentUser.username))
          .includes(true);
        if (borrowed) return <ExpenseCard data={t} borrower={true} />;
        else if (t.lender == currentUser.username)
          return <ExpenseCard data={t} lender={true} />;
        else return <ExpenseCard data={t} />;
      })}
      {expenseData?.length == 0 && <span>No Expenses Found !</span>}
      <div ref={eofRef} />
    </div>
  );
};

export default GroupExpenses;
