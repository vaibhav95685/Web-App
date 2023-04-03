import React, { Component, useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../../constants/LeaderBoardApi";
import copy from "../../assets/images/copy.svg";
import globe from "../../assets/images/web.svg";
import "../../assets/styles/Leader.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AbstractApi } from "../../constants/LeaderBoardApi copy";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUserData, AddWalletDetails } from "../../reducers/Action";
import { useDispatch } from "react-redux";
import { addWalletAddress } from "../../services";
import NftCardHome from "../../common/components/NftCardsHome";
import { useSelector } from "react-redux";
import "../../assets/styles/myProfile.css";
import {
  NftCreatedByUser,
  NftLikedByUser,
  NftOwnedByUser,
  NftSellByUser,
} from "../../services/contentMicroservice";
import { userPublicProfile } from "../../services/UserMicroService";
import Spinner from "../../common/components/Spinner";
import NonftText from "../../common/components/NonftText";
import { updateBannerByUserId } from "../../services/UserMicroService";
import SplitWalletAdd from "../../common/components/SplitWalletAdd";
import NoItem from "../../assets/images/Noitems.svg"
import coverImage from "../../assets/images/coverImage.svg";
import profileImage from "../../assets/images/ProfileReplace.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from '@mui/material/Snackbar';
import styled from "styled-components";
import { ShimmerCircularImage, ShimmerThumbnail } from "react-shimmer-effects";
import Skeleton from "react-loading-skeleton";
function UserProfilePage({ loader }) {
  let { user } = useSelector((state) => state);

  const appearance = useSelector(state => state.customize.appearance)

  let { loggedInUser } = user;

  // if(loggedInUser){ localStorage.setItem('userId', loggedInUser._id); }
  // let userId = (loggedInUser) ? loggedInUser._id : localStorage.userId;

  // if(user){ localStorage.setItem('loggedInDetails', user.loggedInUser); }
  // if (loggedInUser == null){
  //   loggedInUser = localStorage.getItem('loggedInDetails')
  // }

  const defaultCoverpic =
    "https://png.pngtree.com/background/20210714/original/pngtree-blood-drop-halloween-blood-background-black-background-picture-image_1220404.jpg";
  const defaultPic =
    "https://th.bing.com/th/id/R.e1189efa9cd3aee29c0e1f7dbed689bf?rik=YRidGY7NPM2n3A&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f7ca%2fpeo%2f7capeoboi.png&ehk=MwVRL6ome8bAroWEn5dLYQgaXLxrafgcwcIQX7N48CM%3d&risl=&pid=ImgRaw&r=0";

  const [Nfts, setNfts] = useState([]);
  const userId = useParams();
  // ("kkkkkkkkkkhhhhhhhhhhh",userId)
  const [createdNft, setcreatedNft] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [ownedNft, setownedNft] = useState([]);
  const [onSaleNft, setonSaleNft] = useState([]);
  const [likedNft, setlikedNft] = useState([]);
  const [userData, setUserData] = useState([]);


  const navigate = useNavigate();
  const { walletAddress } = user;
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(""); // defaultAccount having the wallet address
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState("");
  const dispatch = useDispatch();
  const [dataCopied, setDataCopied] = useState(true);


  const [typeofProfilePost, setTypeofProfilePost] = useState("on-sale");

  const CustomSnack = styled(Snackbar)`
   @media (min-width: 969px){
    position: absolute !important;
      top: 451px !important;
      left: 58% !important;
   }
    @media only screen and (min-width:770px) and  (max-width:968px){
      position: absolute !important;
      top: 454px !important;
      left: auto !important;
      right: 226px !important;
  }
  @media only screen and (min-width:521px) and  (max-width:769px){
    position: absolute !important;
    top: 423px !important;
    left: auto !important;
    right: 140px !important;
  
  }
  @media only screen and (min-width:0px) and  (max-width:520px){
    position: absolute !important;
    top: 388px !important;
      left: auto !important;
      right: 46px !important;
  }
  `

  useEffect(() => {

    // if (loggedInUser == null) {
    //   navigate("/my-profile");
    //   navigate("/add-wallet");
    // }

    userPublicProfile((response) => {
      if (response.success) {
        setUserData(response.responseData);
        // setNfts(response.responseData);
        // setTypeofProfilePost("on-sale");
      } else {
        toast.error(response.msg);
      }
    }, userId.id);
    setIsloading(true);
    // getCreatedByNft();

    // getOwnedByNft();
    getLikedNft();
    getOnSaleNft();
    setIsloading(false);


    // setNfts(onSaleNft);
    // setTypeofProfilePost("on-sale");

  }, [window.ethereum, checkClick]);


  // ------------------------------- Calling apis --------------------- to get user data
  const handleCopyToClipboard = () => {
    const { wallet_address } = loggedInUser;
    navigator.clipboard.writeText(`${wallet_address}`);
    // navigator.clipboard.writeText(walletAddressUnquoted);
    // setCopiedText(true);
    toast.success("Text Copied");
    // setTimeout(() => {
    // setCopiedText(false);
    // }, 1000);
  };
  // const getCreatedByNft = () => {
  //   NftCreatedByUser((response) => {
  //     (response, "myprofile");
  //     if (response.success) {
  //       // setNfts(response.responseData);
  //       setcreatedNft(response.responseData);
  //     } else {
  //       toast.error(response.msg);
  //     }
  //   }, userId);
  // };
  // const getOwnedByNft = () => {
  //   NftOwnedByUser((response) => {
  //     (response, "myprofile");
  //     if (response.success) {
  //       setownedNft(response.responseData);
  //     } else {
  //       toast.error(response.msg);
  //     }
  //   }, userId);
  // };
  const getOnSaleNft = () => {
    NftSellByUser((response) => {
      if (response.success) {
        setonSaleNft(response.responseData);
        setNfts(response.responseData);
        setTypeofProfilePost("on-sale");
      } else {
        toast.error(response.msg);
      }
    }, userId.id);
    // setonSaleNft([]);
  };
  const getLikedNft = () => {
    NftLikedByUser((response) => {
      if (response.success) {
        setlikedNft(response.responseData);
      } else {
        toast.error(response.msg);
      }
    }, userId.id);
    // setlikedNft([]);
  };

  // -----------------------

  const accountChangeHandler = (newAccount) => {
    // getUserBalance(newAccount);
  };

  // const getUserBalance = (address) => {
  //   window.ethereum
  //     .request({ method: "eth_getBalance", params: [address, "latest"] })
  //     .then(async (balance) => {
  //       setGetBalance(ethers.utils.formatEther(balance));
  //       const user = await addWalletAddress(address);
  //       dispatch(AddWalletDetails({ address, balance: getBalance }));
  //       dispatch(addUserData(user));
  //     })
  //     .catch((err) => (err));
  // };

  // window.ethereum?.on("accountsChanged", accountChangeHandler);
  // -----------------------
  // const updateBanner = (e) => {
  //   (e.target.files[0], "<<<<<<<<<<update fule");
  //   const file = e.target.files[0];
  //   let formData = new FormData();
  //   formData.append("files", e.target.files[0]);
  //   formData.append("fileName", file.name);
  //   updateBannerByUserId(formData, loggedInUser._id, (res) => {
  //     if (res.success) {
  //       toast.success("Banner Updated Successfully");
  //       window.location.reload(true);
  //     } else {
  //       toast.error("Unabale to updated banner");
  //       window.location.reload(true);
  //     }
  //     (res, "<<<<<< updated banner");
  //   });
  // };
  const splitAddress = (address) => {
    const sub = address.substring(0, 2);
  };
  splitAddress("akshay");
  let array = [];
  const likedNftModule = () => {
    if (likedNft.length > 0) {
      for (let i = 0; i < likedNft.length; i++)
        array.push(likedNft[i].userLikedNfts);
      setTypeofProfilePost("liked");
      setNfts(array);
    }
    else {
      setTypeofProfilePost("liked");
    }
  }
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  let [imageLoading, setImageLoading] = useState({ src: userData?.photo, loaded: false })
  let [bannerImage, setBannerLoading] = useState({ src: userData?.coverPhoto, loaded: false })
  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  }
  const onBannerLoad = () => {
    setBannerLoading({ ...bannerImage, loaded: true });
  }

  return (
    <>
      {true ?
        <div>
          <div className="position-relative relative">
            {/*             
            {!imageLoading.loaded && (
              <div className="bannerLoader">
                <ShimmerThumbnail className="thumbnail" fitOnFrame={true} rounded />
              </div>
            )} */}

            {
              loader ? <div className="profilecover">
                <ShimmerThumbnail className="thumbnail" fitOnFrame={true} rounded />
              </div>
                : <img
                  className="profilecover"
                  src={
                    userData?.coverPhoto != ""
                      ? userData?.coverPhoto
                      : coverImage
                  }
                  alt=""
                  onLoad={onBannerLoad}
                  onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                />
            }

            {/* <input
            type="file"
            className="pencilicon"
            // onChange={updateBanner}
            style={{ border: "5px solid white", zIndex: "99", opacity: "0" }}
          /> */}
            {/* <img className="pencilicon" width="16px" height="16px" src={pencil} /> */}
            {/* <Link to="/edit-profile" className="textdecornone">
            <button className="profileeditbutton">Edit Profile</button>
          </Link> */}
          </div>
          <div className="profileavatar  absolute">
            <div className="profileImg-Container-userProfile">

              {!imageLoading.loaded && (
                <div className="profileImageLoader">
                  <ShimmerCircularImage className="thumbnailCirular" fitOnFrame={true} rounded />
                </div>
              )}

              {
                loader ? <div className="user-img">
                  <ShimmerCircularImage className="thumbnailCirular" fitOnFrame={true} rounded />
                </div> :
                  <img
                    src={typeof (userData.photo) === "object" ? userData?.photo?.compressedURL : (typeof (userData?.photo) === "string" && userData?.photo != "" ? userData?.photo : profileImage)}
                    alt=""
                    className="user-img"
                    onLoad={onImageLoad}
                    onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                  />
              }
            </div>
            {/* <h2>{ethereum && ethereum.selectedAddress}</h2> */}
            {/* <h2>{window.ethereum && defaultAccount}</h2> */}
            {/* {defaultAccount} */}
            {
              loader ? <Skeleton width="120px" /> : <div className="profile-user">
              {userData?.userName}
              </div>
            }
            {
              loader ? <Skeleton width="250px" height="40px" /> : 
              <div className="add-cover"
              onClick={() => {
                setDataCopied(false)
                setTimeout(() => {
                  setDataCopied(true);
                }, 3000);
              }}>
              <div className="wallet-address-text">
                {/* {loggedInUser?.wallet_address} */}

                <SplitWalletAdd address={userData?.wallet_address} />
              </div>
              <CopyToClipboard text={userData?.wallet_address}>

                <span className="Container-clipboard">
                  {/* <button  className="copy-button"        onClick={handleClick({
             vertical: 'top',
             horizontal: 'center',
            })}> */}
                  <img
                    src={copy}
                    className="copyButton"
                    alt=""

                  />
                  {/* </button> */}
                </span>
              </CopyToClipboard>
              {/* <CustomSnack
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Copied"
        key={vertical + horizontal}
        autoHideDuration={2000}
        className="custom-snack"
      /> */}
              <span className="tooltiptext-myprofile"> {dataCopied ? "copy to clipboard" : "copied"}</span>
            </div>
            }

            <p className="profile-description">
              {userData?.bio}
            </p>
            {/* <p style={{ marginBottom: "0px" }}>
            main focus in art is to make digital abstract painting
          </p> */}
            <h6 className="profile-portfolio">
              <img style={{ height: "30px" }} src={globe} alt="" />
              {userData?.portfolio}
            </h6>
            {/* <Link to="/edit-profile" className="textdecornone">
            <button className="profileeditbuttonatbottom">Edit Profile</button>
          </Link> */}
          </div>

          {/* <div className="position-absolute absolute2">
      <img style={{height :"30px"}} src={pencil} alt="" />
      </div> */}
          <div className="profileItemContainer">
            <div className="postTypeProfileContainer collectionsales MyProfilesales">
              <div
                className={`postTypeProfile ${typeofProfilePost === "on-sale" && "postTypeProfile--active"
                  }`}
                // onClick={() => setTypeofProfilePost("on-sale")}
                onClick={() => {
                  setNfts(onSaleNft);
                  setTypeofProfilePost("on-sale");
                }}
              >
                On sale
              </div>
              {/* <div
              className={`postTypeProfile ${typeofProfilePost === "owned" && "postTypeProfile--active"
                }`}
              // onClick={() => setTypeofProfilePost("owned")}
              onClick={() => {
                setNfts(ownedNft);
                setTypeofProfilePost("owned");
              }}
            >
              Owned
            </div> */}
              {/* <div
              className={`postTypeProfile ${typeofProfilePost === "created" && "postTypeProfile--active"
                }`}
              // onClick={() => setTypeofProfilePost("created")}
              onClick={() => {
                setNfts(createdNft);
                setTypeofProfilePost("created");
              }}
            >
              Created
            </div> */}
              <div
                className={`postTypeProfile ${typeofProfilePost === "liked" && "postTypeProfile--active"
                  }`}
                // onClick={() => setTypeofProfilePost("liked")}
                onClick={() => likedNftModule()}
              >
                Liked
              </div>
            </div>
            {/* <hr /> */}
            {/* <div className="profileNftContainer row mx-0 text-center p-0 cards-gap image1"> */}
            <div className="nftTileContainer row ntf_row" style={{ justifyContent: "start", }}>
              {/* <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div> */}
              {/* {[...AbstractApi, , ...AbstractApi].map((curElem) => { */}

              {isloading && <Spinner />}
              {(() => {
                if (!isloading && Nfts.length < 1) {
                  return <div>
                    <div className="Noitemdiv">
                      <img src={NoItem} />
                      <p className="textitem">No items available</p>
                    </div>
                  </div>
                }
              })()}

              {Nfts.map((curElem) => {
                const {
                  cdnUrl,
                  name,
                  price,
                  salesInfo,
                  maxPrice,
                  maxPrice2,
                  daysLeft,
                  likesCount,
                } = curElem;
                return (
                  <>
                    <NftCardHome nft={curElem} appearance={appearance} loader={loader} />
                    {/* <div className="col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
                    <img
                      className="nftTileEachImage"
                      src={cdnUrl}
                      alt="nft"
                    />
                    <div className="tile__details">
                      <div className="profileNftDetailFirstContainer container__up">
                        <div className="title">{name}</div>
                        <div className="title1">{salesInfo?.price} ETH</div>
                      </div>
                      <div className="profileNftDetailSecondContainer container__down">
                        <div className="">
                          <span
                            style={{
                              color: "#366EEF",
                              fontFamily: "poppins-bold",
                            }}
                          >
                          
                          </span>
                        </div>
                        <div className="">
                          {likesCount}
                        
                          <i
                            style={{ color: "#ef3643" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        : ""}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );








}

export default UserProfilePage;
//   https://image.shutterstock.com/image-vector/background-water-droplets-on-surface-260nw-274829663.jpg
