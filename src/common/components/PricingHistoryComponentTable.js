import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Mint from "../../assets/images/Mint.svg";
import Transfer from "../../assets/images/Transfer.svg";
import Sale from "../../assets/images/Sale2.svg";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Information from "../../assets/images/No-Info-Icon.svg";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import styled from "styled-components";
import SplitFrom from "./splitFrom";
import Snackbar from "@mui/material/Snackbar";
import SplitTo from "./splitTo";
import { Link } from "react-router-dom";
import {
  getActivities,
  getPricingHistory,
} from "../../services/webappMicroservice";
import moment from "moment";
import { NoBackpackSharp } from "@mui/icons-material";
import { Divider } from "@mui/material";
import "../../assets/styles/Leader.css";
import { Tooltip } from "@material-ui/core";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { getParamTenantId } from "../../utility/global";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-family: "poppins-bold";
  font-size: 16px;
  line-height: 25px;
  color: #000000;
  margin-bottom: 23px;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
`;
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  width: 108px;
  height: 42px;
  padding: 5px;
  font-family: "poppins-medium";
  font-size: 14px;
  line-height: 21px;
  color: #191919;
  background-color: #fff;
`;
const Option = styled.option`
  font-size: 14px;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background: #ffffff;
  color: #366eef;
  font-size: 14px;
  margin-left: 16px;
  padding: 0px 5px 0px 5px;
  width: 108px;
  height: 42px;
  font-family: "poppins-medium";
  font-size: 14px;
  line-height: 21px;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #366eef;
`;
const TableContainerCustom = styled(TableContainer)`
  height: 218px !important;
  ::-webkit-scrollbar {
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    width: 2px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
`;
const TableUp = styled(Table)`
  height: 0px;
  table-layout: auto;
  width: 100%;
  margin-bottom: 8px;
`;
const TableCustom = styled(Table)`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  min-width: 525px !important;
`;
const TableDiv = styled.div`
  height: 220px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
`;
const CustomSnack = styled(Snackbar)`
  @media (min-width: 992px) {
    position: absolute !important;
    top: 1159px !important;
    right: auto !important;
    left: 372px !important;

    min-width: 112px !important;
  }
  @media only screen and (min-width: 0px) and (max-width: 991px) {
    position: absolute !important;
    top: 1872px !important;
    left: auto !important;

    min-width: 112px !important;
  }
`;
const ContainerList = styled.span`
  @media screen {
  }
`;
function createData(Event, Price, From, To, Date) {
  return { Event, Price, From, To, Date };
}

const rows = [
  // createData("List", "0.32ETH", "Ravi", "John", "25Feb"),
  // createData("Buy", "0.32ETH", "Ravi", "John", "25Feb"),
  // createData("price", "0.32ETH", "Ravi", "John", "25Feb"),
];
const queryString = require("query-string");
export default function PricingHistoryComponentTable(props) {
  const id = props.id;
  const defaultReq = {
    type: "",
  };
  const initalValue = ["list", "buy", "minted"];
  const [selectedVAlue, setSelectedValue] = useState(initalValue);
  const [list, setEvent] = useState(false);
  const [price, setPrice] = useState(false);
  const [buy, setBuy] = useState(false);
  const [minted, setMinted] = useState(false);

  const [activities, setActivities] = useState("");
  let [dataCopied, setDataCopied] = useState(true);
  let [dataCopiedTo, setDataCopiedTo] = useState(true);

  const [type, setType] = useState([]);

  useEffect(() => {

    let finalUrl = selectedVAlue?.toString();
    console.log(finalUrl);
    getActivities(finalUrl, id).then((response) => setActivities(response));
  }, [selectedVAlue]);

  const handleChange = (e) => {
    if (e.target.value === "all") {
      setBuy(true);
      setMinted(true);
      setEvent(true);
      setSelectedValue(initalValue);
    }
    if (e.target.value === "list") {
      setEvent(true);
      if (
        selectedVAlue.includes("list") &&
        selectedVAlue.includes("buy") &&
        selectedVAlue.includes("minted")
      ) {
        setBuy(false);
        setMinted(false);
        setSelectedValue(["list"]);
        return;
      } else {
        setSelectedValue([...selectedVAlue, "list"]);
      }
    } else if (e.target.value === "buy") {
      setBuy(true);
      if (
        selectedVAlue.includes("list") &&
        selectedVAlue.includes("buy") &&
        selectedVAlue.includes("minted")
      ) {
        setEvent(false);
        setMinted(false);
        setSelectedValue(["buy"]);
        return;
      } else {
        setSelectedValue([...selectedVAlue, "buy"]);
      }
    } else if (e.target.value === "minted") {
      setMinted(true);
      if (
        selectedVAlue.includes("list") &&
        selectedVAlue.includes("buy") &&
        selectedVAlue.includes("minted")
      ) {
        setEvent(false);
        setBuy(false);
        setSelectedValue(["minted"]);
        return;
      } else {
        setSelectedValue([...selectedVAlue, "minted"]);
      }
    }
  };

  const closeFilter = (key) => {
    if (key === "list") {
      setEvent(false);
      setSelectedValue((current) =>
        current.filter((element) => {
          return element !== "list";
        })
      );
    } else if (key === "buy") {
      setBuy(false);
      setSelectedValue((current) =>
        current.filter((element) => {
          return element !== "buy";
        })
      );
    } else if (key === "minted") {
      setMinted(false);
      setSelectedValue((current) =>
        current.filter((element) => {
          return element !== "minted";
        })
      );
    }
  };

  useEffect(() => {
    getPricingHistory();
  }, []);

  return (
    <MainContainer className="pricing-history">
      <Title>Activities</Title>
      <FilterContainer>
        <Select
          className="selectfixing4"
          name="filter"
          onChange={(e) => handleChange(e)}
        >
          <Option value="all" selected>
            All
          </Option>
          <Option value="list">List</Option>
          <Option value="buy">Buy</Option>
          <Option value="minted">Minted</Option>
        </Select>

        {list ? (
          <Filter>
            <span style={{ marginRight: "10px" }}>List</span>
            <Button onClick={() => closeFilter("list")}>
              <i class="fa-solid fa-xmark"></i>
            </Button>
          </Filter>
        ) : (
          ""
        )}

        {buy ? (
          <Filter>
            <span style={{ marginRight: "10px" }}>Buy</span>
            <Button onClick={() => closeFilter("buy")}>
              <i class="fa-solid fa-xmark"></i>
            </Button>
          </Filter>
        ) : (
          ""
        )}
        {minted ? (
          <Filter>
            <span style={{ marginRight: "10px" }}>Minted</span>
            <Button onClick={() => closeFilter("minted")}>
              <i class="fa-solid fa-xmark"></i>
            </Button>
          </Filter>
        ) : (
          ""
        )}
      </FilterContainer>

      <TableDiv>
        {activities.length > 0 ? (
          <TableContainerCustom component={Paper} elevation={0}>
            <TableCustom
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    Event
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    From
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    To
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      // textAlign: "center",
                    }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody style={{ border: "1px solid greeen !important" }}>
                {activities.map((row) => {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #C8C8C8",
                        }}
                        component="td"
                        scope="row"
                      >
                        {row.type === "list" ? (
                          <img className="table-icon" src={Sale}></img>
                        ) : row.type == "minted" ? (
                          <img className="table-icon" src={Mint}></img>
                        ) : row.type == "transfer" || "buy" ? (
                          <img className="table-icon" src={Transfer}></img>
                        ) : (
                          ""
                        )}
                        {row.type}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #C8C8C8",
                        }}
                      >
                        {row.price}
                      </TableCell>

                      <TableCell
                        style={{
                          borderBottom: "1px solid #C8C8C8",
                        }}
                      >
                        {" "}
                        <Link
                          to={"/user-profile/" + row?.createdBy}
                          style={{ textDecoration: "none" }}
                        >
                          <span className="Activity-From">
                            {row.userName ? (
                              row.userName.substr(0, 6)
                            ) : (
                              <SplitFrom address={row.walletAddress} />
                            )}{" "}
                          </span>
                        </Link>
                        <CopyToClipboard text={row?.walletAddress}>
                          <span
                            onClick={() => {
                              setDataCopied(false);
                              setTimeout(() => {
                                setDataCopied(true);
                              }, 1000);
                            }}
                            className="Activity-From"
                          >
                            <ContentCopyIcon className="copy-icon" />
                            <span className="activityTooltip">
                              {dataCopied ? "copy to clipboard" : "copied"}
                            </span>
                          </span>
                        </CopyToClipboard>
                      </TableCell>

                      <TableCell
                        style={{
                          borderBottom: "1px solid #C8C8C8",
                        }}
                        onClick={() => {
                          setDataCopiedTo(false);
                          setTimeout(() => {
                            setDataCopiedTo(true);
                          }, 1000);
                        }}
                      >
                        {row?.to.length > 0 ? (
                          <Link
                            to={"/user-profile/" + row?.to[0]?._id}
                            style={{ textDecoration: "none" }}
                          >
                            <span className="Activity-From">
                              {row?.to.length > 0 ? (
                                row?.to[0]?.userName ? (
                                  row?.to[0]?.userName.substr(0, 7)
                                ) : (
                                  <span>
                                    <SplitTo
                                      address={row?.to[0]?.wallet_address}
                                    />
                                  </span>
                                )
                              ) : (
                                "---"
                              )}

                              {/* </button> */}
                            </span>
                          </Link>
                        ) : (
                          <span className="Activity-From">
                            {/* <button
                              className="copy-button"
                              onClick={handleClick({
                                vertical: "top",
                                horizontal: "right",
                              })}
                            > 
                            */}

                            {row?.to.length > 0 ? (
                              row?.to[0]?.userName ? (
                                row?.to[0]?.userName.substr(0, 7)
                              ) : (
                                <span>
                                  <SplitTo
                                    address={row?.to[0]?.wallet_address}
                                  />
                                </span>
                              )
                            ) : (
                              "---"
                            )}

                            {/* </button> */}
                          </span>
                        )}{" "}
                        &nbsp;
                        {row?.to.length > 0 ? (
                          <CopyToClipboard text={row?.to[0]?.wallet_address}>
                            <span
                              onClick={() => {
                                setDataCopied(false);
                                setTimeout(() => {
                                  setDataCopied(true);
                                }, 1000);
                              }}
                              className="Activity-From"
                            >
                              <ContentCopyIcon className="copy-icon" />
                              <span className="activityTooltip">
                                {dataCopied ? "copy to clipboard" : "copied"}
                              </span>
                            </span>
                          </CopyToClipboard>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      {/* </Tooltip> */}
                      <TableCell
                        style={{
                          borderBottom: "1px solid #C8C8C8",
                          // textAlign: "center"
                        }}
                      >
                        {moment(row.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableCustom>
          </TableContainerCustom>
        ) : (
          <div className="no-data no-data-found ">
            <img src={Information}></img>
            <p>No information available</p>
          </div>
        )}
      </TableDiv>
    </MainContainer>
  );
}
