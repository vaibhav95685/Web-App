import React, { useState } from "react";
import { Link } from "react-router-dom";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../assets/styles/common.css";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { addLikeNft } from "../../services/webappMicroservice";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import useSound from "use-sound";
import sound from "../../assets/sound.mp3";
import playImage from "../../assets/images/Play.svg";
import pauseImage from "../../assets/images/Pause.svg";
import Binance from "../../assets/images/binance.svg";
function LikedNfts({ nft }) {
  const { user } = useSelector((state) => state);
  let _id, cdnUrl, name, salesInfo, compressedURL, blockchain,collectionName,collectionId,previewImage,fileExtension;
  if (nft.userLikedNfts !== undefined) {
    _id = nft.userLikedNfts._id;
    cdnUrl = nft.userLikedNfts.cdnUrl;
    name = nft.userLikedNfts.name;
    salesInfo = nft.userLikedNfts.salesInfo;
    compressedURL = nft.userLikedNfts.compressedURL;
    blockchain = nft.userLikedNfts.blockchain;
    collectionId=nft.userLikedNfts.collectionId;
    collectionName=nft?.userLikedNfts?.collectionName;
    previewImage=nft?.userLikedNfts.previewImage;
    fileExtension=nft?.userLikedNfts.fileExtension;
  }
  const [handleLike, setHandleLike] = useState(true);
  const [videoDisplay, setVideoDisplay] = useState(false);
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
      // navigate("/add-wallet");
    }
  };

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

  return (
    <div className="nftCardEach col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
      <div className="card nft-card-radius border-radius cardmob h-100">
      <div className="card nft-card-radius border-radius cardmob h-100">
        {fileExtension?.toString().includes("audio") ? (
          <div className="image-container">
            
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
                  style={{ display: videoDisplay ? "none":"block"}}
                >
                  <img src={playImage}></img>
                </div>
                <div
                  onClick={() => setVideoDisplay(false)}
                  className="musicIcon"
                  style={{ display: videoDisplay ? "block":"none"}}
                >
                  <img src={pauseImage}></img>
                </div>
              </>
            

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
                  style={{ display: videoDisplay ? "none":"block"}}
                >
                  <img src={playImage}></img>
                </div>
                <div
                  onClick={() => setVideoDisplay(false)}
                  className="musicIcon"
                  style={{ display: videoDisplay ? "block":"none"}}
                >
                  <img src={pauseImage}></img>
                </div>
              
              </>
           

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
          <img
            id="like_icon"
            src={handleLike ? likes : Like}
            alt="like"
            onClick={() => likeNft(_id)}
          />
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
              }}
            >
              {name}
            </div>
            <span className="nftTileEachDetailsFirstContainerValue">
              {blockchainCheck(blockchain)}
              {`${salesInfo?.price}  ${salesInfo?.currency}`}
            </span>
          </div>
          <div
            className="collectionName"
            title={collectionName ? collectionName : "NFTinger Collection"}
          >
            <Link
              style={{
                textDecoration: "none",
              }}
              to={"/collection-details/" + collectionId}
            >
              {undefined !== collectionName && collectionName.length > 30
                ? collectionName.slice(0, 30) + "..."
                : collectionName?.length === 0
                ? "NFTinger Collection"
                : collectionName}
            </Link>
          </div>
          <div className="nftTileEachDetailsSecondContainerValueHighest">
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
    </div>
  );
}

export default LikedNfts;
