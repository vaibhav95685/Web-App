import React from "react";
import UpperMyItems from "../../common/components/UpperMyItems";
// import { Link } from "react-router-dom";
// import UpperMyItems from "./UpperMyItems";

function MyItems() {
  return (
    <>
      <UpperMyItems />
      <div className=" col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
      <div className="card nft-card-radius border-radius cardmob">
        <Link to={route} style={{ textDecoration: "none" }}>
          <img
            className="nftTileEachImage img-fluid border-radius nft-img-radius card_imgmob"
            src={ipfsUrl}
          />
        </Link>
        <img
          id="like_icon"
          onClick={() => likeNft(_id)}
          // src={require("../../assets/images/Like.png")}
          // src={require("../../assets/images/Like.svg")}
          src={handleLike ? Like : likes}
        />
        <div
          className="nftTileEachDetails card-lower"
          style={{
            padding: "0px 14px 0px 12px",
          }}
        >
          <div className="nftTileEachDetailsFirstContainer container__up">
            <div
              className="nftTileEachDetailsFirstContainerName"
              style={{
                color: "#191919",
                height: "20px",
                overflow: "hidden",
              }}
            >
              {name}
            </div>
            <span
              className="nftTileEachDetailsFirstContainerValue"
              style={{
                fontSize: "14px",
                fontWeight: "600px",
                color: "#16AB6E",
              }}
            >
              {salesInfo?.price + salesInfo?.currency}
            </span>
          </div>
          <div
            className="nftTileEachDetailsSecondContainerValueHighest"
            // style={{ marginLeft: "1em" }}
          >
            <div>
              {" "}
              {/* Highest bid:{" "}
            <span className="font-weight-900">100</span>{" "} */}
            </div>
            <div>
              <span className="" style={{ color: "#000" }}>
                <i className="far fa-clock" style={{ color: "#f54" }}></i>5 days
                left
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MyItems;
