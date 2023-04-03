import React, { useState } from "react";
import image from "../../assets/images/Fixed.png";
import image1 from "../../assets/images/Highest.png";
// import Toggle from "../asset/images/toggle.PNG";

export default function FixedPrice() {
  const [activeInActive, setActiveInActive] = useState("active");
  return (
    <>
      <div className="container">
        <p className="font-22 font-weight-900 text-center mt-5">Create NFT</p>
        <div className="row fixed_pricemob2">
          <div className="col-lg-3"></div>
          <div className="col-sm-12 col-lg-3 col-md-6 fixed_pricemob3">
            <a
              href="#pills-active_fixed"
              onClick={() => setActiveInActive("active")}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{
                  borderRadius: "8px",
                  width: "270px",
                  height: "130px",
                }}
              >
                <div className="row">
                  <div className="col-sm-2">
                    <img
                      className="mt-4 fixed_priceimgmob"
                      src={image}
                      width={60}
                    />
                  </div>
                  <div className="col-sm-10">
                    <div
                      className="mt-4 fixed_pricepara"
                      style={{ paddingLeft: "30px" }}
                    >
                      <p className="font-16 font-weight-550 text-dark">
                        Fixed Price
                      </p>
                      <p className="font-15 text-grey">
                        Sell at a constant price
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-sm-12 col-lg-3 col-md-6 fixed_pricemob">
            <a
              href="#pills-active_highest"
              onClick={() => setActiveInActive("inActive")}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{
                  borderRadius: "8px",
                  width: "270px",
                  height: "130px",
                  marginLeft: "40px",
                }}
              >
                <div className="row">
                  <div className="col-sm-2">
                    <img
                      className="mt-4 fixed_priceimgmob"
                      src={image1}
                      width={50}
                    />
                  </div>
                  <div className="col-sm-10">
                    <div
                      className="mt-4 fixed_pricepara"
                      style={{ paddingLeft: "30px" }}
                    >
                      <p className="font-16 font-weight-550 text-dark">
                        Highest Bid
                      </p>
                      <p className="font-15 text-grey">
                        Sell to the highest <br />
                        bidder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3"></div>
        </div>
        <div className="Data">
          {activeInActive === "active" ? (
            <FixedPriceComponent />
          ) : (
            <HighestPriceComponent />
          )}
        </div>
      </div>
    </>
  );
}

const FixedPriceComponent = () => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);
  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <form>
            <div className="row">
              <label className="font-14 font-weight-700 mb-3">Price*</label>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0.25"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <span
                    className="input-group-text font-14 text-primary"
                    style={{ backgroundColor: "#fff" }}
                  >
                    ETH
                  </span>
                </div>
              </div>
            </div>
            <h5 className="text-secondary font-13 mt-3">
              Will be on sale until you transfer or cancel the item
            </h5>
            <div className="row">
              <div className="col-lg-5">
                <div className="row">
                  <label className="font-14 font-weight-700 mt-3">
                    Schedule for Future time
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="MM/DD/YY"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{
                    borderRadius: "5px",
                    borderColor: "#C8C8C8",
                  }}
                />
              </div>
              <div className="col-lg-2">
                <h5
                  className="text-secondary font-15"
                  style={{ marginTop: "4em" }}
                >
                  at
                </h5>
              </div>
              <div className="col-lg-5">
                <div className="row">
                  <label
                    className="toggle-switch toggle-switchmob "
                    style={{ marginTop: "10px", marginLeft: "216px" }}
                  >
                    <input
                      type="checkbox"
                      checked={isToggled}
                      onChange={onToggle}
                    />
                    <span className="switch" />
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Time"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{
                    borderRadius: "5px",
                    borderColor: "#C8C8C8",
                  }}
                />
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary mt-3 fixed-post-btn pricebtn"
            style={{ width: "640px" }}
          >
            Post
          </button>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </>
  );
};

const HighestPriceComponent = () => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <form>
            <div className="row">
              <label className="font-14 font-weight-700">Price*</label>
            </div>
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="0.25"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
            </div>
            <h5 className="text-secondary font-13 mt-3">
              Set your starting bid
            </h5>
            <div className="row">
              <div className="col-lg-5">
                <div className="row">
                  <h5 className="font-14 font-weight-700 mt-3">Start Date</h5>
                </div>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="MM/DD/YY"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{
                    borderRadius: "5px",
                    borderColor: "#C8C8C8",
                  }}
                />
              </div>
              <div className="col-lg-2">
                <h5
                  className="text-secondary font-15"
                  style={{ marginTop: "4.3em" }}
                >
                  at
                </h5>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Time"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{
                    borderRadius: "5px",
                    borderColor: "#C8C8C8",
                    marginTop: "3.5em",
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <div className="row">
                  <h5 className="font-14 font-weight-700 mt-3">End Date</h5>
                </div>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="MM/DD/YY"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{
                    borderRadius: "5px",
                    borderColor: "#C8C8C8",
                  }}
                />
              </div>
              <div className="col-lg-2">
                <h5
                  className="text-secondary font-15"
                  style={{ marginTop: "4.3em" }}
                >
                  at
                </h5>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Time"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{
                    borderRadius: "5px",
                    borderColor: "#C8C8C8",
                    marginTop: "3.5em",
                  }}
                />
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary mt-3 highest-post-btn"
            style={{ width: "640px" }}
          >
            Post
          </button>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </>
  );
};
// yash
