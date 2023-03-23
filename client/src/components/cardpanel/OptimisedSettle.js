import React, { useEffect, useState } from "react";
import { request } from "../../axios";
import { useNavigate } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import "./optimise.scss";

const OptimisedSettle = () => {
  // const { currentUser, setLoading } = useContext(AuthContext);
  const [peers, setPeers] = useState([]);
  const [minTrxns, setMinTrxns] = useState([]);
  const navigate = useNavigate();

  const settle = () => {
    // setLoading(true);
    try {
      request
        .post("/debts/simplified/settle", {
          debtsBwPeers: peers?.debtsBwPeers,
        })
        .then(() => {
          window.location.relaod();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  const getTrxns = async () => {
    try {
      const res = await request.post("/debts/simplified", {
        netDebt: peers?.netDebt,
      });
      setMinTrxns(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      // setLoading(true);
      try {
        const res = await request.get("/peers");
        setPeers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="optimised-settle mt-4">
      <div className="title flex">
        <h2 className="text-left font-bold text-xl">Optimised Settle</h2>
        {peers.length !== 0 && (
          <label class="switch ml-4">
            <input
              type="checkbox"
              onChange={(e) => {
                return e.target.checked ? getTrxns() : setMinTrxns([]);
              }}
            />
            <span class="slider round"></span>
          </label>
        )}
      </div>

      <div className="cards flex mt-4 w-full flex-col justify-evenly gap-4">
        {/* REQUIRED TRANSACTIONS */}
        {minTrxns.length !== 0 && (
          <div className="mintxns flex flex-col space-x-0 justify-center items-center p-4 bg-purple-200 rounded-lg  w-full  h-full grow-2">
            <span className="font-bold"> Minimum Transactions</span>
            <div className="txn flex mt-4 justify-evenly w-full py-1 gap-4 border-b-2	 border-slate-400">
              <li className="list-none text-left w-20 font-bold">From</li>
              <li className="list-none text-left w-20 font-bold">To</li>
              <li className="list-none text-left w-20 font-bold">Amount</li>
            </div>
            {minTrxns.map((t) => (
              <div className="txn flex justify-evenly w-full py-1 gap-4 border-b-2 border-slate-400">
                <li className="list-none text-left w-20 flex items-center gap-1">
                  <img
                    className="h-8"
                    src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${t.from}`}
                    alt=""
                  />
                  {t.from}
                </li>
                <li className="list-none text-left w-20 flex items-center gap-1">
                  <img
                    className="h-8"
                    src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${t.to}`}
                    alt=""
                  />
                  {t.to}
                </li>
                <li className="list-none text-left w-20 flex items-center gap-1">
                  {t.amount}
                </li>
              </div>
            ))}
            <button
              className="settle-txns m-auto mt-4 sm:text-base text-sm hover:shadow-md h-auto w-fit p-4 bg-green-300 font-bold rounded-lg text-green-900"
              onClick={settle}
            >
              Settle
            </button>
          </div>
        )}

        <div className="cards flex mt-4 w-full sm:flex-row flex-col justify-evenly gap-4">
          {/* LIST OF PEERS */}
          {peers.length !== 0 && (
            <div className="peers w-full flex flex-col space-x-0 justify-start pt-4 bg-indigo-200 rounded-lg h-full grow-1">
              <span className="font-bold"> Peers</span>
              <List>
                {peers.peers.map((p) => (
                  <ListItem className="px-2">
                    <ListItemButton onClick={() => navigate(`/users/${p}`)}>
                      <ListItemAvatar>
                        <Avatar>
                          <img
                            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${p}`}
                            alt=""
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={p} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          )}

          {/* DEBTS */}
          {peers.length !== 0 && (
            <div className="debts flex flex-col space-x-0 justify-center p-4 bg-blue-100 rounded-lg w-full h-full grow-2">
              <span className="font-bold"> Debts between Peers</span>

              <TableContainer component={Paper} className="transparent">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Lender</TableCell>
                      <TableCell align="center">Borrower</TableCell>
                      <TableCell align="center">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {peers.debtsBwPeers.map((p) => (
                      <TableRow
                        key={p.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{p.lender}</TableCell>
                        <TableCell align="center">{p.borrower}</TableCell>
                        <TableCell align="center">{p.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimisedSettle;
