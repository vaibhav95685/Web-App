import React, { useState, useEffect } from "react";
import { FacebookShareButton } from "react-share";
import { TwitterShareButton } from "react-share";
import share from "../../assets/images/share.svg";
import Utils from "../../utility";
import info from "../../assets/images/report.svg";
import copyIcon from "../../assets/images/CopyIcon.svg";
import Imagep from "../../assets/images/imagep.svg";
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/Twitter.png";
import "../../assets/styles/nftReportModal.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentService from "../../services/contentMicroservice";
import { BidApi, OfferApi } from "../../constants/Nft_Info_Api";
import PricingHistoryComponentTable from "../../common/components/PricingHistoryComponentTable";
import PricingHistoryComponentGraph from "../../common/components/PricingHistoryComponentGraph";
// import BidsComponent from "./BidsComponent";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../assets/styles/createSingleNft.css";
import success from "../../assets/images/Check.svg";
import closeIcon from "../../assets/images/closeIcon.svg";
import { Button } from "@mui/material";
import { getNft, addNftReport } from "../../services/webappMicroservice";
import { useSelector } from "react-redux";
import Spinner from "../../common/components/Spinner";
import DateTimePicker from "react-datetime-picker"
import {
  put_NftOpenForSale,
  RemoveNftFromSale,
} from "../../services/contentServices";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import Snackbar from "@mui/material/Snackbar";
import styled from "styled-components";
import ListingsTable from "../../common/components/ListingTable";
import Offer from "../../common/components/Offer";
import DetailPage from "../../common/components/DetailPage";
import CopyToClipboard from "react-copy-to-clipboard";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import {
  getCollection,
  getNftsByCollectionId,
} from "../../services/webappMicroservice";
import LikedNfts from "../../modules/MyPages/LikedNfts";
import NftCardsHome from "../../common/components/NftCardsHome";
import "../../assets/styles/myProfile.css";
import PageNotFound from "../../common/components/pageNotFound";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { calculateExpireSale, calculateExpireSaleInMiniSeconds, fetchPalletsColor, getParamTenantId } from "../../utility/global";

import NftInfoShimmer from "./NftInfoShimmer";

import ReactPlayer from "react-player";
import Countdown from "react-countdown";
import ReactSelect from "react-select";
// Add this import line at the top
 //import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
 import "@crossmint/client-sdk-vanilla-ui";
 import StripeCheckout from 'react-stripe-checkout';
 import NftLoader from "../../common/components/NftLoader";
import MoreFromNFT from "../../common/components/moreFromNFT";

toast.configure();
const CustomSnack = styled(Snackbar)`
  @media (min-width: 992px) {
    position: absolute !important;
    top: 69px !important;
    left: auto !important;
    right: auto !important;
  }

  @media only screen and (min-width: 0px) and (max-width: 991px) {
    display: none !important;
  }
`;
const CustomSnack2 = styled(Snackbar)`
  @media only screen and (min-width: 992px) and (max-width: 5000px) {
    display: none !important;
  }

  @media only screen and (min-width: 770px) and (max-width: 991px) {
    position: absolute !important;
    top: 69px !important;
    left: auto !important;
    right: 0px !important;
  }
  @media only screen and (min-width: 701px) and (max-width: 769px) {
    position: absolute !important;
    top: 69px !important;
    left: auto !important;
    right: 140px !important;
  }
  @media only screen and (min-width: 504px) and (max-width: 700px) {
    width: 86px;
    position: absolute !important;
    top: 161px !important;
    left: 402px !important;
    right: 8px !important;
  }
  @media only screen and (min-width: 0px) and (max-width: 503px) {
    width: 86px;
    position: absolute !important;
    top: 161px !important;
    left: 190px !important;
    right: 8px !important;
  }
`;
const Select = styled.select`
  border: none;
  border-radius: 4px;
  width: 126px;
  height: 40px;
  padding-left: 13px;
  font-family: "poppins-medium";
  font-size: 14px;
  line-height: 21px;
  color: #191919;
  background-color: #fff;
  cursor: pointer;
`;
const Option = styled.option`
  font-size: 14px;
`;
const queryString = require("query-string");






export default function NftInformation(props) {
  const [timeCheck,setTimeCheck]=useState(true);
  const appearance = useSelector((state) => state.customize.appearance);

  const navigate = useNavigate();
  const [activeInActive, setActiveInActive] = useState("active");
  const { user } = useSelector((state) => state);
  const [isCurrUserNft, setIsCurrUserNft] = useState(null);
  const [isOpenForSell, setisOpenForSell] = useState(null);
  const [error, setError] = useState("");
  const { loggedInUser, walletAddress } = user;
  const { id } = useParams();


  const nft = props?.responseData;

  const defaultFilter = {
    searchByName: "",
    status: "",
    sortBy: "",
    minPrice: "",
    maxPrice: "",
  };
 
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setTimeCheck(false);
      return <span>Sales Ended</span>;
    } else {
      // Render a countdown
      return <span>
        {days > 0 ? days < 10 ? `0${days}d ` : `${days}d `: ''}
        {hours < 10 ? `0${hours}` : hours}h{" "}
        {minutes < 10 ? `0${minutes}` : minutes}m{" "}
        {seconds < 10 ? `0${seconds}` : seconds}s
      </span>;
    }
  };


  useEffect(async ()=>{


    if(!timeCheck){
      // Render a completed state
   let requestData = {
     _id: nft._id,
   };
   let [error, result] = await Utils.parseResponse(
     ContentService.removeFromSale(requestData)
   );
   if (error || !result) {
     return toast.error(error || "Unable to update Nft content.", {
       autoClose: 5000,
     });
   } else {
    props.getNftDetail();
   }

   }

  },[!timeCheck])



  const { owner, creator, salesInfo, blockchain, offers } = nft;





  const [openReportModal, setOpenReportModal] = useState(false);
  const [saleModal, setsaleModal] = useState(false);
  const [putOnSaleModal, setPutOnSaleModal] = useState(false);
  const [removeFromSale, setRemoveFromSale] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [cryptoPriceUSD,setCryptoPrice]=useState({});

  const [openRemoveSale, setOpenRemoveSale] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [tab, setTab] = useState(1);
  const [toShow, settoShow] = useState(true);
  const [makeOfferModal, setMakeOfferModal] = useState(false);
  const [filter, setFilter] = useState(defaultFilter);
  const [moreNft, setMoreNfts] = useState([]);
  // const [dateTimeValue, setDateTimeValue] = useState("");
  const [dateTimeValue, setDateTimeValue] = useState({
    date:"",
    time:"",
  });
  const [salePrice, setSalePrice] = useState("");
  const [makeOfferDate,setMakeOfferDate]=useState("");
  let [makeOfferDetails, setMakeOfferDetails] = useState({
    price: 0,
    dateTime: "",
  })


  let period = {
    expiryDate: dateTimeValue.date,
    expiryTime: dateTimeValue.time,
    price: salePrice
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const userIdLocal = localStorage.getItem("userId");

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [report, setReport] = useState({
    contentId: id,
    addedBy: loggedInUser?._id,
    reason: "",
  });
  if (!props.loaderState) {
    // setRemoveFromSale(false)
    // setOpenLoadingModal(false)
  }
  const [reason, setReason] = useState("");

  if (openReportModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (openRemoveSale) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(()=>{
    async function cryptodata(){
      if(nft.salesInfo.currency!=undefined){
        const [error,res]= await Utils.parseResponse(
          ContentService.cryptoPrice(nft?.salesInfo?.currency)
        )
        if(res.success)
        {
          setCryptoPrice(res.responseData)
        }
        else{
          setCryptoPrice("");
        }
        }
    }
    cryptodata();
    
  },[nft])
  useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      const reqObj = queryString.stringify(filter);

      if (nft?.collectionId) {
        await getNftsByCollectionId(nft?.collectionId, reqObj).then((res) => {
          setMoreNfts(res.nftContent);
          // setIsLoading(false);
        });
      }
    }
    fetchData();
  }, [nft]);

  let newId=id;
  useEffect(() => {
    if(id!=="")
    props.getNftDetail();
  }, [id]);

  // alert(`${loggedInUser?._id}, ${props?.responseData?.createdBy}`);

  // useEffect(() => {
  //   alert(`${loggedInUser?._id}`);

  // }, []);

  // setIsCurrUserNft(props.responseData.createdBy === loggedInUser?._id);
  // setisOpenForSell(props.responseData.salesInfo?.isOpenForSale);
  // alert(`${isCurrUserNft}, ${isOpenForSell}`);
  // useEffect(() => {
  //     // alert("data")

  //     // setNft();
  //     // setIsCurrUserNft(props.responseData.createdBy == loggedInUser._id);

  // }, []);
  // alert(`${isCurrUserNft},${loggedInUser._id},${isOpenForSell}`);

  const facebook = async () => {
    window.open("https://www.facebook.com/", "_blank");
  };
  const twitter = async () => {
    window.open("https://twitter.com/i/flow/login", "_blank");
  };
 

  const priceValidation = (nftPrice, xy) => {
    if (nftPrice.length == 0) {
      setError("( price is required)");
      return false;
    } else if (nft.blockchain === "Ethereum" && nftPrice < 0.004) {
      setError(
        "( Minimum listing price for an NFT should be more than 0.004 ETH )"
      );
      return false;
    } else if (nft.blockchain === "Polygon" && nftPrice < 11.71) {
      setError(
        "( Minimum listing price for an NFT should be more than 11.71 MATIC )"
      );
      return false;
    } else if (nft.blockchain === "Binance" && nftPrice < 0.027) {
      setError(
        "( Minimum listing price for an NFT should be more than 0.027 BNB )"
      );
      return false;
    } else if (nft.blockchain === "Ethereum" && nftPrice > 1000000000) {
      setError(
        "( Maximum listing price for an NFT should be less than 1,000,000,000 ETH )"
      );
      return false;
    } else if (nft.blockchain === "Polygon" && nftPrice > 2929880265000) {
      setError(
        "( Maximum listing price for an NFT should be less than 2,929,880,265,000 MATIC )"
      );
      return false;
    } else if (nft.blockchain === "Binance" && nftPrice > 6841316000) {
      setError(
        "( Maximum listing price for an NFT should be less than 6,841,316,000 BNB )"
      );
      return false;
    } else {
      setError("");
      return true;
    }
  };



  const removeNFTFromSell = async () => {
    setRemoveFromSale(true);
    props?.removeNftFromSale({
      // sellerId:loggedInUser._id,
      // buyerId:loggedInUser._id,
      // saleData:response.salesInfo,
      // tokenId:response.tokenId,
      // nftId:response._id,
      blockchain: nft?.blockchain,
    });
    // setRemoveFromSale(false)
  };
  const BuyerInfo = {
    buyerId: loggedInUser?._id,
    newOwnerAddress: walletAddress?.address,
  }
  const buyNft = async () => {


   
    if (user.loggedInUser != null) {
      props?.BuyNowNft({
        buyerId: loggedInUser?._id,
        newOwnerAddress: walletAddress?.address,
        blockchain: nft?.blockchain,
      });
      setOpenLoadingModal(true);
    } else {
      navigate("/add-wallet");
    
    }




    //   const response = await put_NftOpenForSale(nft._id);
    //   if (response.success) {
    //     toast.success(response.message);
    //     window.location.reload(false);
    //   } else toast.error(response.message);
  };
  const makeOffer = async () => {
    setMakeOfferModal(true);
  };
  const openSaleModal = async () => {
    // alert("kkkk")
    navigate(`/nft-information/sell-nft/${id}/${nft.salesInfo.currency}`)
  };
  const handleRemoveSell = async () => {
    const response = await RemoveNftFromSale(nft._id);
    if (response.success) {
      toast.success(response.message);
      window.location.reload(false);
    } else toast.error(response.message);
  };

  const handleChange = (e) => setReason(e.target.value);

  const makeReport = () => {
    addNftReport(report);
  };
  // const makeReport = () => {
  //   addNftReport(report);
  // };

  const sendButton = () => {
    removeNFTFromSell();
    setOpenRemoveSale(false);
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

    message =
      endDateTimeStamp < currentDate ? "Expired" : `End in ${days} days`;
  } else {
    showDateSection = false;
  }

  const sendReport = async () => {
    let report = {
      contentId: id,
      addedBy: loggedInUser?._id,
      reason: `${reason}`,
    };
    const reportObj = queryString.stringify(report);
    await addNftReport(reportObj, (response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error("This Nft is already reported");
      }
      setOpenReportModal(false);
    });
  };

  let ownedBy = owner != undefined ? owner[0]?.userName ? owner[0]?.userName : owner[0]?.wallet_address:"";
  let createdBy =  creator != undefined ?  creator[0]?.userName? creator[0]?.userName : creator[0]?.wallet_address:"";
  const url = window.location.href;

  const blockchainCheck = (blockchain) => {
    switch (blockchain) {
      case "Ethereum":
        return (
          <img className="currency-sign-nftinformation" src={Ethereum}></img>
        );
      case "Polygon":
        return (
          <img className="currency-sign-nftinformation" src={Polygon}></img>
        );
      case "Binance":
        return (
          <img className="currency-sign-nftinformation" src={Binance}></img>
        );
      default:
        return "";
    }
  };
  let [imageLoading, setImageLoading] = useState({
    src: nft.cdnUrl,
    loaded: false,
  });
  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  };
  const [display, setDisplay] = useState(false);
  let [RandomWalletAddress,setRandomWalletAddress]=useState("")

const [offerLoadingModal,setOfferLoadingModal]=useState(false);
  const SubmitMakeOffer= async ()=>{
    setOfferLoadingModal(true);

    const result= await props?.makeOffer({
        price:makeOfferDetails.price,
        dateTime:makeOfferDetails.dateTime,
      }) 
      setOfferLoadingModal(false);
      setMakeOfferModal(false);
      setRandomWalletAddress(result.walletAddress);
  }

  const options = [
    { value: "Fake collection or possible scam", label: "Fake collection or possible scam" },
    { value: "Explicit and sensitive content", label: "Explicit and sensitive content" },
    { value: "Might be stolen", label: "Might be stolen" },
    { value: "Other", label: "Other" },
  ];

  const onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        console.log(data);
        toast.success("well goof")
        alert(`We are in business, ${data.email}`);
      });
    });
  }


  return (
    <>
      {/* {props?.refreshPage ? window.location.reload(true) : ""} */}
      {props?.loaderState
        ? ""
        : setTimeout(() => {
          window.location.reload(true);
        }, 1000)}

      {/* {props?.loaderState ? (
        <div className="center">
          {" "}
          <Oval
            vertical="top"
            horizontal="center"
            color="#00BFFF"
            height={30}
            width={30}
          />
        </div>
      ) : (
        ""
      )} */}
      {/* {!props.isNftValid && <PageNotFound />} */}

      {props.isNftValid ? (
        <>
          {
            props.loader || nft.length === 0 ? <NftInfoShimmer /> : <div className="nft-detail">
              <div className="container info-container">
                <div className="row" style={{ marginTop: "44px" }}>
                  <div className="d-sm-block d-md-block d-lg-none mb-2">
                    <div id="share_info">
                      <div className="">
                        <div className="edit-sell-button">
                          {/* <Button
                      style={{
                        display:
                          props?.responseData?.ownerAddress == loggedInUser?.wallet_address
                            ? "block"
                            : "none",
                        color: "#366EEF",
                        backgroundColor: "white",
                        border: "1px solid #366EEF",
                        marginRight: "1rem",
                      }}
                    >
                      <Link
                        to={`/edit-items/${props?.responseData._id}`}
                        style={{
                          textDecoration: "none",
                          textTransform: "none",
                        }}
                      >
                        Edit
                      </Link>
                    </Button> */}
{/*                
<CrossmintPayButton
    collectionTitle="<TITLE_FOR_YOUR_COLLECTION>"
    collectionDescription="<DESCRIPTION_OF_YOUR_COLLECTION>"
    collectionPhoto="<OPT_URL_TO_PHOTO_COVER>"
    clientId="<YOUR_CLIENT_ID>"
    environment="<YOUR_DESIRED_ENVIRONMENT>"
    mintConfig={{
        count: "<NUMBER_OF_NFTS>",
        totalPrice: "<SELECTED_PRICE>"
        // your custom minting arguments...
    }}
/>  */}
                              

                          <Button
                            // className="btn btn-primary mt-3"
                            // data-bs-toggle="modal"
                            // data-bs-target="#myModalShare"
                            style={{
                              display:
                                props?.responseData?.ownerAddress ==
                                  loggedInUser?.wallet_address &&
                                  !props?.responseData?.salesInfo?.isOpenForSale
                                  ? "block"
                                  : "none",
                              color: "white",
                              backgroundColor: "#366eff",
                              marginRight: "1rem",
                              textTransform: "none",
                            }}
                            onClick={openSaleModal}
                          >
                            sale
                          </Button>
                          <Button
                            style={{
                              display:
                                props?.responseData?.ownerAddress ==
                                  loggedInUser?.wallet_address &&
                                  props?.responseData?.salesInfo?.isOpenForSale
                                  ? "block"
                                  : "none",
                              color: "white",
                              backgroundColor: "#366eff",
                              textTransform: "none",
                            }}
                            onClick={() => setOpenRemoveSale(true)}
                          >
                            Remove From Sale
                          </Button>
                        </div>
                        <span className="nft-name">{nft.name}</span>
                        
                        <div
                          className=""
                          title={
                            nft.collectionName
                              ? nft.collectionName
                              : "NFTinger Collection"
                          }
                        >
                          <Link
                            style={{
                              textDecoration: "none",
                              color: `${fetchPalletsColor(
                                appearance.colorPalette
                              )}`,
                            }}
                            className="collection-name"
                            to={"/collection-details/" + nft?.collectionId}
                          >
                            {undefined !== nft?.collectionName &&
                              nft?.collectionName
                              ? nft?.collectionName
                              : nft?.collectionName?.length === 0
                                ? "NFTinger Collection"
                                : nft?.collectionName}
                          </Link>
                        </div>
                      </div>
                      <div className=" d-flex align-items-center">
                        <a
                          className="nav-link dropdown"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            alt="share"
                            src={share}
                            style={{
                              width: "31px",
                              height: "31px",
                              marginRight: "20px",
                            }}
                          />
                        </a>
                        <ul
                          className="dropdown-menu profilemenu"
                          aria-labelledby="navbarDropdown"
                          style={{
                            width: "220px",
                            position: "absolute",
                            marginLeft: "30px",
                            boxShadow: "0px 3px 6px #00000012",
                            border: "1px solid #F4F4F4",
                            borderRadius: "6px",
                            background: "#FFFFFF",
                          }}
                        >
                          <li className="list-item">
                            <CopyToClipboard text={url}>
                              <button
                                className="copy-url-button"
                                onClick={handleClick({
                                  vertical: "top",
                                  horizontal: "right",
                                })}
                              >
                                <img src={copyIcon} alt="icon" className="icon" />
                                <span className="icon-text">Copy link</span>
                              </button>
                            </CopyToClipboard>
                          </li>
                          <li className="list-item">
                            {/* <img src={facebookIcon} alt="icon" className="icon" />
                        <span className="icon-text">Share on Facebook</span> */}
                            <FacebookShareButton url={url}>
                              <img
                                src={facebookIcon}
                                alt="icon"
                                className="icon"
                              />
                              <span className="icon-text">Share on Facebook</span>
                            </FacebookShareButton>
                          </li>
                          <li className="list-item">
                            {/* <img src={twitterIcon} alt="icon" className="icon" />
                        <span className="icon-text">Share on Twitter</span> */}
                            <TwitterShareButton url={url}>
                              <img
                                src={twitterIcon}
                                alt="icon"
                                className="icon"
                              />
                              <span className="icon-text">Share on Twitter</span>{" "}
                            </TwitterShareButton>
                          </li>
                        </ul>

                        <img
                          src={info}
                          alt="info"
                          style={{
                            width: "31px",
                            height: "31px",
                            cursor: "pointer",
                          }}
                          // data-bs-toggle="modal"
                          onClick={() => setOpenReportModal(true)}
                        />
                      </div>
                    </div>
                  </div>
                  <CustomSnack2
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="Copied"
                    key={vertical + horizontal}
                    autoHideDuration={2000}
                    className="custom-snack"
                  />
                  <div className="col-xl-5 col-lg-5 col-md-12">
                    <div className="nftdetail-img">
                      {nft?.fileExtension?.includes("audio") ? (
                        <>
                          <img
                            onMouseDown={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                            // src={nft.cdnUrl}
                            src={nft.previewImage}
                            // src={Imagep}
                            alt="nft"
                            className="border-radius imginfo_mob"
                            style={{
                              maxWidth: "100%",
                              // height: "837px",
                              borderRadius: "8px",
                            }}
                          />
                          {/* 
                    <button onClick={()=>setDisplay(!display)}>play</button> */}

                          <div style={{ width: "100%", height: "fit-content" }}>
                            <ReactPlayer
                              className="react-player"
                              controls
                              width="100%"
                              height={61}

                              playing={display}
                              url={nft?.cdnUrl}
                            />

                          </div>



                        </>
                      ) : (nft?.fileExtension?.includes("video") ? (
                        <>
                          {/* <img
                      onMouseDown={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      // src={nft.cdnUrl}
                      src={nft.previewImage}
                      // src={Imagep}
                      alt="nft"
                      className="border-radius imginfo_mob"
                      style={{
                        maxWidth: "100%",
                        // height: "837px",
                        borderRadius: "8px",
                      }}
                    /> */}
                          {/* <button onClick={()=>setDisplay(!display)}>play</button> */}
                          <div style={{ width: "100%", height: "100%" }}>
                            <div className="videoPlayerDiv">
                              <div className="subVideoPlayerDiv">
                                <div className="videoContainer">
                                <ReactPlayer
                              className="react-player"
                              width="100%"
                              height={430}
                              light={nft?.previewImage}
                              controls
                              url={nft?.cdnUrl}
                            />

                                </div>
                              </div>
                            </div>
                            

                          </div>
                        </>
                      ) : (
                        <>
                          {nft.cdnUrl === "" ? (
                            <img
                              onMouseDown={(e) => e.preventDefault()}
                              onContextMenu={(e) => e.preventDefault()}
                              // src={nft.cdnUrl}
                              src={nft.ipfsUrl}
                              // src={Imagep}
                              alt="nft"
                              className="border-radius imginfo_mob"
                              style={{
                                maxWidth: "100%",
                                // height: "837px",
                                borderRadius: "8px",
                              }}
                            />
                          ) : nft.cdnUrl ? (
                            <img
                              src={nft?.cdnUrl}

                              className="border-radius imginfo_mob"
                              style={{
                                maxWidth: "100%",
                                // height: "837px",
                                borderRadius: "8px",
                              }}>

                            </img>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="110"
                              height="110"
                              viewBox="0 0 110 110"
                            >
                              <g id="image" transform="translate(-372 -618)">
                                <rect
                                  id="Rectangle_271"
                                  data-name="Rectangle 271"
                                  width="110"
                                  height="110"
                                  transform="translate(372 618)"
                                  fill="none"
                                />
                                <g
                                  id="Icon_feather-image"
                                  data-name="Icon feather-image"
                                  transform="translate(380 626)"
                                >
                                  <path
                                    id="Path_34"
                                    data-name="Path 34"
                                    d="M15.053,4.5H88.926A10.553,10.553,0,0,1,99.479,15.053V88.926A10.553,10.553,0,0,1,88.926,99.479H15.053A10.553,10.553,0,0,1,4.5,88.926V15.053A10.553,10.553,0,0,1,15.053,4.5Z"
                                    transform="translate(-4.5 -4.5)"
                                    fill="none"
                                    stroke={`${fetchPalletsColor(
                                      appearance.colorPalette
                                    )}`}
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="5"
                                  />
                                  <path
                                    id="Path_35"
                                    data-name="Path 35"
                                    d="M26.33,18.415A7.915,7.915,0,1,1,18.415,10.5,7.915,7.915,0,0,1,26.33,18.415Z"
                                    transform="translate(10.607 10.607)"
                                    fill="none"
                                    stroke={`${fetchPalletsColor(
                                      appearance.colorPalette
                                    )}`}
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="5"
                                  />
                                  <path
                                    id="Path_36"
                                    data-name="Path 36"
                                    d="M91.926,41.383,65.543,15,7.5,73.043"
                                    transform="translate(3.053 21.936)"
                                    fill="none"
                                    stroke={`${fetchPalletsColor(
                                      appearance.colorPalette
                                    )}`}
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="5"
                                  />
                                </g>
                              </g>
                            </svg>
                          )}
                        </>

                      ))}

                      {/*
                  <img
                    onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                    // src={nft.cdnUrl}
                    src={nft.cdnUrl === "" ? nft.ipfsUrl : nft.cdnUrl ? nft.cdnUrl : Imagep}
                    // src={Imagep}
                    alt="nft"
                    className="border-radius imginfo_mob"
                    style={{
                      maxWidth: "100%",
                      // height: "837px",
                      borderRadius: "8px",

                    }}
                  />
                  */}
                    </div>
                    <div className="row mt-4 desktop-acti">
                      <PricingHistoryComponentTable id={id} />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-12 details-section">
                    <div className="d-none d-sm-none d-md-none d-lg-block">
                      <div className="row" id="share_info">
                        <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9">
                          <div className="edit-sell-button">
                        
                    {/* <StripeCheckout
                      name={nft?.name}
                      amount={200 * 100} //left-convert price into dollar
                      currency="USD"
                      token={onToken}
                      stripeKey="pk_test_51LT0kMSBO0Bs2oOLWZN3b2P8yV4jQCAyEr3HY1Cah6jJc6pv8qRRCrc4znR4P5q0tIEDXeVPl28cNGiGQEKv9nQM00Kk2Brd2l"
                    /> */}
                            {/* <Button
                        style={{
                          display:
                            props?.responseData?.ownerAddress == loggedInUser?.wallet_address
                              ? "block"
                              : "none",
                          color: "#366EEF",
                          backgroundColor: "white",
                          border: "1px solid #366EEF",
                          marginRight: "1rem",
                        }}
                      >
                        <Link
                          to={`/edit-items/${props?.responseData._id}`}
                          style={{
                            textDecoration: "none",
                            textTransform: "none",
                          }}
                        >
                          Edit
                        </Link>
                      </Button> */}
                            {nft.length !== 0 ? (
                              <Button
                                // className="btn btn-primary mt-3"
                                // data-bs-toggle="modal"
                                // data-bs-target="#myModalShare"
                                style={{
                                  display:
                                    props?.responseData?.ownerAddress ==
                                      loggedInUser?.wallet_address &&
                                      !props?.responseData?.salesInfo?.isOpenForSale
                                      ? "block"
                                      : "none",
                                  color: "white",
                                  backgroundColor: `${fetchPalletsColor(
                                    appearance?.colorPalette
                                  )}`,
                                  marginRight: "1rem",
                                  textTransform: "none",
                                }}
                                onClick={openSaleModal}
                              >
                                Put it on sale
                              </Button>
                            ) : null}
                            <Button
                              style={{
                                display:
                                  props?.responseData?.ownerAddress ==
                                    loggedInUser?.wallet_address &&
                                    props?.responseData?.salesInfo?.isOpenForSale
                                    ? "block"
                                    : "none",
                                color: "white",
                                backgroundColor: `${fetchPalletsColor(
                                  appearance?.colorPalette
                                )}`,
                                textTransform: "none",
                              }}
                              onClick={() => setOpenRemoveSale(true)}
                            >
                              Remove from Sale
                            </Button>
                          </div>
                          <span className="nft-name">{nft.name}</span>
                          <div
                            className=""
                            title={
                              nft.collectionName
                                ? nft.collectionName
                                : "NFTinger Collection"
                            }
                          >
                            <Link
                              style={{
                                textDecoration: "none",
                                color: `${fetchPalletsColor(
                                  appearance.colorPalette
                                )}`,
                              }}
                              className="collection-name"
                              to={"/collection-details/" + nft?.collectionId}
                            >
                              {undefined !== nft?.collectionName &&
                                nft?.collectionName
                                ? nft?.collectionName
                                : nft?.collectionName?.length === 0
                                  ? "NFTinger Collection"
                                  : nft?.collectionName}
                            </Link>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 d-flex align-items-center">
                          <div>
                            <a
                              className="nav-link dropdown"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                alt="share"
                                src={share}
                                style={{
                                  width: "31px",
                                  height: "31px",
                                  marginRight: "0px",
                                }}
                              />
                            </a>
                            <ul
                              className="dropdown-menu profilemenu"
                              aria-labelledby="navbarDropdown"
                              style={{
                                width: "220px",
                                position: "absolute",
                                marginLeft: "30px",
                                boxShadow: "0px 3px 6px #00000012",
                                border: "1px solid #F4F4F4",
                                borderRadius: "6px",
                                background: "#FFFFFF",
                              }}
                            >
                              <li className="list-item">
                                {" "}
                                <CopyToClipboard text={url}>
                                  <button
                                    className="copy-url-button"
                                    onClick={handleClick({
                                      vertical: "top",
                                      horizontal: "right",
                                    })}
                                  >
                                    <img
                                      src={copyIcon}
                                      alt="icon"
                                      className="icon"
                                    />
                                    <span className="icon-text">Copy link</span>
                                  </button>
                                </CopyToClipboard>
                              </li>
                              <li className="list-item">
                                {/* <img src={facebookIcon} alt="icon" className="icon" />
                          <span className="icon-text">Share on Facebook</span> */}
                                <FacebookShareButton url={url}>
                                  <img
                                    src={facebookIcon}
                                    alt="icon"
                                    className="icon"
                                  />
                                  <span className="icon-text">
                                    Share on Facebook
                                  </span>
                                </FacebookShareButton>
                              </li>
                              <li className="list-item">
                                <TwitterShareButton url={url}>
                                  <img
                                    src={twitterIcon}
                                    alt="icon"
                                    className="icon"
                                  />
                                  <span className="icon-text">
                                    Share on Twitter
                                  </span>{" "}
                                </TwitterShareButton>
                              </li>
                            </ul>
                          </div>
                          <CustomSnack
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            message="Copied"
                            key={vertical + horizontal}
                            // autoHideDuration={2000}
                            className="custom-snack"
                          />
                          <img
                            src={info}
                            alt="info"
                            style={{
                              width: "31px",
                              height: "31px",
                              cursor: "pointer",
                            }}
                            // data-bs-toggle="modal"
                            // data-bs-target="#myModalReport"
                            onClick={() => {
                              setOpenReportModal(true);
                            }}
                          />
                          {/* <!-- The Modal --> */}
                          <div className="modal" id="myModalReport">
                            <div className="modal-dialog">
                              <div
                                className="modal-content"
                                style={{
                                  borderRadius: "10px",
                                  paddingRight: "10px",
                                }}
                              >
                                {/* <!-- Modal Header --> */}
                                <div className="modal-header">
                                  <h4 className="modal-title font-15 font-weight-700 text-dark">
                                    Report this item
                                  </h4>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    style={{
                                      width: "10px",
                                      height: "10px",
                                      boxShadow: "none",
                                    }}
                                  ></button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                  <h5
                                    className="font-14 font-weight-700 text-dark"
                                    style={{ marginLeft: "-0.6em" }}
                                  >
                                    Reason
                                  </h5>
                                  <div
                                    className="input-group mt-3"
                                    style={{ marginLeft: "-0.6em" }}
                                  >
                                    <select
                                      className="form-select"
                                      id="inputGroupSelect02"
                                      onChange={(e) => handleChange(e)}
                                    >
                                      <option
                                        value="Fake collection or possible scam"
                                        selected
                                      >
                                        Fake collection or possible scam
                                      </option>
                                      <option value="Explicit and sensitive content">
                                        Explicit and sensitive content
                                      </option>
                                      <option value="Spam">Spam</option>
                                      <option value="Might be stolen">
                                        Might be stolen
                                      </option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                </div>

                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer mb-4">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    data-bs-dismiss="modal"
                                    style={{ marginLeft: "1.1em" }}
                                  // onClick={makeReport}
                                  >
                                    Make Offer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="second-text align-row nftDetail">
                      <span className="text" style={{display: salesInfo?.price!=null ? "flex" :"none" }}>
                        Current Price:&nbsp;
                        <span className="nft-value">
                          {blockchainCheck(blockchain)}
                          {salesInfo?.price}&nbsp;{salesInfo?.currency}
                        </span>
                      </span>
                      <span style={{ display: "flex", justifyContent: "space-between", width:"47.9%",position:"relative" }}>
                      {
                          // nft.hasOwnProperty('royalty') ?
                          nft?.royalty !== null ?
                            <span className="text">
                              Royalty:&nbsp;
                              <span className="nft-value" style={{ color: '#191919' }}>
                                {nft?.royalty}%
                              </span>
                            </span>
                            : null
                        }
                        {nft?.salesInfo?.expiryDateTime != null ? 
                       <span className="text timercount">
                       <i className="far fa-clock clock-icon"></i>
                       {/* <span className="time">{calculateExpireSale(salesInfo?.expiryDate) ? `${calculateExpireSale(salesInfo?.expiryDate)} days left` : 'Expires today'}</span> */}
                       <span className="time">
                         {timeCheck ? (<Countdown date={nft.salesInfo?.expiryDateTime} renderer={timeCheck && renderer} />)
                         :(<span>Sales Ended</span>)}
                     </span>
                     </span>
                     :<></>  
                      }
                      </span>


                    </div>
                    <div className="row third-text">
                      <div className="col-lg-6 col-sm-12">
                      <div className="createdByDiv">
                          <div className="createdByText">Owned By :</div>

                          <Link
                              to={"/user-profile/" + owner[0]?._id}
                            style={{ textDecoration: "none" }}
                            
                          >
                             <div  className="createdByWallet">
                             {owner?.wallet_address ===
                                user?.walletAddress?.address
                                ? "You"
                                : ownedBy}
                              
                              </div>
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="createdByDiv">
                          <div className="createdByText">Created By :</div>

                          <Link
                            to={"/user-profile/" + nft?.createdBy}
                            style={{ textDecoration: "none" }}
                            
                          >
                             <div  className="createdByWallet">
                             {creator?.wallet_address ===
                                user?.walletAddress?.address
                                ? "You"
                                : createdBy}
                           
                              
                              </div>


                          </Link>
                         
                        </div>
                      </div>
                    </div>
                    <div className="fourth-text">
                      <div style={{ marginRight: "20px" }}>
                        <VisibilityIcon
                          style={{
                            fontSize: "21px",
                            color: `${fetchPalletsColor(
                              appearance.colorPalette
                            )}`,
                          }}
                        />
                        <span
                          className="text fw-b"
                          style={{ marginLeft: "0.5em" }}
                        >
                          {nft.viewsCount}
                        </span>
                      </div>
                      <div>
                        <FavoriteIcon
                          style={{ fontSize: "17px", color: "#EF3643" }}
                        />
                        <span
                          className="text fw-b"
                          style={{ marginLeft: "0.5em" }}
                        >
                          {nft?.likes?.length}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <h4 className="title">Description</h4>
                      <p className="description">{nft.description}</p>
                    </div>

                    {/*  IF nft is not created by logged in user these buttons will be shown */}

                    <div className="buy-offer-btn">
                      <Button
                        style={{
                          display:
                            props?.responseData?.ownedBy != userIdLocal &&
                              props?.responseData?.salesInfo?.isOpenForSale
                              ? "block"
                              : "none",
                          background: `${fetchPalletsColor(
                            appearance.colorPalette
                          )}`,
                        }}
                        onClick={buyNft}
                      >
                        Buy Now
                      </Button>

                      <Button
                        data-bs-toggle="modal"
                        data-bs-target="#myModalShare"
                        style={{
                           display:
                            //  props?.responseData?.createdBy != userIdLocal &&
                            //    props?.responseData?.salesInfo?.isOpenForSale
                            //    ? "block"
                            //  : "none",
                            props?.responseData?.ownerAddress ==
                                     loggedInUser?.wallet_address ?"none":"block",
                                     //&&
                                    // props?.responseData?.salesInfo?.isOpenForSale
                          color: `${fetchPalletsColor(appearance.colorPalette)}`,
                          backgroundColor: "white",
                          textTransform: "none",
                          border: `1px solid ${fetchPalletsColor(
                            appearance.colorPalette
                          )}`,
                        }}
                        onClick={makeOffer}
                        className="makeOfferButton"
                      >
                        <span>Make Offer</span>
                      </Button>
                    </div>

                    <div className="grap-area">
                      <ul>
                        <li
                          onClick={() => {
                            setTab(1);
                          }}
                          style={{
                            borderBottom:
                              tab === 1
                                ? `2px solid ${fetchPalletsColor(
                                  appearance?.colorPalette
                                )}`
                                : "",
                            color: tab === 1 ? "#000000" : "#828282",
                            fontWeight: tab === 1 ? 600 : "",
                            marginRight: "16px",
                            fontFamily: tab === 1 ? "poppins-bold" : "poppins",
                          }}
                        >
                          Pricing History
                        </li>
                        {/* <li
                          onClick={() => {
                            setTab(2);
                          }}
                          style={{
                            borderBottom:
                              tab === 2
                                ? `2px solid ${fetchPalletsColor(
                                  appearance?.colorPalette
                                )}`
                                : "",
                            color: tab === 2 ? "#000000" : "#828282",
                            fontWeight: tab === 2 ? 600 : "",
                            marginRight: "16px",
                            fontFamily: tab === 2 ? "poppins-bold" : "poppins",
                          }}
                        >
                          Listings
                        </li> */}
                        <li
                          onClick={() => {
                            setTab(3);
                          }}
                          style={{
                            borderBottom:
                              tab === 3
                                ? `2px solid ${fetchPalletsColor(
                                  appearance?.colorPalette
                                )}`
                                : "",
                            color: tab === 3 ? "#000000" : "#828282",
                            fontWeight: tab === 3 ? 600 : "",
                            marginRight: "16px",
                            fontFamily: tab === 3 ? "poppins-bold" : "poppins",
                            display:
                            props?.responseData?.ownerAddress ==
                            loggedInUser?.wallet_address ?"block":"none",
                          }}
                        >
                          Offers
                        </li>
                        <li
                          onClick={() => {
                            setTab(4);
                          }}
                          style={{
                            borderBottom:
                              tab === 4
                                ? `2px solid ${fetchPalletsColor(
                                  appearance?.colorPalette
                                )}`
                                : "",
                            color: tab === 4 ? "#000000" : "#828282",
                            fontWeight: tab === 4 ? 600 : "",
                            marginRight: "16px",
                            fontFamily: tab === 4 ? "poppins-bold" : "poppins",
                          }}
                        >
                          Details
                        </li>
                        {/* <li
                    onClick={() => {
                      setTab(3);
                    }}
                    style={{
                      borderBottom: tab === 3 ? "2px solid #366EEF" : "",
                      color: tab === 3 ? "#000000" : "#828282",
                      fontWeight: tab === 3 ? 600 : "",
                      fontFamily: tab === 3 ? "poppins-bold" : "poppins",
                    }}
                  >
                    Offers
                  </li> */}
                      </ul>
                      {tab === 1 ? (
                        <PricingHistoryComponentGraph
                          id={id}
                          currency={nft?.salesInfo?.currency}
                        />
                      ) : (
                        ""
                      )}
                      {tab === 2 ? <ListingsTable id={id} /> : ""}
                      {tab === 3 ? <Offer id={id} offer={offers} function={props?.sellNowNft} nft={nft} period={period} buyerInfo={BuyerInfo} /> : ""}
                      {tab === 4 ? <DetailPage nft={nft} /> : ""}
                    </div>
                  </div>
                </div>

                <div className="row mt-4 activities">
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                    <PricingHistoryComponentTable id={id} />
                  </div>
                </div>

                <MoreFromNFT moreNft={moreNft} appearance={appearance} />

               

                {/* <div className="row mt-4">
                <PricingHistoryComponentTable id={id} />
              </div> */}
              </div>
            </div>
          }
          <div
            className="report-outer"
            style={{ display: openReportModal ? "block" : "none" }}
          >
            <div className="report-abs-modal">
              <div className="report-modal">
                <div className="report-inner" style={{ opacity: "1" }}>
                  <div className="reportthisitem">
                    <h3 className="report-text poppins-normal">
                      Report this item
                    </h3>
                    <i
                      className="fa-solid fa-xmark cross-icon icrossicon"
                      onClick={() => setOpenReportModal(false)}
                    ></i>
                  </div>
                  <div className="singlerowmodal">
                    <h3 className="reason-text"> Reason</h3>
                    <ReactSelect
                      onChange={(e) => setReason(e.value)}
                      options={options}
                      placeholder="Select reason"
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          neutral50: "#191919", // Placeholder color
                        },
                      })}
                    />
                    {/* <select
                      className="select-box"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Select reason</option>
                      <option value="Fake collection or possible scam">
                        Fake collection or possible scam
                      </option>
                      <option value="Explicit and sensitive content">
                        Explicit and sensitive content
                      </option>
                      <option value="Might be stolen">Might be stolen</option>
                      <option value="Other">Other</option>
                    </select> */}
                  </div>
                  {(reason !== "") ? (
                  <button
                    className="btn btn-primary report-btn"
                    onClick={sendReport}
                    style={{background: `${fetchPalletsColor(appearance?.colorPalette)}`}}
                  >
                    Report
                  </button>
                  ) : (
                    <button className="btn report-btn">Report</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* --------------------this modal for sale button NFT----------- */}
          {/* <div
            className="report-outer"
            style={{ display: saleModal ? "block" : "none" }}
          >
            <div className="report-abs-modal">
              <div className="report-modal">
                <div className="report-inner" style={{ opacity: "1" }}>
                  <div className="reportthisitem">
                    <h3 className="report-text poppins-normal">
                      Put it on sale
                    </h3>
                    <i
                      className="fa-solid fa-xmark cross-icon"
                      onClick={() => setsaleModal(false)}
                    ></i>
                  </div>
                  <div className="singlerowmodal">



                    <div className="input-price">
                  <label htmlFor="price" className=" input-label">
                    Price* <span style={{ color: "red", fontSize: "15px" }}>{error}</span>
                  </label>
                 
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="number"
                      title=" "
                      placeholder="0"
                      autoComplete="off"
                      value={salePrice}
                      style={{
                       // border:
                         // error != "" ? "1px solid red" : "1px solid #C8C8C8",
                      }}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {
                        setSalePrice(e.target.value);
                       // period.price = e.target.value;
                        // i//f (e.target.value.length != 0) setError("");
                        // else if (
                        //   e.target.value > "0.004" ||
                        //   !e.target.value == "0"
                        // )
                        //   setError("");
                        // else if (!price.current > "1000000000") setError("");

                        // checkChanges();
                      }}
                    />
                    <span class="input-group-text">
                      {  blockchainCheck(nft.blockchain)
                         } </span>
                        </div>
                  
                   </div>
                   <div className="dateTimeContainer">
                    <h3 className="reason-text"> Keep it on sale until :</h3>
                    {/* <DateTimePicker onChange={setDateTimeValue} minDate={new Date()} disableClock={true} value={dateTimeValue} className="saleDateTime" />
                   */}
                    {/* <div className="putsaleTimeDiv">
                    <input className="putsaleTime" type={"datetime-local"} min={new Date().toISOString().slice(0, 16)} onChange={(e)=>setDateTimeValue(e.target.value)}  />
                    </div>
                    </div>
                  
                  </div>
                  <button
                    className="btn btn-primary report-btn"
                    onClick={demoHandleSell}
                    style={{background: `${fetchPalletsColor(appearance?.colorPalette)}`}}
                  >
                    Sale
                  </button>
                </div>
              </div>
            </div>
          </div>  */} 
          {/* <PutItonSale
             saleModal={saleModal} 
             setsaleModal={setsaleModal}
             demoHandleSell={demoHandleSell}
             salePrice={salePrice}
             setSalePrice={setSalePrice}
             dateTimeValue={dateTimeValue}
             setDateTimeValue={setDateTimeValue}
             error={error}
             setError={setError}
             currency={salesInfo?.currency}

            /> */}

            {/* remove from sale modal start from here */}
          
          {/* make offer modal starts here*/}
          <div
            className="report-outer"
            style={{ display: makeOfferModal ? "block" : "none" }}
          >
            <div className="report-abs-modal">
              <div className="make-offer-modal main-model-makeoffer">
                <div className="report-inner" style={{ opacity: "1" }}>
                  <div className="offerHeading">
                    <p className="MainHeadingText">Make an offer</p>
                    <img
                      alt=""
                      src={closeIcon}
                      className="closeIcon"
                      onClick={() => setMakeOfferModal(false)}
                    />
                  </div>
                  <div className="singlerowmodal">

                    <h3 className="price-heading-text"> Price </h3>
                    <span>{RandomWalletAddress}</span>
                    <div className="input-group-price">
                      <span className="symbolText">
                        <p className="eth-value">ETH</p>
                      </span>
                      <span style={{ border: "0.2px ridge #C8C8C8" }}></span>
                      <input
                        className="price-input-box"
                        type="number"
                        title=" "
                        placeholder="0"
                        autoComplete="off"
                        onChange={(e) => setMakeOfferDetails({ ...makeOfferDetails, price: e.target.value })}
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                    <div className="second-row">
                      <h3 className="heading-second-row">Expiration Date</h3>
                      <div className="expiry-div">
                        <style>
                          {`.saleDateTime div {
                            border: none;
                            padding-left:15.09px;
                        }`}
                        </style>
                        <Select
                          className="selectfixing4"
                          name="type"
                          onChange={(e) => handleChange(e)}
                          placeholder="a month"
                        >
                          <Option>A month</Option>
                          <Option value="list">A year</Option>
                        </Select>

                        <span style={{ border: "0.2px ridge #C8C8C8" }}></span>
                        {/* <DateTimePicker  onChange={setMakeOfferDate} minDate={new Date()}
                          dayPlaceholder="DD" monthPlaceholder="MM" yearPlaceholder="YY"
                          hourPlaceholder="HH" minutePlaceholder="MM"
                         disableClock={true} value={makeOfferDate}  className="saleDateTime" /> */}

                        <input type="datetime-local" id="demx" className="filter-time" min={()=>Utils.disablePastDate()} onChange={(e) => setMakeOfferDetails({ ...makeOfferDetails, dateTime: e.target.value })} />
                      </div>
                    </div>

                    <div className="div-offer-button">
                      <button className="offer-button" onClick={SubmitMakeOffer}>Make Offer</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* remove from sale modal start from here */}
         
          <NftLoader 
          title={"remove from sale"}
          nft={nft}
          display={removeFromSale}
          successImg={success}
          palletsColor={appearance.colorPalette}
          success={props?.removeSuccess}
          firstHeading={"initializing"}
          heading={"remove from sale"}
          usdPrice={cryptoPriceUSD}
          />
           

          {/* Put from sale modal end from here */}
          {/* Buying loading modal start */}
          <NftLoader 
          title={"Complete your Buying"}
          nft={nft}
          display={openLoadingModal}
          successImg={success}
          palletsColor={appearance.colorPalette}
          success={props?.buySuccess}
          firstHeading={"Approve"}
          heading={"Transfer"}
          usdPrice={cryptoPriceUSD}
          />
          {/* Buying loading modal end */}
          {/* make offer modal */}

          <div
            className="mint-mod-outer"
            style={{
              display: offerLoadingModal ? "block" : "none",
              zIndex:"1945",
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
                      <div className="completelistin">Complete your Offer</div>
                    </div>
                    <div className="abstractillusion">
                      <img src={nft.previewImage ? nft?.previewImage :(nft?.cdnUrl!="" ? nft.cdnUrl:nft.ipfsUrl)} />
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
                           cursor:"pointer",
                            color: `${fetchPalletsColor(
                              appearance.colorPalette
                            )}`,
                          }}
                        
                          
                        >
                        
                           
                            {undefined !== nft?.collectionName &&     
                              nft?.collectionName
                              ? nft?.collectionName
                              : nft?.collectionName?.length === 0
                                ? "NFTinger Collection"
                                : nft?.collectionName}
                         
                        </div>
                        <div className="abstractposter"> {nft.name}</div>
                        <div className="ethprice">{`${makeOfferDetails.price}  ${salesInfo?.currency}`}</div>
                        <div className="ethprice">{`${makeOfferDetails.dateTime}`}</div>
                      </div>
                    </div>
                    <div className="checkpostcontainer">
                      <div className="checkpost">
                        <img src={success} className="checkimg" />
                        <div className="checkimg">
                          {/* <Oval
                        vertical="top"
                        horizontal="center"
                        color="#00BFFF"
                        height={30}
                        width={30} /> */}
                        </div>
                        <div className="checkposttext">
                          <div className="heading">Approve</div>
                          <div className="description"></div>
                        </div>
                      </div>
                      <div className="checkpost">
                        {/* <img src={success} className="checkimg" /> */}
                        <div className="checkimg">
                          {props?.buySuccess ? (
                            <img src={success} className="checkimg" />
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
                          <div className="heading">Transfer</div>
                          <div className="description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------remove sale dialog ---------------*/}

          <div
            className="report-outer"
            style={{ display: openRemoveSale ? "block" : "none" }}
          >
            <div className="report-abs-modal">
              <div className="report-modal main-model">
                <div className="report-inner" style={{ opacity: "1" }}>
                  <div className="reportthisitem">
                    <p className="MainHeadingText">Remove from sale</p>
                  </div>
                  <div className="singlerowmodal">
                    <h3 className="HeadingText">
                      {" "}
                      Are you sure you want to remove this item from sale?
                    </h3>

                    <div className="removeSaleButton">
                      <button
                        className="CancelButton"
                        onClick={() => setOpenRemoveSale(false)}
                      >
                        Cancel
                      </button>
                      <button className="RemoveButton" onClick={sendButton}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

const NftActiveInActiveBlock = ({ apiData }) => {
  return (
    <div className="row">
      {apiData.map((curElem) => {
        const { id, image, heading, time, btnText } = curElem;
        return (
          <div className="Bids">
            <div className="row border-bottom pt-2">
              <div className="col-1">
                <div>
                  <img src={image} width={42} />
                </div>
              </div>
              <div className="col-11">
                <p className="font-14 text-dark mt-1">{heading}</p>
                <p className="font-14 text-secondary">{time}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
