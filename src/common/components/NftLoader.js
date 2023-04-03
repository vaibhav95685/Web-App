import React from "react";
import { fetchPalletsColor } from "../../utility/global";
import { Oval } from "react-loader-spinner";

const NftLoader = ({
  nft,
  display,
  successImg,
  title,
  palletsColor,
  success,
  firstHeading,
  heading,
  usdPrice,
  putSalePrice,
}) => {
  const nftPrice = () => {
    let value;
    if (putSalePrice != undefined) {
      value = (usdPrice[0]?.usd * putSalePrice).toFixed(2);
      return "$" + value;
    } else {
      value = (usdPrice[0]?.usd * nft?.salesInfo?.price).toFixed(2);
      return "$" + value;
    }
  };
  return (
    <div
      className="mint-mod-outer"
      style={{
        display: display ? "block" : "none",
      }}
    >
      <div className="mint-abs">
        <div className="">
          <div className="mint-outer" style={{ opacity: "1" }}>
            <div className="mintbody">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="completelistin">{title}</div>
              </div>
              <div className="abstractillusion">
                <img
                  src={
                    nft.previewImage
                      ? nft?.previewImage
                      : nft?.cdnUrl != ""
                      ? nft.cdnUrl
                      : nft.ipfsUrl
                  }
                />
                <div className="abstractillusioncontent">
                  <div className="abstracttitle"></div>
                  <div
                    className=""
                    title={
                      nft.collectionName
                        ? nft.collectionName
                        : "NFTinger Collection"
                    }
                    style={{
                      cursor: "pointer",
                      color: `${fetchPalletsColor(palletsColor)}`,
                    }}
                  >
                    {undefined !== nft?.collectionName && nft?.collectionName
                      ? nft?.collectionName
                      : nft?.collectionName?.length === 0
                      ? "NFTinger Collection"
                      : nft?.collectionName}
                  </div>
                  <div className="abstractposter"> {nft.name}</div>
                  <div className="ethprice">{`${
                    putSalePrice?.length != undefined
                      ? putSalePrice
                      : nft?.salesInfo?.price
                  }  ${nft?.salesInfo?.currency}`}</div>
                  <div className="ethprice">{`${nftPrice()}`}</div>
                </div>
              </div>
              <div className="checkpostcontainer">
                <div className="checkpost">
                  <img src={successImg} className="checkimg" />
                  <div className="checkimg"></div>
                  <div className="checkposttext">
                    <div className="heading">{firstHeading}</div>
                    <div className="description"></div>
                  </div>
                </div>
                <div className="checkpost">
                  {/* <img src={success} className="checkimg" /> */}
                  <div className="checkimg">
                    {success ? (
                      <img src={successImg} className="checkimg" />
                    ) : (
                      <Oval
                        vertical="top"
                        horizontal="center"
                        color="#00BFFF"
                        height={30}
                        width={30}
                      />
                    )}
                  </div>
                  <div className="checkposttext">
                    <div className="heading">{heading.toString()}</div>
                    <div className="description"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftLoader;
