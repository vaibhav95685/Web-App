import React, { Component, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "../../assets/styles/Notification.css";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global";


function NftToggle({ toggleNft, appearance, loader }) {
  // const [toggleNft, setToggleNft] = useState(true);

  return (
    <>
      <div id="upper__home" className="">
        <div className="upper__homepage">
          <h1 className="font-20 font-weight-700">
            {loader ? <Skeleton width={`200px`} height={`45px`} /> : 'Marketplace'}
          </h1>
        </div>
        <div className="middle__homepage">
          <div>
            <div className="toggle-container">
              {
                loader ? <Skeleton className="mr-r-10" width={`100px`} /> :
                  <Link
                    className="font-18 text-center toggle-nft toggle-common"
                    style={{
                      textDecoration: "none",
                      width: "108px",
                      color: toggleNft ? "#191919" : "#858585",
                      // color: "#000",
                      fontFamily: toggleNft ? "poppins-semibold" : "poppins",
                    }}
                    to={`/nfts`}
                  >
                    {/* <div onClick={() => setToggleNft(true)}>NFTS</div> */}
                    NFTS
                  </Link>
              }
            </div>
            {loader === false ? <div style={{ paddingTop: toggleNft ? "0px" : '2px' }}>
              <hr style={{ width: "108px", height: toggleNft ? "4px" : "1px", color: toggleNft ? `${fetchPalletsColor(appearance.colorPalette)}` : '#C7C7C7', opacity: 'inherit' }}
                className="toggle-line" />
            </div> : null}
          </div>
          <div>
            <div className="toggle-container">
              {
                loader ? <Skeleton width={`100px`} /> :
                  <Link
                    // onClick={() => setToggleNft(false)}
                    className="font-18 text-center toggle-common"
                    style={{
                      textDecoration: "none",
                      color: !toggleNft ? "#191919" : "#858585",
                      fontFamily: "poppins-semibold",
                      // marginLeft: "2em",
                      width: "120px",
                    }}
                    to={`/collections-tile`}
                  >
                    {/* <div onClick={() => setToggleNft(false)}>Collections</div> */}
                    Collections
                  </Link>
              }
            </div>
            {
              loader === false ? <div style={{ paddingTop: toggleNft ? "2px" : '0px' }}>
              <hr style={{ width: "118px", height: toggleNft ? "1px" : "4px", color: toggleNft ? "#C7C7C7" : `${fetchPalletsColor(appearance.colorPalette)}`, opacity: 'inherit' }}
                className="toggle-line" />
            </div> : null
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default NftToggle;
