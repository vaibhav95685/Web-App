import React, { Component } from "react";
// import './Top_collection.css'
import { AbstractApi } from "../API/LeaderBoardApi";

import "../asset/Leader.css";
import { Link } from "react-router-dom";

export class CollectionDetails extends Component {
  render() {
    return (
      <div>
        <div className="position-relative relative">
          <img
            src="https://png.pngtree.com/background/20210714/original/pngtree-blood-drop-halloween-blood-background-black-background-picture-image_1220404.jpg"
            alt=""
          />
        </div>
        <div className="position-absolute absolute">
          <img
            src="https://th.bing.com/th/id/R.e1189efa9cd3aee29c0e1f7dbed689bf?rik=YRidGY7NPM2n3A&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f7ca%2fpeo%2f7capeoboi.png&ehk=MwVRL6ome8bAroWEn5dLYQgaXLxrafgcwcIQX7N48CM%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
          <h2>Abstract Illusions</h2>
          <p style={{ marginTop: "10px", marginBottom: "0px" }}>
            The abstract illusion is a collection of NFT which consist
          </p>
          <p style={{ marginBottom: "0px" }}>
            abstract patterns that create illusion
          </p>
        </div>

        <li className="nav-item dropdown position-absolute absolutedot list-unstyled">
          <a
            className="nav-link dropdown"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontSize: "16px" }}
          >
            <i style={{ color: "#afafaf" }} className="fas fa-ellipsis-h"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item threedot" to="/Report">
                <i
                  style={{ margin: "0px 5px 0px 10px" }}
                  className="fas fa-flag"
                ></i>{" "}
                Report
              </Link>
            </li>
          </ul>
        </li>
        <div className="collectionsales collectionsalesHome">
          <div className="sales1">
            {/* <h1>Top NFT sales</h1> */}
            <div
              className="input-group buying-search-btn"
              style={{ marginLeft: "150px" }}
            >
              <input
                type="text"
                className="form-control border-input input-box-border"
                style={{ marginLeft: "1em", borderRight: "0" }}
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append w-25">
                <button
                  className="btn btn-search-secondary border border-search"
                  type="button"
                  id="button-addon2"
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="dropdown col col1">
              <button
                className="btn border dropdown-toggle col12"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Status
                <i className="fas fa-caret-down"></i>
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
            <div className="dropdown col col1">
              <button
                className="btn border dropdown-toggle col12"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Price
                <i className="fas fa-caret-down"></i>
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
          <div className="dropdown col col11" style={{ marginRight: "3rem" }}>
            <button
              className="btn border dropdown-toggle col12"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by
              <i className="fas fa-caret-down"></i>
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
          {AbstractApi.map((curElem) => {
            const { image, title, price, maxPrice, maxPrice2, daysLeft } =
              curElem;
            return (
              <div
                className="col-md-3 col-lg-3 col-sm-6 col-11 images collectionmob"
                style={{ marginLeft: "35px" }}
              >
                <div className="container__tile">
                  <img
                    id="nft__photo"
                    className="img-fluid"
                    src={image}
                    alt="/"
                  />
                  {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
                  <div className="tile__details">
                    <div className="container__up">
                      <h6 className="title">{title}</h6>
                      <h6 className="title1">{price}</h6>
                    </div>
                    <div className="container__down">
                      <h6 className="value__high">
                        <span style={{ color: "black" }}>{maxPrice}</span>
                        <span> {maxPrice2}</span>
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
        </div>
      </div>
    );
  }
}

export default CollectionDetails;
//   https://image.shutterstock.com/image-vector/background-water-droplets-on-surface-260nw-274829663.jpg
