import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Like from "../../assets/images/Like.svg";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../assets/styles/common.css";
import { ShimmerThumbnail } from "react-shimmer-effects";
import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
import { calculateExpireSale, calculateExpireSaleInMiniSeconds, calculateExpireTime, fetchPalletsColor, getParamTenantId } from "../../utility/global";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import useSound from "use-sound";
import sound from "../../assets/sound.mp3";
import playImage from "../../assets/images/Play.svg";
import pauseImage from "../../assets/images/Pause.svg";
import Countdown from "react-countdown";


function NftCardsHome({ nft, appearance, loader,mt }) {
  // let history = useHistory();

  const navigate = useNavigate();
  const { user, sideBar } = useSelector((state) => state);
  const {
    _id,
    cdnUrl,
    name,
    biddingDetails,
    salesInfo,
    isLiked,
    compressedURL,
    previewImage,
    fileExtension,
    blockchain,
    collectionName,
    collectionId,
  } = nft;
  const [handleLike, setHandleLike] = useState(true);
  // const currDate = new Date();
  // const endDate = biddingDetails.endDate;
  // const daysleft = new Date(endDate - currDate).getDate() - 1;
  const route = "/nft-information/" + _id;
  const likeNft = (id) => {
    if (user?.loggedInUser?._id) {
      const data = {
        contentId: id,
        addedBy: user?.loggedInUser?._id,
      };
      addLikeNft(data);
      setHandleLike(!handleLike);
    } else {
      toast.error("Not logged in");
    }
  };
  // const difftime = (timestamp1, timestamp2) => {
  //   var difference = timestamp1 - timestamp2;
  //   var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

  //   return daysDifference;
  // };
  // const currDate = new Date();
  // const stamp2 = Date.now(currDate);
  // const stamp1 = Date.now(nft.biddingDetails.endDate);
  // const days = difftime(stamp1, stamp2);

  const difftime = (timestamp1, timestamp2) => {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    return daysDifference;
  };

  let showDateSection = true;

  let message = "";

  if (nft?.biddingDetails?.endDate) {
    const currDate = new Date();

    const currentDate = Date.now(currDate);

    const endDate = nft?.biddingDetails?.endDate;

    let endDateTimeStamp = Math.floor(new Date(endDate).getTime());

    const days =
      endDateTimeStamp == currentDate
        ? 1
        : difftime(endDateTimeStamp, currentDate);

    message = endDateTimeStamp < currentDate ? "Expired" : `${days} days left`;
  } else {
    showDateSection = false;
  }

  let [imageLoading, setImageLoading] = useState({
    src: cdnUrl,
    loaded: false,
  });

  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  };

  const blockchainCheck = (blockchain) => {
    switch (blockchain) {
      case "Ethereum":
        return <img className="currency-sign" src={Ethereum}></img>;
      case "Polygon":
        return <img className="currency-sign" src={Polygon}></img>;
      case "Binance":
        return <img className="currency-sign" src={Binance}></img>;
      default:
        return "";
    }
  };
  const [videoDisplay, setVideoDisplay] = useState(false);
  const soundUrl = sound;
  const [playbackRate, setPlaybackRate] = React.useState(0.75);

  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.2,
  });

  const handleClick = () => {
    setPlaybackRate(playbackRate + 0.1);
    play();
  };

  return (
    <div className={`nftCardEach col-md-6 col-lg-3  col-sm-12  ${mt?.length > 0 ? mt : "mt-5"} nft_card`}>
      <div className="card nft-card-radius border-radius cardmob h-100">
        {fileExtension?.toString().includes("audio") ? (
          <div className="image-container">
            {loader ? (
              <Skeleton height={`187px`} />
            ) : (
              <>
                <Link to={route} style={{ textDecoration: "none" }}>
                  <img
                    className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
                    src={previewImage}
                    alt="nft-img"
                    onLoad={onImageLoad}
                    onMouseDown={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </Link>
                <div
                  className="videoDiv"
                  style={{ display: videoDisplay ? "block" : "none" }}
                >
                  <ReactPlayer
                    className="react-player"
                    height={0}
                    width="100%"
                    playing={videoDisplay}
                    url={cdnUrl}
                  />
                </div>

                <div
                  onClick={() => setVideoDisplay(true)}
                  className="musicIcon"
                  style={{ display: videoDisplay ? "none" : "block" }}
                >
                  <img src={playImage}></img>
                </div>
                <div
                  onClick={() => setVideoDisplay(false)}
                  className="musicIcon"
                  style={{ display: videoDisplay ? "block" : "none" }}
                >
                  <img src={pauseImage}></img>
                </div>
              </>
            )}

            {!imageLoading.loaded && (
              <div className="loaderNft ">
                <ShimmerThumbnail
                  className="thumbnail"
                  fitOnFrame={true}
                  rounded
                />
              </div>
            )}
          </div>
        ) : fileExtension?.toString().includes("video") ? (
          <div className="image-container">
            {loader ? (
              <Skeleton height={`187px`} />
            ) : (
              <>
                <Link to={route} style={{ textDecoration: "none" }}>
                  <img
                    className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
                    src={previewImage}
                    style={{ display: videoDisplay ? "none" : "block" }}
                    alt="nft-img"
                    onLoad={onImageLoad}
                    onMouseDown={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </Link>
                <div
                  className="videoDiv"
                  style={{ display: videoDisplay ? "block" : "none" }}
                >
                  <ReactPlayer
                    className="react-player"
                    controls={false}
                    playing={videoDisplay}
                    width="100%"
                    height={187}
                    url={cdnUrl}
                  />
                </div>
                <div
                  onClick={() => setVideoDisplay(true)}
                  className="musicIcon"
                  style={{ display: videoDisplay ? "none" : "block" }}
                >
                  <img src={playImage}></img>
                </div>
                <div
                  onClick={() => setVideoDisplay(false)}
                  className="musicIcon"
                  style={{ display: videoDisplay ? "block" : "none" }}
                >
                  <img src={pauseImage}></img>
                </div>

              </>
            )}

            {!imageLoading.loaded && (
              <div className="loaderNft ">
                <ShimmerThumbnail
                  className="thumbnail"
                  fitOnFrame={true}
                  rounded
                />
              </div>
            )}
          </div>
        ) : (
          <div className="image-container">
            {loader ? (
              <Skeleton height={`187px`} />
            ) : (
              <>
                <Link to={route} style={{ textDecoration: "none" }}>
                  <img
                    className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
                    src={compressedURL}
                    alt="nft-img"
                    onLoad={onImageLoad}
                    onMouseDown={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </Link>
              </>
            )}

            {!imageLoading.loaded && (
              <div className="loaderNft ">
                <ShimmerThumbnail
                  className="thumbnail"
                  fitOnFrame={true}
                  rounded
                />
              </div>
            )}
          </div>
        )}

        <span>
          {isLiked ? (
            <img
              id="unlike_icon"
              src={handleLike ? likes : Like}
              alt="like"
              onClick={() => {
                likeNft(_id);
                handleClick();
              }}
            />
          ) : (
            <img
              id="like_icon"
              src={handleLike ? Like : likes}
              alt="like"
              onClick={() => {
                likeNft(_id);
                handleClick();
              }}
            />
          )}
        </span>
        <div
          className="nftTileEachDetails card-lower"
          style={{
            padding: "0px 12px 0px 14px",
          }}
        >
          <div className="nftTileEachDetailsFirstContainer container__up">
            <div
              className="nftTileEachDetailsFirstContainerName poppins-normal bold-bold font-16"
              style={{
                color: "#191919",
                overflow: "hidden",
                width: "58%",
              }}
              title={name}
            >
              {loader ? <Skeleton /> : name}
            </div>
            {loader ? (
              <Skeleton width={`80px`} />
            ) : (
              <span className="nftTileEachDetailsFirstContainerValue">
                {blockchainCheck(blockchain)}
                {`${salesInfo?.price !=null ? salesInfo.price  :""}  ${salesInfo?.price ? salesInfo?.currency:""}`}
              </span>
            )}
          </div>
          <div
            className="collectionName"
            title={collectionName ? collectionName : "NFTinger Collection"}
          >
            {loader ? (
              <Skeleton width={`200px`} />
            ) : (
              <>
                <Link
                  style={{
                    textDecoration: "none",
                    color: `${fetchPalletsColor(appearance.colorPalette)}`,
                  }}
                  className={`${salesInfo?.isOpenForSale ? 'text-overflow-collection' : ''}`}
                  to={"/collection-details/" + collectionId}
                >
                  {undefined !== collectionName && collectionName.length > 30
                    ? collectionName.slice(0, 30) + "..."
                    : collectionName?.length === 0
                      ? "NFTinger Collection"
                      : collectionName}
                </Link>

                {
                  salesInfo?.expiryDateTime !== null ?
                    <a style={{ color: '#191919' }}><i className="far fa-clock clock-icon" style={{ width: '18px' }} />
                      {/* {calculateExpireSale(salesInfo?.expiryDate) ? `${calculateExpireSale(salesInfo?.expiryDate)} days left` : 'Expires today'} */}
                      <Countdown date={salesInfo?.expiryDateTime} renderer={calculateExpireTime} />
                    </a>
                    : null
                }
              </>
            )}
          </div>

          <div
            className="nftTileEachDetailsSecondContainerValueHighest"
          // style={{ marginLeft: "1em" }}
          >
            {/* <div>
              {" "}
              Highest bid:{" "}
              <span className="font-weight-900">100</span>{" "}
            </div> */}
            <div>
              {showDateSection ? (
                <span
                  className=""
                  style={{ color: "#000", marginRight: "4px" }}
                >
                  <i
                    className="far fa-clock"
                    style={{ color: "#f54", fontSize: "13.36px" }}
                  ></i>

                  <span className="poppins-normal blackish font-14">
                    &nbsp;{message}
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCardsHome;
