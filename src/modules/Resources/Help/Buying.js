import { Link } from "react-router-dom";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../../assets/styles/buying.css";

function Buying() {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  return (
    <>
      <nav aria-label="breadcrumb" className="headerbuying">
        <ol className="breadcrumb mt-4 offset-1">
          <li className="breadcrumb-item">
            <Link
              to="/help-center"
              style={{ textDecoration: "none" }}
              className="text-dark"
            >
              Help Center
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-primary"
            aria-current="page"
          >
            Buying
          </li>
        </ol>
      </nav>
      <div className="buyingContainer">
        <div className="buyingContainerHeader">
          <div className="font-22 font-weight-700 buyingTop">
            <img src={require("../../../assets/images/leftarrowbuying.png")} style={{marginRight:"16px",width:"26px",height:"23px"}} className="backbuying" />
            Buying</div>
          <div className="input-group buyingHeaderSearch">
            <input
              type="text"
              className="form-control border-input input-box-border inputbuying"
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append w-25">
              <button
                className="btn btn-search-secondary border border-search buyersearchbutton"
                type="button"
                id="button-addon2"
                style={{ borderRadius: "0px 5px 5px 0px" }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="buyingRulesContainer">
          <div className="accordion">
            <div
              // className="accordion-item p-2"
              className={`accordion-item p-2 ${isActive && "shadow"}`}
              style={{ borderRadius: "10px" }}
            >
              <div
                className="accordionTitleBuying accordion-title"
                onClick={() => setIsActive(!isActive)}
              >
                <div className="font-15 font-weight-bold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore ?
                </div>
                <span className="text-dark" style={{ marginLeft: "1em" }}>
                  {isActive ? <RemoveIcon /> : <AddIcon />}
                </span>
              </div>
              {isActive && (
                <div
                  className="accordion-content font-14 mt-4 p-3"
                  style={{ paddingTop: 0 }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo
                </div>
              )}
            </div>
          </div>
          <div className="accordion mt-4">
            <div
              // className="accordion-item p-2"
              className={`accordion-item p-2 ${isActive1 && "shadow"}`}
              // className={`"accordion-item p-2"`}
              style={{ borderRadius: "10px" }}
            >
              <div
                className="accordionTitleBuying accordion-title"
                onClick={() => setIsActive1(!isActive1)}
              >
                <div className="font-15 font-weight-bold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore ?
                </div>
                <span className="text-dark" style={{ marginLeft: "1em" }}>
                  {isActive1 ? <RemoveIcon /> : <AddIcon />}
                </span>
              </div>
              {isActive1 && (
                <div
                  className="accordion-content font-14 mt-4  p-3"
                  style={{ paddingTop: 0 }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo
                </div>
              )}
            </div>
          </div>
          <div className="accordion mt-4">
            <div
              // className="accordion-item p-2"
              className={`accordion-item p-2 ${isActive2 && "shadow"}`}
              style={{ borderRadius: "10px" }}
            >
              <div
                className="accordionTitleBuying accordion-title"
                onClick={() => setIsActive2(!isActive2)}
              >
                <div className="font-15 font-weight-bold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore ?
                </div>
                <span className="text-dark" style={{ marginLeft: "1em" }}>
                  {isActive2 ? <RemoveIcon /> : <AddIcon />}
                </span>
              </div>
              {isActive2 && (
                <div
                  className="accordion-content font-14 mt-4 p-3"
                  style={{ paddingTop: 0 }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo
                </div>
              )}
            </div>
          </div>
          <div className="accordion mt-4">
            <div
              // className="accordion-item p-2"
              className={`accordion-item p-2 ${isActive3 && "shadow"}`}
              style={{ borderRadius: "10px" }}
            >
              <div
                className="accordionTitleBuying accordion-title"
                onClick={() => setIsActive3(!isActive3)}
              >
                <div className="font-15 font-weight-bold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore ?
                </div>
                <span className="text-dark" style={{ marginLeft: "1em" }}>
                  {isActive3 ? <RemoveIcon /> : <AddIcon />}
                </span>
              </div>
              {isActive3 && (
                <div
                  className="accordion-content font-14 mt-4 p-3"
                  style={{ paddingTop: 0 }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Buying;
