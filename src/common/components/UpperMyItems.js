import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/1.jpg";
import circle from "../../assets/images/circle.png";
import ETH from "../../assets/images/ETH.png";
import buy from "../../assets/images/buy.png";
import send from "../../assets/images/send.png";
import swap from "../../assets/images/swap.png";
import metamask from "../../assets/images/Metamask.svg";
import copy1 from "../../assets/images/copy1.svg";
import { useState } from "react";
function UpperMyItems() {
  const [activeInActive, setActiveInActive] = useState("active");
  const [toggleSelect, setToggleSelect] = useState(true);
  return (
    <div>
      <div>
        <div className="my-item-container">
          <div className="">
            <h1 className="poppins-normal bold-600 font-20 blackish">
              My Items
            </h1>
          </div>

          <div className="toggle-items">
            <div
              onClick={() => setToggleSelect(false)}
              className="font-16 bold-bold poppins-normal"
              style={{
                color: !toggleSelect ? "#191919" : "#828282",
                borderBottom: !toggleSelect ? "3px solid #366EEF" : "none",
              }}
            >
              Single
            </div>
            <div
              onClick={() => setToggleSelect(true)}
              className="font-16 bold-bold poppins-normal"
              style={{
                marginLeft: "18px",
                color: toggleSelect ? "#191919" : "#828282",
                borderBottom: toggleSelect ? "3px solid #366EEF" : "none",
              }}
            >
              Collections
            </div>
          </div>
          <button type="submit" className="add-item-button p-0 bord-rad-4">
            Add Item
          </button>
        </div>
     
      </div>
    </div>
  );
}

export default UpperMyItems;
