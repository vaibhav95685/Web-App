import React, { Component, useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../../constants/LeaderBoardApi";
import copy from "../../assets/images/copy.svg";
import globe from "../../assets/images/web.svg";
import pencil from "../../assets/images/Edit.svg";

import randomimage from "../../assets/images/1.jpg";
import "../../assets/styles/Leader.css";
import { Link } from "react-router-dom";
import profileImage from "../../assets/images/ProfileReplace.svg";
import coverImage from "../../assets/images/coverImage.svg";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AbstractApi } from "../../constants/LeaderBoardApi copy";
import "react-toastify/dist/ReactToastify.css";
import { addUserData, AddWalletDetails } from "../../reducers/Action";
import { useDispatch } from "react-redux";
import { addWalletAddress } from "../../services";
import NftCardHome from "../../common/components/NftCardsHome";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../../assets/styles/myProfile.css";
import {
  NftCreatedByUser,
  NftLikedByUser,
  NftOwnedByUser,
  NftSellByUser,
} from "../../services/contentMicroservice";
import Spinner from "../../common/components/Spinner";
import NonftText from "../../common/components/NonftText";
import { updateBannerByUserId } from "../../services/UserMicroService";
import SplitWalletAdd from "../../common/components/SplitWalletAdd";
import NoItem from "../../assets/images/Noitems.svg";
import Snackbar from "@mui/material/Snackbar";
import LikedNfts from "./LikedNfts";
import { ShimmerCircularImage, ShimmerThumbnail } from "react-shimmer-effects";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global";
import NftCartLoader from "../Home/NftCardLoader";
import Skeleton from "react-loading-skeleton";

const CustomSnack = styled(Snackbar)`
  // @media only screen and (min-width:0px) and  (max-width:599px){

  //       top: 153px !important;
  //       left: auto !important;

  //   }

  @media (min-width: 969px) {
    position: absolute !important;
    top: 458px !important;
    left: 58% !important;
  }

  @media only screen and (min-width: 770px) and (max-width: 968px) {
    position: absolute !important;
    top: 454px !important;
    left: auto !important;
    right: 226px !important;
  }
  @media only screen and (min-width: 521px) and (max-width: 769px) {
    position: absolute !important;
    top: 423px !important;
    left: auto !important;
    right: 140px !important;
  }
  @media only screen and (min-width: 0px) and (max-width: 520px) {
    position: absolute !important;
    top: 388px !important;
    left: auto !important;
    right: 46px !important;
  }
`;

function MyProfile({ loader }) {
  let { user } = useSelector((state) => state);
  const appearance = useSelector(state => state.customize.appearance)

  let { loggedInUser } = user;

  const [userId, setUserId] = useState(
    loggedInUser ? loggedInUser._id : localStorage.userId
  );

  // if (loggedInUser) {
  //   localStorage.setItem("userId", loggedInUser._id);
  // }
  // let userId = loggedInUser ? loggedInUser._id : localStorage.userId;

  // if (user) {
  //   localStorage.setItem("loggedInDetails", user.loggedInUser);
  // }
  // if (loggedInUser == null) {
  //   loggedInUser = localStorage.getItem("loggedInDetails");
  // }

  // const defaultCoverpic =
  //   "https://png.pngtree.com/background/20210714/original/pngtree-blood-drop-halloween-blood-background-black-background-picture-image_1220404.jpg";
  // const defaultPic =
  //   "https://th.bing.com/th/id/R.e1189efa9cd3aee29c0e1f7dbed689bf?rik=YRidGY7NPM2n3A&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f7ca%2fpeo%2f7capeoboi.png&ehk=MwVRL6ome8bAroWEn5dLYQgaXLxrafgcwcIQX7N48CM%3d&risl=&pid=ImgRaw&r=0";

  const [Nfts, setNfts] = useState([]);
  const [createdNft, setcreatedNft] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [ownedNft, setownedNft] = useState([]);
  const [onSaleNft, setonSaleNft] = useState([]);
  const [likedNft, setlikedNft] = useState([]);

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

  useEffect(() => {
    if (loggedInUser == null) {
      if (!localStorage.getItem('has_wallet')) {
        navigate("/add-wallet");
      }

      navigate("/my-profile");

    } else setUserId(loggedInUser._id);
  }, [JSON.stringify(loggedInUser)]);

  useEffect(() => {
    async function fetchData() {
      switch (typeofProfilePost) {
        case "on-sale":
          setNfts([]);
          setIsloading(true);
          await NftSellByUser(
            (response) => {
              if (response.success) setNfts(response.responseData)
              else setNfts([])
            },
            userId
          );
          setIsloading(false);
          break;
        case "owned":
          setNfts([]);
          setIsloading(true);
          await NftOwnedByUser(
            (response) => {
              if (response.success) setNfts(response.responseData)
              else setNfts([])
            },
            userId
          );
          setIsloading(false);
          break;
        case "created":
          setNfts([]);
          setIsloading(true);
          await NftCreatedByUser(
            (response) => {
              if (response.success) setNfts(response.responseData)
              else setNfts([])
            },
            userId
          );
          setIsloading(false);
          break;
        case "liked":
          setNfts([]);
          setIsloading(true);
          await NftLikedByUser(
            (response) => setNfts(response.responseData),
            userId
          );
          setIsloading(false);
          break;
        default:
          break;
      }
    }
    fetchData();
  }, [loggedInUser, typeofProfilePost]);

  // useEffect(() => {
  //   if (loggedInUser == null) {
  //     navigate("/my-profile");
  //     navigate("/add-wallet");
  //   } else {
  //     setIsloading(true);
  //     getCreatedByNft();
  //     getOwnedByNft();
  //     getLikedNft();
  //     getOnSaleNft();

  //     setIsloading(false);
  //   }

  //   // setNfts(onSaleNft);
  //   // setTypeofProfilePost("on-sale");
  // }, [window.ethereum, checkClick]);

  // const handleUserDetails = () => {
  //     setIsloading(true);
  //     getCreatedByNft();
  //     getOwnedByNft();
  //     getLikedNft();
  //     getOnSaleNft();

  //     setIsloading(false);
  // }

  // useEffect(()=>{
  //   // window.ethereum?.on("accountsChanged", handleUserDetails);

  //   if(userId){
  //     handleUserDetails()
  //   }

  // },[userId])

  // ------------------------------- Calling apis --------------------- to get user data

  // const handleCopyToClipboard = () => {
  //   const { wallet_address } = loggedInUser;
  //   navigator.clipboard.writeText(`${wallet_address}`);
  //   // navigator.clipboard.writeText(walletAddressUnquoted);
  //   // setCopiedText(true);
  //   toast.success("Text Copied");
  //   // setTimeout(() => {
  //   // setCopiedText(false);
  //   // }, 1000);
  // };

  const isDataCopied = () => {
    // walletTogglePopup(false);
    // toast.success("Copied");
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const getCreatedByNft = () => {
    NftCreatedByUser((response) => {
      if (response.success) {
        // setNfts(response.responseData);
        setcreatedNft(response.responseData);
      } else {
        setcreatedNft([]);
        toast.error(response.msg);
      }
    }, userId);
  };
  const getOwnedByNft = () => {
    NftOwnedByUser((response) => {
      if (response.success) {
        setownedNft(response.responseData);
      } else {
        setownedNft([]);
        toast.error(response.msg);
      }
    }, userId);
  };
  const getOnSaleNft = () => {
    NftSellByUser((response) => {
      if (response.success) {
        setonSaleNft(response.responseData);
        setNfts(response.responseData);
        setTypeofProfilePost("on-sale");
      } else {
        setonSaleNft([]);
        setNfts([]);
        toast.error(response.msg);
      }
    }, userId);
    // setonSaleNft([]);
  };
  const getLikedNft = async () => {
    setTypeofProfilePost("liked");
    setIsloading(true);
    setNfts([]);
    await NftLikedByUser((response) => {
      if (response.success) {
        setlikedNft(response.responseData);
      } else {
        setlikedNft([]);
        toast.error(response.msg);
      }
    }, userId);
    funcLikedNft();
    setIsloading(false);
  };

  // -----------------------

  const accountChangeHandler = (newAccount) => {
    // getUserBalance(newAccount);
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then(async (balance) => {
        setGetBalance(ethers.utils.formatEther(balance));
        const user = await addWalletAddress(address);
        dispatch(AddWalletDetails({ address, balance: getBalance }));
        dispatch(addUserData(user));
      })
      .catch((err) => (err));
  };

  // window.ethereum?.on("accountsChanged", accountChangeHandler);
  // -----------------------
  const updateBanner = (event) => {
    try {
      var filesize = event.target.files[0].size;
      const filename = event.target.files[0].name.replace(/[^a-zA-Z0-9.]/g, '');
      const fileextenstion = filename.split('.').pop().toLowerCase();
      const originalfileSize = Math.round(filesize / 1024);
      const extensionArray = ['jpeg', 'png', 'jpg', 'gif'];
      let flag = false;
      if (event.target.value.length == 0) {
        toast.error("No File is Selected Please Select a File.");
      }
      else {
        for (let i = 0; i < extensionArray.length; i++) {
          if (fileextenstion.localeCompare(extensionArray[i]) == 0) {
            flag = true;
          }
        }
        if (flag == false)
          return toast.error("File type not acceptable. Please use JPEG PNG JPG GIF file");
        else if (originalfileSize > 10000) {
          return toast.error("Image file size should be less than 10 mb")
        }

        if (flag) {
          extensionArray.map(async (data) => {
            if ((originalfileSize < 10000) && (fileextenstion == data
            )) {
              let formData = new FormData();
              formData.append("files", event.target.files[0]);
              formData.append("fileName", event.target.files[0].name);
              updateBannerByUserId(formData, loggedInUser._id, (res) => {
                if (res.success) {
                  toast.success("Banner Updated Successfully");
                  window.location.reload(true);
                } else {
                  toast.error("Unabale to updated banner");
                  window.location.reload(true);
                }
              });
              flag = false;
            }
          }

          )
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  let array = [];
  const funcLikedNft = async () => {
    if (likedNft.length > 0) {
      for (let i = 0; i < likedNft.length; i++) {
        await new Promise((next) => {
          array.push(likedNft[i].userLikedNfts);
          next();
        });
      }
      setNfts(array);
    }
  };

  let [imageLoading, setImageLoading] = useState({
    src: loggedInUser?.photo,
    loaded: false,
  });
  let [bannerImage, setBannerLoading] = useState({
    src: loggedInUser?.coverPhoto,
    loaded: false,
  });
  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  };
  const onBannerLoad = () => {
    setBannerLoading({ ...bannerImage, loaded: true });
  };
  return (
    <>
      <div>
        <div className="position-relative relative hover-cls">
          <img
            className="profilecover"
            src={
              loggedInUser?.coverPhoto != ""
                ? loggedInUser?.coverPhoto
                : coverImage
            }
            alt=""
            onLoad={onBannerLoad}
            onMouseDown={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
          {!bannerImage.loaded && (
            <div className="bannerLoader">
              <ShimmerThumbnail
                className="thumbnail"
                fitOnFrame={true}
                rounded
              />
            </div>
          )}
          <input
            type="file"
            className="pencilicon"
            onChange={updateBanner}
            title=" "
            style={{ border: "5px solid white", zIndex: "99", opacity: "0" }}
          />
          <img className="pencilicon" width="16px" height="16px" src={pencil} />
          <Link to={`/edit-profile`} className="textdecornone">
            {
              loader ? <Skeleton className="profileeditbutton" width="145px" height="42px" style={{ border: 'none', background: '#ebebeb' }} /> :
                <button style={{ color: `${fetchPalletsColor(appearance.colorPalette)}`, border: `1px solid ${fetchPalletsColor(appearance.colorPalette)}` }} className="profileeditbutton">Edit Profile</button>
            }
          </Link>
        </div>
        <Link to={`/edit-profile`} className="editTextAnchor">
          <span className="edit-text">Edit</span>
        </Link>
        <div className="profileavatar  absolute">
          <div className="profileImg-Container-myprofile">
            <img
              src={
                typeof loggedInUser?.photo != "string"
                  ? loggedInUser?.photo?.compressedURL
                  : typeof loggedInUser?.photo != "object" &&
                    loggedInUser?.photo != ""
                    ? loggedInUser.photo
                    : profileImage
              }
              alt=""
              className="user-img"
              onLoad={onImageLoad}
              onMouseDown={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />
            {!imageLoading.loaded && (
              <div className="profileImageLoader">
                <ShimmerCircularImage
                  className="thumbnailCirular"
                  fitOnFrame={true}
                  rounded
                />
              </div>
            )}
          </div>

          {/* <h2>{ethereum && ethereum.selectedAddress}</h2> */}
          {/* <h2>{window.ethereum && defaultAccount}</h2> */}
          {/* {defaultAccount} */}
          <div className="profile-user">{loader ? <Skeleton width="150px" /> : loggedInUser?.userName}</div>
          <div className="add-cover"
            onClick={() => {
              setDataCopied(false)
              setTimeout(() => {
                setDataCopied(true);
              }, 3000);
            }}>

            <CopyToClipboard text={walletAddress?.address}>
              <span className="Container-clipboard">

                {
                  loader ? <Skeleton width="200px" height="40px" /> :
                    <div className="wallet-address-text">
                      {/* {loggedInUser?.wallet_address} */}

                      <p className="addressText">
                        <SplitWalletAdd address={loggedInUser?.wallet_address} />
                      </p>
                    </div>
                }
                {/* <button
                className="copy-button"
                onClick={handleClick({
                  vertical: "top",
                  horizontal: "center",
                })}
              > */}
                {
                  loader === false ? <img
                    src={copy}
                    className="copyButton"
                    alt=""
                    onClick={isDataCopied}
                  /> : null
                }
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

          <p className="profile-description">{loader ? <Skeleton count={2} width="150px" /> : loggedInUser?.bio}</p>
          {/* <p style={{ marginBottom: "0px" }}>
            main focus in art is to make digital abstract painting
          </p> */}
          {
            loader === false ? <h6 className="profile-portfolio">
              <img className="globalImg" src={globe} alt="" />
              {loggedInUser?.portfolio}
            </h6> : null
          }
          <Link to={`/edit-profile`} className="bottombutton">
            <button className="profileeditbuttonatbottom">Edit Profile</button>
          </Link>
        </div>

        {/* <div className="position-absolute absolute2">
      <img style={{height :"30px"}} src={pencil} alt="" />
      </div> */}
        <div className="profileItemContainer">
          <div className="postTypeProfileContainer collectionsales MyProfilesales">
            <div
              className={`postTypeProfile ${typeofProfilePost === "on-sale" && "postTypeProfile--active"
                }`}
              onClick={() => setTypeofProfilePost("on-sale")}
            // onClick={() => {
            //   setNfts(onSaleNft);
            //   setTypeofProfilePost("on-sale");
            // }}
            >
              On sale
            </div>
            <div
              className={`postTypeProfile ${typeofProfilePost === "owned" && "postTypeProfile--active"
                }`}
              onClick={() => setTypeofProfilePost("owned")}
            // onClick={() => {
            //   setNfts(ownedNft);
            //   setTypeofProfilePost("owned");
            // }}
            >
              Owned
            </div>
            <div
              className={`postTypeProfile ${typeofProfilePost === "created" && "postTypeProfile--active"
                }`}
              onClick={() => setTypeofProfilePost("created")}
            // onClick={() => {
            //   setNfts(createdNft);
            //   setTypeofProfilePost("created");
            // }}
            >
              Created
            </div>
            <div
              className={`postTypeProfile ${typeofProfilePost === "liked" && "postTypeProfile--active"
                }`}
              onClick={() => setTypeofProfilePost("liked")}
            // onClick={() => getLikedNft()}
            >
              Liked
            </div>
          </div>
          {/* <hr /> */}
          {/* <div className="profileNftContainer row mx-0 text-center p-0 cards-gap image1"> */}
          {isloading && (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <NftCartLoader mr="5%" />
                <NftCartLoader />
                <NftCartLoader />
                <NftCartLoader mr="0" />
              </div>
            </>
          )}
          {Nfts?.length > 0 ? (
            <div
              className="nftTileContainer row ntf_row"
              style={{ justifyContent: "start" }}
            >
              {typeofProfilePost !== "liked" ? (
                <>
                  {Nfts.map((curElem) => {
                    return (
                      <>
                        <NftCardHome nft={curElem} appearance={appearance} />
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  {Nfts.map((curElem) => {
                    return (
                      <>
                        <LikedNfts nft={curElem} />
                      </>
                    );
                  })}
                </>
              )}
            </div>
          ) : (
            <>
              {!isloading && (
                <div>
                  <div className="Noitemdiv">
                    <img
                      className="no-item-image"
                      src={NoItem}
                      alt="No-items"
                    />
                    <p className="textitem">No items available</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyProfile;
