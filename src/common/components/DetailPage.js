import React, { useState, useEffect } from "react";
import {Table,Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TableDown = styled(Table)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  table-layout: fixed;
  width: 100%;
  height: auto;
`;
const TableUp = styled(Table)`
  height: 0px;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 8px;
`;
const TableDiv = styled.div`
  height: 288px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  overflow: scroll;
    overflow-y: hidden;
`;
const TableCustom = styled(Table)`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  min-width: 525px !important;
`;
const TableContainerCustom = styled(TableContainer)`
  height: 288px !important;
  overflow: unset!important;
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #c8c8c8; */
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;

export default function DetailPage(props) {
  const nft = props.nft;

  return (
    <TableDiv>
    <TableContainerCustom component={Paper} elevation={0}>
      {/* <TableDiv> */}
      <TableDown aria-label="simple table">
      <TableCustom
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
              stickyHeader
            >
        <tbody>
          <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <td
              style={{
                border: "none",
                width: "34%",
                font: "normal normal 600 14px/21px Poppins",
                paddingTop: "19px",
                paddingLeft: "20px",
              }}
              component="td"
              scope="row"
            >
              Contract address
            </td>

            <td style={{ border: "none", paddingTop: "20px" }}>
              {" "}
              {nft?.blockchain == "Ethereum" ? (
                <a
                  style={{ textDecoration: "none" }}
                  href={"https://etherscan.io/address/" + nft?.contractAddress}
                >
                  {nft?.contractAddress}{" "}
                </a>
              ) : nft?.blockchain == "Binance" ? (
                <a
                  style={{ textDecoration: "none" }}
                  href={"https://bscscan.com/address/" + nft?.contractAddress}
                >
                  {nft?.contractAddress}{" "}
                </a>
              ) : nft?.blockchain == "Polygon" ? (
                <a
                  style={{ textDecoration: "none" }}
                  href={"https://polygonscan.com/" + nft?.contractAddress}
                >
                  {nft?.contractAddress}{" "}
                </a>
              ) : nft?.blockchain == "Avalanche" ? (
                <a
                  style={{ textDecoration: "none" }}
                  href={"https://snowtrace.io/address/" + nft?.contractAddress}
                >
                  {nft?.contractAddress}{" "}
                </a>
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <td
              component="td"
              scope="row"
              style={{
                border: "none",
                width: "34%",
                font: "normal normal 600 14px/21px Poppins",
                paddingTop: "20px",
                paddingLeft: "20px",
              }}
            >
              Token ID
            </td>
            <td style={{ border: "none", paddingTop: "20px" }}>
              {nft?.tokenId}
            </td>
          </tr>
          <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <td
              component="td"
              scope="row"
              style={{
                border: "none",
                width: "34%",
                font: "normal normal 600 14px/21px Poppins",
                paddingTop: "20px",
                paddingLeft: "20px",
              }}
            >
              Token Standard
            </td>
            <td style={{ border: "none", paddingTop: "20px" }}>
              {nft?.tokenStandard ? nft?.tokenStandard : "ERC-721"}
            </td>
          </tr>
          <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <td
              component="td"
              scope="row"
              style={{
                border: "none",
                width: "34%",
                font: "normal normal 600 14px/21px Poppins",
                paddingTop: "20px",
                paddingLeft: "20px",
              }}
            >
              Blockchain
            </td>
            <td style={{ border: "none", paddingTop: "20px" }}>
              {nft?.blockchain}
            </td>
          </tr>
        </tbody>
        </TableCustom>
      </TableDown>
      {/* </TableDiv> */}
    </TableContainerCustom>
    </TableDiv>
  );
}
