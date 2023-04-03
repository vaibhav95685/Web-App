import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/img-format.svg";
import success from "../../assets/images/Check.svg";
import ethereum from "../../assets/images/ethereum.svg";
import polygon from "../../assets/images/polygon.png";
import binance from "../../assets/images/binance.png";
// import { FaCloudUploadAlt } from "react-icons/fa";
import styled from "styled-components";
import { connect } from "react-redux";
import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
import {
  // getCollection,
  getCollectionBySingleUser,
} from "../../services/contentServices";
import { httpConstants } from "../../constants";
import { BASE_URL2 } from "../../reducers/Constants";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import ImageFile from "./uploadFile";
import { Oval } from "react-loader-spinner";
import "../../assets/styles/createSingleNft.css";
import "../../assets/styles/MintModal.css";
import UploadSingleNft from "./CreateSingleUploadFile";
import Close from "../../assets/images/close.png";
import Select from "react-select";
import { PrintDisabled } from "@mui/icons-material";
import $ from "jquery";
import { errors } from "ethers";
import { getTenantData } from "../../services/clientConfigMicroService";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global";
import Bannerdrop from "./Bannerdrop";
import SingleNftShimmer from "./SingleNftShimmer";

// import "../../assets/styles/Leader.css"
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
const Button = styled.button``;
function CreateSingleNFT(props) {
  const customize = useSelector((state) => state.customize);

  const navigate = useNavigate();

  const [collectionData, setCollectionData] = useState([]);
  const [selectFile, setSelectFile] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionBlockchain, setCollectionBlockchain] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const [ipfsUrl, setIpfsUrl] = useState("");
  const [myProfileUrl, setmyProfileUrl] = useState("");
  const [DesError, SetDesError] = useState("");
  const [royalityError, setRoyalityError] = useState("");

  const [cdnUrl, setcdnUrl] = useState("");
  const [uploadFileObj, setUploadFileObj] = useState("");
  const [openMintodal, setOpenMintodal] = useState(false);

  // >>>> This is user id
  const { user } = useSelector((state) => state);
  const navigation = useNavigate();
  const { loggedInUser, walletAddress } = user;
  const [checkDisable, setcheckDisable] = useState(true);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isloader, setisLoader] = useState(false);
  const [specialChar, setSpecialChar] = useState("");
  // (user.addUserData._id, "<<<< user data");
  // -------------------------------
  const name = useRef("");
  const price = useRef("");
  const description = useRef("");
  const blockchain = useRef("");
  const royality = useRef("");
  // const ipfsUrl = useRef("");
  const createdBy = loggedInUser?._id;

  const [mintStatus, setMintStatus] = useState(false);
  const [saleStatus, setSaleStatus] = useState(false);
  const [mintMessageStatus, setMintMessageStatus] = useState(false);

  const [desLength, setDesLength] = useState(0);
  const [error, setError] = useState("");
  const [nameError, SetNameError] = useState("");
  const [fileError, setFileError] = useState("");
  const [blockchainError, setBlockChainError] = useState("");
  const [collectionError, setCollectionError] = useState("");
  const[tenantData,setTenantData]=useState();
  let collectionValue;
  let checkValueOnCollection;
  // const { userDetails, loggedInUser, walletAddress } = user;

  if (loggedInUser) {
    localStorage.setItem("userId", loggedInUser._id);
  }
  let userId = loggedInUser ? loggedInUser._id : localStorage.userId;
  const [selectedOption, setSelectedOption] = useState(null);
  const [blockchainOption, setBlockchainOption] = useState([]);
  const [blockchains, setBlockChains] = useState([]);
  const myRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const [defaultValueBlockChain, setDefaultValueBlockchain] = useState([
    {
      value: "ETH",
      label: (
        <div>
          <img src={ethereum} height="32px" alt="" /> Ethereum
        </div>
      ),
    },
    {
      value: "MATIC",
      label: (
        <div>
          <img src={polygon} height="32px" alt="" /> Polygon
        </div>
      ),
    },
    {
      value: "BNB",
      label: (
        <div>
          <img src={binance} height="32px" alt="" /> Binance
        </div>
      ),
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      await getTenantData().then((response) =>{
        setBlockChains(response[0]?.blockchains);
        setTenantData(response[0]);
      }
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    for (let eachItem of blockchains) {
      if (eachItem === "Ethereum") {
        blockchainOption.push({
          value: "ETH",
          label: (
            <div>
              <img src={ethereum} height="32px" alt="" /> Ethereum
            </div>
          ),
        });
      } else if (eachItem === "Polygon") {
        blockchainOption.push({
          value: "MATIC",
          label: (
            <div>
              <img src={polygon} height="32px" alt="" /> Polygon
            </div>
          ),
        });
      } else if (eachItem === "Binance") {
        blockchainOption.push({
          value: "BNB",
          label: (
            <div>
              <img src={binance} height="32px" alt="" /> Binance
            </div>
          ),
        });
      }
    }
  }, [blockchains]);

  // ----------------------------------------------states end-------------
  useEffect(async () => {
    if (walletAddress == null) {
      // navigation("/add-wallet");
    }

    // this code will check if user already connected wallet from localstorage
    if (!localStorage.getItem("has_wallet")) {
      navigation("/add-wallet");
    }

    setmyProfileUrl("/nft-information/");
    // const collections = await getCollectionBySingleUser(userId);
    // setCollectionData(collections);
  }, []);

  useEffect(async () => {
    const collections = await getCollectionBySingleUser(userId,tenantData?.wallet);
    setCollectionData(collections);
  }, [tenantData]);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [imageFile, setImageFile] = useState(false);
  const [audioFile, setAudioFile] = useState(false);
  const [videoFile, setVideoFile] = useState(false);
  const [cdnPreviewUrl, setcdnPreviewUrl] = useState("");
  const [ipfsPreviewUrl, setIpfsPreviewUrl] = useState("");
  const [previewCompressedURL, setPreviewCompressedURl] = useState("");
  const [extension, setExtension] = useState("");
  // --------------------------------React Drop Zone---------------------

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,audio/*,video/*",
    maxSize: "40485760",
    onDrop: (acceptedFiles, fileRejections) => {
      setisLoader(true);
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error("Image file size should be less than 40 mb");
            setisLoader(false);
            return;
          } else if (err.code === "file-invalid-type") {
            toast.error(
              "File type not acceptable. Please use JPG, JPEG, PNG, GIF file"
            );
            setisLoader(false);
            return;
          } else {
            toast.error("Image file size should be greater than ……. pxl");
            setisLoader(false);
            return;
          }
        });
      });

      acceptedFiles.map((file) => {
        if (file.type.includes("video")) {
          setVideoFile(true);
          setAudioFile(false);
          setImageFile(false);
          setExtension(file.type);
        } else if (file.type.includes("audio")) {
          setVideoFile(false);
          setAudioFile(true);
          setImageFile(false);
          setExtension(file.type);
        } else if (file.type.includes("image")) {
          setVideoFile(false);
          setAudioFile(false);
          setImageFile(true);
          setExtension(file.type);
        }
      });
      setSelectFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFileError("");
      let formData = new FormData();
      formData.append(
        "attachment",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
      // const [err, ipfsRes] = addIPFS(formData)
      (async () => {
        const [err, ipfsRes] = await Utils.parseResponse(
          getCollection.addIpfs(formData)
        );
        if (!ipfsRes.ipfsUrl) {
          toast.error("unable to upload image");
          setisLoader(false);
        } else {

          setIpfsUrl(ipfsRes.ipfsUrl);
          setcdnUrl(ipfsRes.cdnUrl);
          setCompressedUrl(ipfsRes.compressedURL);
          setisLoader(false);
          setIsFileSelected(true);
        }
      })();
    },
  });
  const onDrop = useCallback((acceptedFiles) => {
    handleChange(acceptedFiles);
  }, []);
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {

    // const fileUploaded = event;

    setUploadFileObj(event);
  };

  useEffect(() => {
    $(document).ready(function () {
      var lines = 20;
      var linesUsed = $("#linesUsed");

      $("#test").keydown(function (e) {
        let newLines = $(this).val().split("\n").length;
        linesUsed.text(newLines);

        if (e.keyCode == 13 && newLines >= lines) {
          return false;
        }
      });
    });
  }, []);

  const nameValidation = (nftName) => {
    var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
    if (format.test(nftName)) {
      SetNameError("(No Special Character Allowed.)");
      return false;
    } else if (nftName.length === 0) {
      SetNameError("Name is required.");
      return false;
    } else if (nftName.length < 3) {
      SetNameError("Name should be atleast 3 characters.");
      return false;
    }else if (nftName.length > 25) {
      SetNameError("Name cannot be greater than 20 characters.");
      return false;
    } 
     else {
      SetNameError("");
      return true;
    }
  };

  const priceValidation = (nftPrice, xy) => {
    if (nftPrice.length == 0) {
      setError("( price is required)");
      return false;
    } else if (collectionValue === "Ethereum" && nftPrice < 0.004) {
      setError(
        "( Minimum listing price for an NFT should be more than 0.004 ETH )"
      );
      return false;
    } else if (collectionValue === "Polygon" && nftPrice < 11.71) {
      setError(
        "( Minimum listing price for an NFT should be more than 11.71 MATIC )"
      );
      return false;
    } else if (collectionValue === "Binance" && nftPrice < 0.027) {
      setError(
        "( Minimum listing price for an NFT should be more than 0.027 BNB )"
      );
      return false;
    } else if (collectionValue === "Ethereum" && nftPrice > 1000000000) {
      setError(
        "( Maximum listing price for an NFT should be less than 1,000,000,000 ETH )"
      );
      return false;
    } else if (collectionValue === "Polygon" && nftPrice > 2929880265000) {
      setError(
        "( Maximum listing price for an NFT should be less than 2,929,880,265,000 MATIC )"
      );
      return false;
    } else if (collectionValue === "Binance" && nftPrice > 6841316000) {
      setError(
        "( Maximum listing price for an NFT should be less than 6,841,316,000 BNB )"
      );
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const descriptionValidation = (nftDes) => {
    if (nftDes.length == 0) {
      SetDesError("( Description is required )");
      return false;
    } else {
      SetDesError("");
      return true;
    }
  };

  const fileValidation = () => {
    if (selectFile != "") {
      setFileError("");
      return true;
    } else {
      setFileError("( file is required )");
      return false;
    }
  };

  const blockchainValidation = (blockchain) => {
    if (blockchain.length != 0) {
      setBlockChainError("");
      return true;
    } else {
      setBlockChainError("( Blockchain is required )");
      return false;
    }
  };

  function blockchainValue(value) {
    switch (value) {
      case "ETH":
        return "Ethereum";
      case "MATIC":
        return "Polygon";
      case "BNB":
        return "Binance";
      case "Ethereum":
        return "Ethereum";
      case "Polygon":
        return "Polygon";
      case "Binance":
        return "Binance";
      default:
        return "";
    }
  }

  function currencyValue(value) {
    switch (value) {
      case "Ethereum":
        return "ETH";
      case "Polygon":
        return "MATIC";
      case "Binance":
        return "BNB";
    }
  }



  const handleSubmit = async (e) => {
    var priceValue = price.current;


    if( !!(royality.current % 1))
    return toast.error("royalty must be number")

    // if (priceValue.toString().slice(0, 1) == ".") {
    //   priceValue = "0" + priceValue;
    //   price.current = priceValue;
    // } else {
    //   price.current = +priceValue;
    //   price.current = price.current.toString();
    // }

    if (collectionName === "NFTinger collection") {
      blockchain.current = blockchainValue(selectedOption?.value);
      collectionValue = blockchain.current;
    } else {
      blockchain.current = blockchainValue(collectionBlockchain);
      collectionValue = blockchain.current;
    }



    

    let nftNameValidation = nameValidation(name.current);
    //let nftPriceValidation = priceValidation(price.current, collectionValue);
    let nftDescriptionValidation = descriptionValidation(description.current);
    let nftFileValidation = fileValidation();
    let nftBlockchain = blockchainValidation(blockchain.current);
    if (
      nftNameValidation &&
      //nftPriceValidation
       
      nftDescriptionValidation &&
      nftFileValidation &&
      nftBlockchain
    ) {
      const addIPFS = async () => {
        props.createNftHandler({
          ipfsUrl: ipfsUrl,
          cdnUrl: cdnUrl,
          compressedURL: compressedUrl,
          nftName: name.current,
         // price: price.current,
          currency:
            collectionName === "NFTinger collection"
              ? selectedOption?.value
              : currencyValue(collectionBlockchain),
          description: description.current,
          royality: royality.current,
          blockchain: blockchain.current,
          createdBy: loggedInUser._id,
          collectionId: collectionId,
          collectionName: collectionName,
          contractAddress: contractAddress,
          ownerAddress: walletAddress.address,
          previewImage: previewCompressedURL,
          fileExtension: extension,
          isLazyMintingEnabled:mintStatus,
        });
        setOpenMintodal(true);
      };
      addIPFS();
    } else {
      scrollToRef(myRef);
      return null;
    }
  };

  const priceWithCurrency = (blockchain) => {
    switch (blockchain) {
      case "ETH":
        return (
          <span>
            <img className="currency-sign-nftinformation" src={Ethereum}></img>
            ETH
          </span>
        );
      case "MATIC":
        return (
          <span>
            <img className="currency-sign-nftinformation" src={Polygon}></img>
            MATIC
          </span>
        );
      case "BNB":
        return (
          <span>
            <img className="currency-sign-nftinformation" src={Binance}></img>
            BNB
          </span>
        );
      case "Ethereum":
        return (
          <span>
            <img className="currency-sign-nftinformation" src={Ethereum}></img>
            ETH
          </span>
        );
      case "Polygon":
        return (
          <span>
            <img className="currency-sign-nftinformation" src={Polygon}></img>
            MATIC
          </span>
        );
      case "Binance":
        return (
          <span>
            <img className="currency-sign-nftinformation" src={Binance}></img>
            BNB
          </span>
        );
      default:
        return "";
    }
  };

  const enabled =
    nameError == "" &&
    error == "" &&
    royalityError == "" &&
    fileError == "" &&
    collectionError == "" &&
    !isloader;

  useEffect(() => {
    if (customize.permissionToUploadNft === "Only me") {
      navigate(`/`);

      toast.warning("You don't have access to create NFT", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [customize.permissionToUploadNft]);

  const customStyles = {
    control: styles => ({ ...styles, marginBottom: '28px' }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "black", // Custom colour
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    }),
  };

  const handleCollection = (e) => {
    const collectionObj = collectionData.find(item => item._id === e)
    const addressId = [
      collectionObj._id,
      collectionObj.contractAddress,
      collectionObj.name,
      collectionObj.blockchain
    ];
    if (addressId[2] === "NFTinger collection") {
      setCollectionName(addressId[2]);
      setCollectionBlockchain(addressId[3]);
      setCollectionId(addressId[0]);
      setContractAddress(addressId[1]);
      setCollectionError("");
    }
    if (addressId[3] === "Ethereum") {
      checkValueOnCollection = blockchainOption.some(
        (el) => el.value === "ETH"
      );
      checkValueOnCollection
        ? setCollectionError("")
        : setCollectionError(
            "( The NFTS in this collection can not be minted as this platform has temporarily stopped minting on Ethereum. )"
          );
      setCollectionId(addressId[0]);
      setContractAddress(addressId[1]);
      setCollectionName(addressId[2]);
      setCollectionBlockchain(addressId[3]);
    } else if (addressId[3] === "Polygon") {
      checkValueOnCollection = blockchainOption.some(
        (el) => el.value === "MATIC"
      );
      checkValueOnCollection
        ? setCollectionError("")
        : setCollectionError(
            "( The NFTS in this collection can not be minted as this platform has temporarily stopped minting on Polygon.)"
          );
      setCollectionId(addressId[0]);
      setContractAddress(addressId[1]);
      setCollectionName(addressId[2]);
      setCollectionBlockchain(addressId[3]);
    } else if (addressId[3] === "Binance") {
      checkValueOnCollection = blockchainOption.some(
        (el) => el.value === "BNB"
      );
      checkValueOnCollection
        ? setCollectionError("")
        : setCollectionError(
            "( The NFTS in this collection can not be minted as this platform has temporarily stopped minting on Binance.)"
          );
      setCollectionId(addressId[0]);
      setContractAddress(addressId[1]);
      setCollectionName(addressId[2]);
      setCollectionBlockchain(addressId[3]);
    }
    if (checkValueOnCollection) {
    }


  }

  return (
    <>
      {props?.loaderState ? (
        <div className="mint-mod-outer">
          <div className="mint-abs">
            <div className="">
              <div className="mint-outer" style={{ opacity: "1" }}>
                <div className="mintbody">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      className="completelistin"
                      onClick={() => setOpenMintodal(false)}
                    >
                      Complete your minting
                    </div>
                  </div>

                  <div className="abstractillusion">
                    <img
                      src={
                        previewCompressedURL != ""
                          ? previewCompressedURL
                          : cdnUrl != ""
                          ? cdnUrl
                          : Image
                      }
                    />
                    <div className="abstractillusioncontent">
                      <div className="abstracttitle">{name.current}</div>
                      {/* <div className="abstractposter"> </div> */}
                      <div className="ethprice">
                        {price.current}
                        {collectionName === "NFTinger Collection"
                          ? selectedOption?.value
                          : currencyValue(collectionBlockchain)}
                      </div>
                    </div>
                  </div>
                  <div className="checkpostcontainer">
                    <div className="checkpost">
                      {isFileSelected && (
                        <img src={success} className="checkimg" />
                      )}
                      {!isFileSelected && (
                        <div className="checkvalue checkvaluetext">1</div>
                      )}
                      <div className="checkposttext">
                        <div className="heading">
                          {props.isFileSelected ?
                             "Uploading"
                            : "Upload"}
                        </div>
                        <div className="description">
                          Uploading all media assets and metadata to IPFS
                        </div>
                      </div>
                    </div>
                    <div className="checkpost">
                      {props.isMintSuccess === true ? (
                        <img src={success} className="checkimg" />
                      ) : (
                        <div className="checkimg">
                          <Oval
                            vertical="top"
                            horizontal="center"
                            color="#00BFFF"
                            height={30}
                            width={30}
                          />
                        </div>
                      )}
                      {/* {!props.isMintSuccess && (
                          <div className="checkvalue checkvaluetext">2</div>
                        )} */}
                      <div className="checkposttext">
                        <div className="heading">
                          {props.isMintSuccess === "true" ? "Mint" : "Minting"}
                        </div>
                        <div className="description">
                          Send Transaction to Create your NFT
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* ----------------------------- */}
      {props?.isNftCreated ? navigation(myProfileUrl + props?.mintedNftId) : ""}

      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {props.loader ? (
        <SingleNftShimmer />
      ) : (
        <div className="full-content-margin">
          <div className="create-nft-text">Create NFT</div>

          <div className="create-single-nft-outer">
            <div
              className="create-nft-form"
              style={
                {
                  // flexDirection: "column",
                }
              }
            >
              <div className="nft-file-upload">
                <label htmlFor="email" className="form-key">
                  Upload File*{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>
                    {fileError}
                  </span>
                </label>

                <div className="inpput-image-wrap"></div>

                {/* Audio Div */}

                {/* Video Div */}

                {/* -----------------------NEW DRA GAND DROP */}

                {!isFileSelected && (
                  <>
                    <div className="draganddropbox" {...getRootProps()}>
                      <input {...getInputProps()} />

                      {!isloader ? (
                        <div className="draganddropboxinnerdiv">
                          {cdnUrl === "" ? (
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
                                    stroke={fetchPalletsColor(
                                      customize.appearance.colorPalette
                                    )}
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
                                    stroke={fetchPalletsColor(
                                      customize.appearance.colorPalette
                                    )}
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
                                    stroke={fetchPalletsColor(
                                      customize.appearance.colorPalette
                                    )}
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="5"
                                  />
                                </g>
                              </g>
                            </svg>
                          ) : (
                            <img
                              src={cdnUrl}
                              className="nft-image"
                              style={
                                {
                                  // maxWidth: "100px",
                                  // width: "70%",
                                  // marginTop: "3em",
                                }
                              }
                            />
                          )}

                          <span className="draganddropboxinnerdivtextspan">
                            Drag and Drop or
                            <span
                              className="draganddropboxinnerdivtextspanbrowse"
                              style={{
                                color: `${fetchPalletsColor(
                                  customize.appearance.colorPalette
                                )}`,
                              }}
                            >
                              {" "}
                              Browse
                            </span>
                          </span>
                        </div>
                      ) : (
                        <div className="" style={{ margin: "auto 0" }}>
                          {" "}
                          <Oval
                            vertical="top"
                            horizontal="center"
                            color="#00BFFF"
                            height={30}
                            width={30}
                          />
                        </div>
                      )}
                    </div>
                    <div className="draganddropboxmsg ">
                      Supported(JPG,JPEG, PNG, GIF,MP3,Mp4) <br></br>Max size:
                      40 mb
                    </div>
                  </>
                )}

                {isFileSelected && imageFile && (
                  <>
                    {!isloader ? (
                      <>
                        <div className="draganddropbox" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="draganddropboxinnerdiv">
                            <img
                              src={cdnUrl != "" ? cdnUrl : Image}
                              style={{
                                width: "100%",
                                // marginTop: "3em",
                                height: "100%",
                                color: "#366EEF",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>

                        <div className="draganddropboxmsg">
                          Supported(JPG,JPEG, PNG, GIF,MP3,Mp4) <br></br>Max
                          size: 40 mb
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="draganddropbox">
                          <div className="" style={{ margin: "auto 0" }}>
                            {" "}
                            <Oval
                              vertical="top"
                              horizontal="center"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                        <div className="draganddropboxmsg ">
                          Supported(JPG,JPEG, PNG, GIF,,MP3,Mp4) <br></br>Max
                          size: 40 mb
                        </div>
                      </>
                    )}
                  </>
                )}

                {isFileSelected && audioFile && (
                  <>
                    {!isloader ? (
                      <>
                        <div className="AudioDiv">
                          <audio
                            controls
                            controlslist="nodownload"
                            loop
                            preload="auto"
                            style={{
                              width: "100%",
                              background: "#E7E7E7 0% 0% no-repeat padding-box",
                            }}
                          >
                            <source src={cdnUrl} />
                          </audio>

                          <div className="changeTextDiv" {...getRootProps()}>
                            <p className="changeText">
                              {" "}
                              <input {...getInputProps()} />
                              Change
                            </p>
                          </div>
                        </div>

                        <div className="draganddropboxmsg ">
                          Supported(JPG,JPEG, PNG, GIF,,MP3,Mp4) <br></br>Max
                          size: 40 mb
                        </div>

                        <div className="max-width-250">
                          <Bannerdrop
                            bannerCdn={cdnPreviewUrl}
                            setbannerCdn={setcdnPreviewUrl}
                            bannerIpfs={ipfsPreviewUrl}
                            setbannerIpfs={setIpfsPreviewUrl}
                            compressedUrl={previewCompressedURL}
                            setCompressedUrl={setPreviewCompressedURl}
                            appearance={customize.appearance}
                          />
                          <div className="draganddropboxmsg">
                            You’ll need to provide an image (PNG, JPG, or GIF)
                            for the card display of your item.
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="draganddropbox">
                          <div className="" style={{ margin: "auto 0" }}>
                            {" "}
                            <Oval
                              vertical="top"
                              horizontal="center"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                        <div className="draganddropboxmsg ">
                          Supported(JPG,JPEG, PNG, GIF,,MP3,Mp4) <br></br>Max
                          size: 40 mb
                        </div>
                      </>
                    )}
                  </>
                )}

                {isFileSelected && videoFile && (
                  <>
                    {!isloader ? (
                      <>
                        <div className="AudioDiv" style={{ marginTop: "10px" }}>
                          <video
                            style={{
                              width: "100%",
                              background: "#E7E7E7 0% 0% no-repeat padding-box",
                            }}
                            controls
                          >
                            <source src={cdnUrl} type="video/mp4" />
                          </video>

                          <div className="changeTextDiv" {...getRootProps()}>
                            <p className="changeText">
                              {" "}
                              <input {...getInputProps()} />
                              Change
                            </p>
                          </div>
                        </div>

                        <div className="draganddropboxmsg">
                          Supported(JPG,JPEG, PNG, GIF,MP3,Mp4) <br></br>Max
                          size: 40 mb
                        </div>

                        <div className="max-width-250">
                          <Bannerdrop
                            bannerCdn={cdnPreviewUrl}
                            setbannerCdn={setcdnPreviewUrl}
                            bannerIpfs={ipfsPreviewUrl}
                            setbannerIpfs={setIpfsPreviewUrl}
                            compressedUrl={previewCompressedURL}
                            setCompressedUrl={setPreviewCompressedURl}
                            appearance={customize.appearance}
                          />
                          <div className="draganddropboxmsg">
                            You’ll need to provide an image (PNG, JPG, or GIF)
                            for the card display of your item.
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="draganddropbox">
                          <div className="" style={{ margin: "auto 0" }}>
                            {" "}
                            <Oval
                              vertical="top"
                              horizontal="center"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                        <div className="draganddropboxmsg ">
                          Supported(JPG,JPEG, PNG, GIF,MP3,Mp4) <br></br>Max
                          size: 40 mb
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ----------------- */}
              </div>
              <div className="single-form">
                <div className="">
                  <div className="create-collection">
                    <div
                      htmlFor="collection"
                      className="input-label collection-label"
                    >
                      Collection
                    </div>

                    <div>
                      <Link
                        to={`/create-nft-collection`}
                        // pathname:"/create-nft-collection",
                        state={{
                          data: true,
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          className="color36 font-16 poppins-normal create-text"
                          style={{
                            color: `${fetchPalletsColor(
                              customize.appearance.colorPalette
                            )}`,
                          }}
                        >
                          {" "}
                          Create
                        </span>
                      </Link>
                    </div>
                  </div>
                  {/* <select
                 className="form-control-1 category-select collectionCategory"
                    onChange={(e) => {
                      const addressId = e.target.value.split(",");
                      if (addressId[2] === "NFTinger collection") {
                        setCollectionName(addressId[2]);
                        setCollectionBlockchain(addressId[3]);
                        setCollectionId(addressId[0]);
                        setContractAddress(addressId[1]);
                        setCollectionError("");
                      }
                      if (addressId[3] === "Ethereum") {
                        checkValueOnCollection = blockchainOption.some(
                          (el) => el.value === "ETH"
                        );
                        checkValueOnCollection
                          ? setCollectionError("")
                          : setCollectionError(
                              "( The NFTS in this collection can not be minted as this platform has temporarily stopped minting on Ethereum. )"
                            );
                        setCollectionId(addressId[0]);
                        setContractAddress(addressId[1]);
                        setCollectionName(addressId[2]);
                        setCollectionBlockchain(addressId[3]);
                      } else if (addressId[3] === "Polygon") {
                        checkValueOnCollection = blockchainOption.some(
                          (el) => el.value === "MATIC"
                        );
                        checkValueOnCollection
                          ? setCollectionError("")
                          : setCollectionError(
                              "( The NFTS in this collection can not be minted as this platform has temporarily stopped minting on Polygon.)"
                            );
                        setCollectionId(addressId[0]);
                        setContractAddress(addressId[1]);
                        setCollectionName(addressId[2]);
                        setCollectionBlockchain(addressId[3]);
                      } else if (addressId[3] === "Binance") {
                        checkValueOnCollection = blockchainOption.some(
                          (el) => el.value === "BNB"
                        );
                        checkValueOnCollection
                          ? setCollectionError("")
                          : setCollectionError(
                              "( The NFTS in this collection can not be minted as this platform has temporarily stopped minting on Binance.)"
                            );
                        setCollectionId(addressId[0]);
                        setContractAddress(addressId[1]);
                        setCollectionName(addressId[2]);
                        setCollectionBlockchain(addressId[3]);
                      }
                      if (checkValueOnCollection) {
                      }

                
                    }}
                   
                  >
                    <option className="color82" value="-1" hidden>
                      Select Collection
                    </option>
                    
                    {collectionData.length > 0 &&
                      collectionData.map((item, index) => (
                        <option
                          className="option color82"
                          value={[
                            item._id,
                            item.contractAddress,
                            item.name,
                            item.blockchain,
                          ]}
                        >
                          {item?.name}
                        </option>
                      ))}
                  </select> */}
                  <Select
                    options={collectionData.map((item, index) => {
                      return {
                        label: item.name,
                        value: item._id,
                        key: index,
                     }
                    })}
                    styles={customStyles}  
                    placeholder="Select Collection" 
                    onChange = {(e) => handleCollection(e.value)}                            
                  />
                  <div className="collection-error-message">
                    {collectionError}
                  </div>
                </div>

                <div className="BlockchainDiv" ref={myRef}>
                  <label htmlFor="email" className="input-label">
                    Blockchain*
                  </label>
                  <div style={{ color: "red", fontSize: "15px" }}>
                    {blockchainError}
                  </div>
                  <div className="block-chain-right">
                    <Select
                      className="input-box-1 rm-border blockchainSelect"
                      style={{
                        border:
                          collectionError != ""
                            ? "1px solid red"
                            : "1px solid #C8C8C8",
                      }}
                      onChange={setSelectedOption}
                      options={blockchainOption} //options there
                      placeholder="Select Blockchain"
                      value={
                        collectionBlockchain === "Ethereum"
                          ? defaultValueBlockChain[0]
                          : collectionBlockchain === "Polygon"
                          ? defaultValueBlockChain[1]
                          : collectionBlockchain === "Binance"
                          ? defaultValueBlockChain[2]
                          : selectedOption
                      } //when user select a option from the list
                      isDisabled={
                        collectionName === "NFTinger collection" ? false : true
                      }
                    ></Select>
                  </div>
                </div>

                <div className="input-name">
                  <label htmlFor="email" className=" input-label">
                    Name*
                  </label>
                  <div style={{ color: "red", fontSize: "15px" }}>
                    {nameError}
                  </div>
                  <input
                    type="text"
                    className="form-control-1"
                    style={{
                      border:
                        nameError != "" ? "1px solid red" : "1px solid #C8C8C8",
                    }}
                    name="email"
                    placeholder="Enter name"
                    autoComplete="off"
                    maxLength="20"
                    title=" "
                    onChange={(e) => {
                      name.current = e.target.value;
                      var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
                      if (!format.test(e.target.value)) SetNameError("");
                      else if (e.target.value.length != 0) SetNameError("");
                      else if (e.target.value.length > 3) SetNameError("");
                      else SetNameError("");
                    }}
                  />
                </div>

               {/* <div className="input-price">
                  <label htmlFor="price" className=" input-label">
                    Price*
                  </label>
                  <div style={{ color: "red", fontSize: "15px" }}>{error}</div>
                    <input
                      className="form-control"
                      type="number"
                      title=" "
                      placeholder="0"
                      autoComplete="off"
                      style={{
                        border:
                          error != "" ? "1px solid red" : "1px solid #C8C8C8",
                      }}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {
                        price.current = e.target.value;
                        if (e.target.value.length != 0) setError("");
                        else if (
                          e.target.value > "0.004" ||
                          !e.target.value == "0"
                        )
                          setError("");
                        else if (!price.current > "1000000000") setError("");

                        // checkChanges();
                      }}
                    />
                    <span class="input-group-text">
                      {collectionName === "NFTinger Collection"
                        ? priceWithCurrency(selectedOption?.value)
                        : priceWithCurrency(collectionBlockchain)}
                    </span>
                  </div>
                </div>  */}
                <div className="input-description">
                  <label htmlFor="comment" className="input-label pb-2">
                    Description*
                  </label>
                  <div style={{ color: "Red", fontSize: "15px" }}>
                    {DesError}
                  </div>

                  <textarea
                    className="form-control-1 text-area-input"
                    rows="4"
                    id="test"
                    style={{
                      border:
                        DesError != "" ? "1px solid red" : "1px solid #C8C8C8",
                    }}
                    maxLength="1000"
                    name="text"
                    placeholder="Write description"
                    // value={description.current}
                    onChange={(e) => {
                      if (e.target.value != 0) SetDesError("");

                      if (desLength < 1000) {
                        // checkChanges();
                        let x = e.target.value.replace(/\s+/g, "").length;
                        description.current = e.target.value;
                        setDesLength(description.current.length);
                      }
                    }}
                  ></textarea>
                  <span className="color82">
                    {desLength} of 1000 characters and
                    <span>
                      {" "}
                      <span id="linesUsed">0</span> of 20 Lines.
                    </span>
                  </span>
                </div>

                <div className="input-description">
                  <label
                    htmlFor="email"
                    className="input-label"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    Free Minting
                    <span
                      className="mint-mark"
                      onMouseEnter={() => setMintMessageStatus(true)}
                      onMouseLeave={() => setMintMessageStatus(false)}
                    >
                      ?
                    </span>
                    <span
                      className="tooltiptext-myprofile"
                      style={{ opacity: `${mintMessageStatus ? "1" : "0"}` }}
                    >
                      {" "}
                      Your NFT will not be minted until some buyer purchases it.
                      On purchase it will be minted and you will be the first
                      owner.
                    </span>
                    <div
                      onClick={() => setMintStatus(!mintStatus)}
                      className={`${
                        mintStatus
                          ? "myStoreSocialMediaToggleButtonActive"
                          : "myStoreSocialMediaToggleButton"
                      }`}
                    >
                      <div
                        className={`${
                          mintStatus
                            ? "myStoreSocialMediaTogglerActive"
                            : "myStoreSocialMediaToggler"
                        }`}
                      ></div>
                    </div>
                  </label>
                  <p className="headingFreeMinting">
                    Buyer will pay gas fees for minting
                  </p>
                </div>

                <div className="input-name">
                  <label htmlFor="email" className=" input-label">
                    Royalty
                  </label>
                  <p className="headingRoyality">
                    Write down the percentage you want from this sale of this
                    NFT
                  </p>
                  <div style={{ color: "red", fontSize: "15px" }}>
                    {royalityError}
                  </div>
                  <input
                    type="number"
                    id="royality"
                    className="form-control-1"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter Royalty"
                    autoComplete="off"
                    maxLength="100"
                    style={{
                      border:
                        royalityError != ""
                          ? "1px solid red"
                          : "1px solid #C8C8C8",
                    }}
                    title=" "
                    onChange={(e) => {
                      if (+e.target.value > 50)
                        setRoyalityError(
                          "( Royalty can not be more than 50% )"
                        );
                      else setRoyalityError("");
                      royality.current = e.target.value;
                    }}
                  />
                </div>

                {/* <div className="input-description">
                    <label htmlFor="email" className="input-label" style={{display: 'flex', alignItems: 'center'}}>
                      Put it on sale                      
                      <div onClick={()=>setSaleStatus(!saleStatus)} style={{marginLeft: '115px'}} className={`${saleStatus ? 'myStoreSocialMediaToggleButtonActive' : 'myStoreSocialMediaToggleButton'}`}><div className={`${saleStatus ? 'myStoreSocialMediaTogglerActive' : 'myStoreSocialMediaToggler'}`}></div></div>
                    </label>
                    <p className="headingRoyality">
                    The NFT will be available for Sale in the marketplace
                    </p>
                  </div> */}

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="submit-button createNFtButton"
                  disabled={!enabled}
                  style={{
                    opacity: !enabled ? 0.6 : 1,
                    backgroundColor: `${fetchPalletsColor(
                      customize.appearance.colorPalette
                    )}`,
                  }}
                >
                  Create
                </button>
                {/* 
                  <button
                    type="submit"
                    onClick={batchMintNFT}
                    className="submit-button"
                  >
                    Batch MintNFT
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ---------------- */}
      {/* <div className="mint-mod-outer"> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.addUserData,
  };
};
export default CreateSingleNFT;
