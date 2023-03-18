import React from "react";
import "../listPopUp/list.scss";

const ListModal = ({ title, data, open, active, type }) => {
  if (active)
    return (
      <div className={"listmodal-container absolute w-screen h-screen "}>
        <div className={"listmodal p-4 shadow-2xl bg-white absolute pb-8 rounded-2xl"}>
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
                <th class="border border-slate-600 ">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr>
                  <td class="border border-slate-700 ">{d[0]}</td>
                  <td class="border border-slate-700 ">{d[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ListModal;
