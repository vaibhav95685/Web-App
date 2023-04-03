import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
import Spinner from "../../common/components/Spinner";
import { ShimmerThumbnail } from "react-shimmer-effects";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import playImage from "../../assets/images/Play.svg";
import pauseImage from "../../assets/images/Pause.svg";
import ReactPlayer from "react-player";
import useSound from "use-sound";
import sound from "../../assets/sound.mp3";
import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global";
function CollDetailCard({ nft }) {
  const navigate = useNavigate();
  const { user, sideBar } = useSelector((state) => state);
  const { _id, cdnUrl, name, biddingDetails, salesInfo,blockchain ,compressedURL,previewImage,fileExtension} = nft;
  const [handleLike, setHandleLike] = useState(true);

  const diffTime = (timestamp1, timestamp2) => {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    return daysDifference;
  };
  let showDateSection = true;
  let message = '';
  if (biddingDetails.endDate) {
    const currDate = new Date();
    const currentDate = Date.now(currDate);
    const endDate = biddingDetails.endDate;
    let endDateTimeStamp = Math.floor(new Date(endDate).getTime());
    const days = (endDateTimeStamp == currentDate) ? 1 : diffTime(endDateTimeStamp, currentDate);
    message = (endDateTimeStamp < currentDate) ? "Expired" : `${days} days left`;
  } else {
    showDateSection = false;
  }

  const route = "/nft-information/" + _id
  const likeNft = (id) => {
    if (user.loggedInUser == null) {
      navigate("/add-wallet");
    }
    // alert("like");

    const data = {
      contentId: id,
      addedBy: user.loggedInUser._id,
    };
    addLikeNft(data);
    setHandleLike(!handleLike);
  };
  let [imageLoading,setImageLoading]=useState({src:cdnUrl,loaded:false })

  const onImageLoad=()=>{
    setImageLoading({...imageLoading,loaded:true});
  }
  
  const blockchainCheck=(blockchain)=>{
    switch(blockchain){
      case 'Ethereum':
      return <img className="currency-sign" src={Ethereum}></img>
      case 'Polygon':
      return <img  className="currency-sign" src={Polygon}></img>
      case 'Binance':
      return <img className="currency-sign" src={Binance}></img>
      default:
        return '';
    }
    
  }
  const [videoDisplay, setVideoDisplay] = useState(false);

  return (
    <div
      className=" col-md-6 col-lg-3  col-sm-12  mt-5 mr-2 nft_card"
    >
      <div className="card nft-card-radius border-radius cardmob">
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
        <img
          id="like_icon"
          alt="like"
          onClick={() => likeNft(_id)}        
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
                // height: "20px",
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
               {blockchainCheck(blockchain)}
              {salesInfo?.price!=null ? salesInfo?.price :""} {salesInfo?.price ? salesInfo?.currency:""}
            </span>
          </div>
          <div
            className="nftTileEachDetailsSecondContainerValueHighest"
            // style={{ marginLeft: "1em" }}
          >
            <div>
        
            </div>
            <div>
            {(showDateSection) ? <span className="" style={{ color: "#000", marginRight: "4px" }}>
                <i className="far fa-clock" style={{ color: "#f54", fontSize: "13.36px", }}></i>
                <span className="poppins-normal blackish font-14">
                  &nbsp;{message}
                </span>
              </span> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollDetailCard;
