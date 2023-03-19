import React, { useContext } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { AuthContext } from "../../context/authContext";
import { request } from "../../axios";

const Lended = ({ data }) => {
  const { currentUser, setLoading } = useContext(AuthContext);

  const handleClick = async () => {
    // setLoading(true);
    try {
      await request.put(`/debts/settle/${data._id}`);
      // setLoading(false);
      window.location.reload();
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-end max-w-3xl m-auto my-4 relative">
      <img
        src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.lender}`}
        alt=""
        className="avatar-lender absolute w-10 h-10 bottom-4 hidden sm:block"
      />
      <div className="lended hover:shadow-md flex flex-col space-x-0 justify-center sm:w-56 h-auto p-4 bg-green-200 rounded-lg w-48">
        <span className="title font-bold text-lg text-green-800 mt-4 flex justify-center">
          Lended
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
            onClick={handleClick}
          >
            Settle
          </button>
        )}
      </div>
    </div>
  );
};

export default Lended;
