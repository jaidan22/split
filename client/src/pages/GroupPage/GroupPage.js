import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { request } from "../../axios";
import AddMemModal from "../../components/ExpenseModals/AddMembersModal";
import CreateExpModal from "../../components/ExpenseModals/CreateExpenseModal";
import RemoveMemsModal from "../../components/ExpenseModals/RemoveMemsModal";
import GroupExpenses from "../../components/GroupDetails/GroupDetails";
import Sidebar from "../../components/sidebar/Sidebar";
import TopBar from "../../components/topbar/TopBar";
import { AuthContext } from "../../context/authContext";

// Group Page
const GroupPage = () => {
  const { setLoading, currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [memModal, setMembersOpen] = useState(false);
  const [removeModal, setRemoveOpen] = useState(false);
  const [data, setData] = useState([]);
  const [expenseData, setExpense] = useState();

  // GET GROUP DATA
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get(`/group/${id}`);
        // console.log(res.data);
        setData(res.data);
        const expenses = await request.get(`/group/expenses/${res.data._id}`);
        setExpense(expenses.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="users bg-neutral-300 h-screen w-screen  flex">
      <Sidebar />

      {/* MODALS */}
      {open && <CreateExpModal open={open} setOpen={setOpen} data={data} />}
      {memModal && (
        <AddMemModal open={memModal} setOpen={setMembersOpen} data={data} />
      )}
      {removeModal && (
        <RemoveMemsModal
          open={removeModal}
          setOpen={setRemoveOpen}
          data={data}
        />
      )}

      <div className="main h-screen sm:w-10/12 w-screen">
        <TopBar />
        <div className="userDetails h-7-8 sm:mb-8 sm:mr-10 my-3 mx-2 p-4 bg-white rounded-lg relative">
          <div className="text-left font-bold text-3xl flex justify-start max-h-12">
            <img
              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${data.groupname}`}
              alt="profile url"
              className="w-8 mr-3"
            />
            <h2>{data.groupname}</h2>
          </div>

          {expenseData && <GroupExpenses expenseData={expenseData} />}

          <div className="controls flex justify-evenly items-center mt-8">
            <button
              className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={() => {
                setOpen(true);
              }}
            >
              New Expense
            </button>

            <button
              className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-slate-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={() => {
                setMembersOpen(true);
              }}
            >
              Add Members
            </button>

            <button
              className="new-expense font-bold text-lg hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-20 h-12 p-4 bg-red-600 rounded-lg w-32 text-slate-50 items-center"
              onClick={() => {
                setRemoveOpen(true);
              }}
            >
              Remove Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
