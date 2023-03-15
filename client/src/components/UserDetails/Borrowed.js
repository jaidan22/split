import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Borrowed = ({ data }) => {
  return (
    <div className="flex justify-start max-w-3xl m-auto my-4">
      <div className="borrowed hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-auto p-4 bg-red-200 rounded-lg w-48">
        <span className="title font-bold text-lg text-red-800 mt-4 flex justify-center">
          Borrowed
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
  );
};

export default Borrowed;
