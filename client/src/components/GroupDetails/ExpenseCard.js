import React, { useContext, useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import VerifiedIcon from "@mui/icons-material/Verified";
import InfoIcon from "@mui/icons-material/Info";
import { AuthContext } from "../../context/authContext";
import { request } from "../../axios";
import "./expensecard.scss";
import ListModal from "../ExpenseModals/ListModal";

const ExpenseCard = ({ data, borrower, lender }) => {
  const { currentUser, setLoading } = useContext(AuthContext);
  const [borrowList, setBorrowList] = useState(false);
  const [lendedList, setLendedList] = useState(false);

  const handleSettle = async () => {
    setLoading(true);
    try {
      await request.put(`/expense/settle/${data._id}`);
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (borrower)
    return (
      <>
        <ListModal
          title={"To Pay"}
          data={data.borrowers}
          active={borrowList}
          type={0}
          open={setBorrowList}
        />
        <div className="flex justify-start max-w-3xl m-auto my-4 relative">
          {/* LIST MODAL */}

          <img
            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.lender}`}
            alt=""
            className="avatar-borrow absolute w-10 h-10 bottom-4 hidden sm:block"
          />
          <div className="borrowed hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-auto p-4 bg-red-200 rounded-lg w-48">
            <span className="title relative font-bold text-lg text-red-800 mt-4 flex justify-center">
              Borrowed
              <InfoIcon
                className="absolute right-4 hover:cursor-pointer"
                onClick={() => setBorrowList(true)}
              />
            </span>

            <span className="amt text-red-800 font-bold sm:text-5xl text-3xl mt-4">
              {data?.amount}
            </span>
            <span className="title font-bold text-lg text-red-800 my-4 flex justify-center">
              <ReceiptIcon className="mr-1" />
              To be paid
            </span>
          </div>
        </div>
      </>
    );
  else if (lender)
    return (
      <>
        <ListModal
          title={"To Recieve"}
          data={data.borrowers}
          active={lendedList}
          type={0}
          open={setLendedList}
        />
        <div className="flex justify-end max-w-3xl m-auto my-4 relative">
          {/* LIST MODAL */}

          <img
            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.lender}`}
            alt=""
            className="avatar-lender absolute w-10 h-10 bottom-4 hidden sm:block"
          />
          <div className="lended hover:shadow-md flex flex-col space-x-0 justify-center sm:w-56 h-auto p-4 bg-green-200 rounded-lg w-48">
            <span className="title relative font-bold text-lg text-green-800 mt-4 flex justify-center">
              Lended{" "}
              <InfoIcon
                className="absolute right-4 hover:cursor-pointer"
                onClick={() => setLendedList(true)}
              />
            </span>

            <span className="amt text-green-800 font-bold sm:text-5xl text-3xl mt-4 ">
              {data?.amount}
            </span>

            {data?.settled ? (
              <span className="title font-bold text-lg text-green-800 p-2 my-4 flex justify-center">
                Settled
                <VerifiedIcon className="ml-1" />
              </span>
            ) : (
              <button
                className="title font-bold text-lg text-green-800 p-2 bg-green-300 rounded-2xl my-4"
                onClick={handleSettle}
              >
                Settle
              </button>
            )}
          </div>
        </div>
      </>
    );
  else
    return (
      <div className="flex justify-start max-w-3xl m-auto my-4 relative">
        <img
          src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.lender}`}
          alt=""
          className="avatar-borrow absolute w-10 h-10 bottom-4 hidden sm:block"
        />
        <div className="non-pay hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-auto p-4 bg-slate-200 rounded-lg w-48">
          <span className="title font-bold text-lg text-slate-800 mt-4 flex justify-center">
            Expense
          </span>

          <span className="amt text-slate-800 font-bold sm:text-5xl text-3xl mt-4">
            {data?.amount}
          </span>
        </div>
      </div>
    );
};

export default ExpenseCard;
