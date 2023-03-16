import React, { useContext, useEffect, useRef, useState } from "react";
import { request } from "../../axios";
import { AuthContext } from "../../context/authContext";
import ExpenseCard from "./ExpenseCard";

const GroupExpenses = ({ data }) => {
  const { currentUser, setLoading } = useContext(AuthContext);
  const [expenseData, setExpense] = useState();
  const eofRef = useRef();

  useEffect(() => {
    const getTData = async () => {
      setLoading(true);
      try {
        const expenses = await request.get(`/group/expenses/${data._id}`);
        setExpense(expenses.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTData();
    setLoading(false);
  });

  return (
    <div className="expenses w-full h-70 mt-4 bg-slate-100 rounded-lg overflow-y-scroll p-4 py-8 sm:mx-0 m-auto">
      {expenseData?.map((t) => {
        const borrowed = t.borrowers
          .map((b) => b.includes(currentUser.username))
          .includes(true);
        if (borrowed) return <ExpenseCard data={t} borrower={true} />;
        else if (t.lender == currentUser.username)
          return <ExpenseCard data={t} lender={true} />;
        else return <ExpenseCard data={t} />;
      })}
      <div ref={eofRef} />
    </div>
  );
};

export default GroupExpenses;
