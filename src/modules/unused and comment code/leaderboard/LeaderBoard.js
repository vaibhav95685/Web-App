import React, { useState } from "react";
import "../asset/Leader.css";
import { Link } from "react-router-dom";
import { LeaderBoardApi, LeaderBoardApi2 } from "../API/LeaderBoardApi";
import "../asset/Notification.css";

function LeaderBoard() {
  const [state, setState] = useState(LeaderBoardApi);
  return (
    <div>
      <h1 className="leader" style={{ marginBottom: "30px" }}>
        Leaderboard
      </h1>
      {/* 3 Tables */}
      <div className="container">
        <div className="row align-items-start leadercol">
          <div className="col leaderboardTop">
            <div className="leaderboardTitle">
              <div className="col" style={{ fontSize: "16px" }}>
                Top Bidders
              </div>
              <div className="dropdown col leaderboardDropdown">
                <button
                  className="btn border dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Weekly
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="leaderboardTopDetails">
              {LeaderBoardApi.map((curElem) => {
                const { Image, Heading, SubHead1, SubHead2 } = curElem;
                return (
                  <>
                    <div className="leaderboardTopDetailsRow">
                      <img src={Image} alt="" />
                      <div className="LeaderboardInsideDetails">
                        <h2>{Heading}</h2>
                        <p>
                          {SubHead1}
                          <span>{SubHead2}</span>
                        </p>
                      </div>
                    </div>
                    <hr className="hr" />
                  </>
                );
              })}
            </div>
            <Link className="view" to="/top-bidder">
              {" "}
              View More
            </Link>
          </div>
          <div className="col leaderboardTop">
            <div className="leaderboardTitle">
              <div className="col" style={{ fontSize: "16px" }}>
                Top Seller
              </div>
              <div className="dropdown col leaderboardDropdown">
                <button
                  className="btn border dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Weekly
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="leaderboardTopDetails">
              {LeaderBoardApi.map((curElem) => {
                const { Image, Heading, SubHead1, SubHead2 } = curElem;
                return (
                  <>
                    <div className="leaderboardTopDetailsRow">
                      <img src={Image} alt="" />
                      <div className="LeaderboardInsideDetails">
                        <h2>{Heading}</h2>
                        <p>
                          {SubHead1}
                          <span>{SubHead2}</span>
                        </p>
                      </div>
                    </div>
                    <hr className="hr" />
                  </>
                );
              })}
            </div>
            <Link className="view" to="/top-seller">
              {" "}
              View More
            </Link>
          </div>
          <div className="col leaderboardTop">
            <div className="leaderboardTitle">
              <div className="col" style={{ fontSize: "16px" }}>
                Top Collections
              </div>
              <div className="dropdown col leaderboardDropdown">
                <button
                  className="btn border dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Weekly
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="leaderboardTopDetails">
              {LeaderBoardApi.map((curElem) => {
                const { Image, Heading, SubHead1, SubHead2 } = curElem;
                return (
                  <>
                    <div className="leaderboardTopDetailsRow">
                      <img src={Image} alt="" />
                      <div className="LeaderboardInsideDetails">
                        <h2>{Heading}</h2>
                        <p>
                          {SubHead1}
                          <span>{SubHead2}</span>
                        </p>
                      </div>
                    </div>
                    <hr className="hr" />
                  </>
                );
              })}
            </div>
            <Link className="view" to="/top-collection">
              {" "}
              View More
            </Link>
          </div>
        </div>

        <div className="sales">
          <div className="sales1">
            <h1 className="leader1">Top NFT sales</h1>
            <div className="dropdown col btn1">
              <button
                className="btn border dropdown-toggle btn2"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Weekly
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown col btn1">
            <button
              className="btn border dropdown-toggle btmleaderboard btn2"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mx-0 text-center justify">
          {/* <div className="col-md-3 col-lg-3 col-sm-6 col-11 images"> */}
          {LeaderBoardApi2.map((curElem) => {
            const { image, title, price, maxPrice, maxPrice2, daysLeft } =
              curElem;
            return (
              <div className="col-md-3 col-lg-3 col-sm-6 col-11 images">
                <div className="container__tile">
                  <img
                    id="nft__photo"
                    style={{ width: "312px" }}
                    className="img-fluid"
                    src={image}
                    alt="/"
                  />
                  {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
                  <div className="tile__details">
                    <div className="container__up">
                      <h6 className="title">{title}</h6>
                    </div>
                    <div className="container__down">
                      <h6 className="value__high">
                        Sold to
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {maxPrice}
                        </span>
                        for<span>{maxPrice2}</span>
                      </h6>
                      <h6 className="value__k">
                        {daysLeft}{" "}
                        {/* <i className="far fa-clock" style={{ color: "#f54" }}></i> */}
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "#ef3643" }}
                        ></i>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* My Commit */}
        </div>
        {/* </div> */}

        {/* Top NFT sales */}
      </div>
    </div>
  );
}

export default LeaderBoard;
