import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Borrowed = ({ data }) => {
  const [color, setColor] = useState("red");
  useState(() => {
    if (data?.settled) setColor("slate");
    else setColor("red");
  });

  return (
    <div className="flex justify-start max-w-3xl m-auto my-4 relative">
      <img
        src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${data.lender}`}
        alt=""
        className="avatar-borrow absolute w-10 h-10 bottom-4 hidden sm:block"
      />
      <div
        className={`borrowed hover:shadow-md flex flex-col justify-center sm:w-56 sm:h-auto p-4 bg-${color}-200 rounded-lg w-48`}
      >
        <span className="title font-bold text-lg text-red-800 mt-4 flex justify-center">
          Borrowed
        </span>

        {data?.title && (
          <span className="title text-lg text-red-800 flex justify-center">
            {data.title}
          </span>
        )}

        <span className="amt text-red-800 font-bold sm:text-5xl text-3xl mt-4">
          {data?.amount}
        </span>

        {data?.settled ? (
          <span className="title font-bold text-lg text-red-800 p-2 my-4 flex justify-center">
            Settled
            <VerifiedIcon className="ml-1" />
          </span>
        ) : (
          <span className="title font-bold text-lg text-red-800 my-4 flex justify-center">
            <ReceiptIcon className="mr-1" />
            To be paid
          </span>
        )}
      </div>
    </div>
  );
};

export default Borrowed;
