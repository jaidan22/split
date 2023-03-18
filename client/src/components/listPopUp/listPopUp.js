import React from "react";
import "./list.scss";

const ListPopUp = ({ title, data, open, active, type }) => {
  const showDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (active)
    return (
      <div
        className={
          "listPopUp-container absolute w-screen h-screen top-0 left-0"
        }
      >
        <div className={"listPopUp p-4 shadow-2xl bg-white absolute pb-8 rounded-2xl"}>
          <div className="title flex justify-between m-3">
            <span className="text-xl font-bold">{title}</span>
            <span
              onClick={() => open(false)}
              className="close text-2xl font-bold shadow-2xl rounded-3xl"
            >
              &#10005;
            </span>
          </div>
          <table class="border-collapse border m-auto w-full border-slate-500 ">
            <thead>
              <tr>
                <th class="border border-slate-600 ">Name</th>
                <th class="border border-slate-600 ">Date</th>
                <th class="border border-slate-600 ">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr>
                  <td class="border border-slate-700 ">
                    {type == 0 ? d.borrower : d.lender}
                  </td>
                  <td class="border border-slate-700 ">
                    {showDate(d.creationDatetime)}
                  </td>
                  <td class="border border-slate-700 ">{d.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ListPopUp;
