import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useDropzone } from "react-dropzone";
import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Image from "../../assets/images/img-format.png";
import ethereum from "../../assets/images/ethereum.svg";
import polygon from "../../assets/images/polygon.png";
import binance from "../../assets/images/binance.png";
import success from "../../assets/images/Check.svg";
import { httpConstants } from "../../constants";
import { BASE_URL2 } from "../../reducers/Constants";
import { createCollection } from "../../services/createServices";
import "../../assets/styles/collection.css";
import Bannerdrop from "./Bannerdrop";
import { updateCollectionTxStatus } from "../../services/webappMicroservice";

import { getCategories } from "../../services/clientConfigMicroService";
import Select from 'react-select';
import $ from 'jquery';
import { getTenantData } from "../../services/clientConfigMicroService";
import { fetchPalletsColor } from "../../utility/global";
import CollectionNftShimmer from "./CollectionNftShimmer";

const Button = styled.button``;

function CreateNftCollections(props) {

  const customize = useSelector(state => state.customize);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const [logoCdn, setlogoCdn] = useState("");
  const [bannerCdn, setbannerCdn] = useState("");
  const [logoipfs, setlogoipfs] = useState("");
  const [bannerIpfs, setbannerIpfs] = useState("");
  const [compressedLogo, setCompressedLogo] = useState("")
  const [compressedBanner, setcompressedBanner] = useState("")
  const [isLogoSelected, setisLogoSelected] = useState(false);
  const [isBannerSelected, setisBannerSelected] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const [selectFile, setSelectFile] = useState("");
  const [checkReqField, setCheckReqField] = useState(false);
  const [loaderState, setloaderState] = useState(false);
  const navigation = useNavigate();
  const { loggedInUser, walletAddress } = user;
  const [specialchar, setSpecialChar] = useState("")
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [tenantCategories, setTenantCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    getCategories().then((response) => setDefaultCategories(response));
  }, []);


  const [DesLength, setDesLength] = useState(0);
  const name = useRef("");
  const description = useRef("");
  const imageUrl = useRef("");
  const coverUrl = useRef("");
  const [descriptionText,setDescriptionText]=useState("");
  const blockchain = useRef("Ethereum");
  const categoryId = useRef("");
  const hiddenFileInputImage = useRef(null);
  const hiddenFileInputBanner = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [blockchainOption, setBlockchainOption] = useState([]);
  const [blockchains, setBlockChains] = useState([])
  const handleClickImage = (event) => {
    hiddenFileInputImage.current.click();
  };
  const handleClickBanner = (event) => {
    hiddenFileInputBanner.current.click();
  };
  useEffect(async () => {
    // if (walletAddress == null) {
    //   navigation("/add-wallet");
    // };

    // this code will check if user already connected wallet from localstorage
    if (!localStorage.getItem('has_wallet')) {
      navigation("/add-wallet");
    }
  });

  useEffect(() => {
    $(document).ready(function () {

      var lines = 20;
      var linesUsed = $('#linesUsed');

      $('#test').keydown(function (e) {

        let newLines = $(this).val().split("\n").length;
        linesUsed.text(newLines);

        if (e.keyCode == 13 && newLines >= lines) {

          return false;
        }

      });
    });
  }, [])


  // ------------------drag and drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let formData = new FormData();
      formData.append(
        "attachment",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );

      (async () => {
        const [err, ipfsRes] = await Utils.parseResponse(
          getCollection.addIpfs(formData)
        );
        if (!ipfsRes.ipfsUrl) {
          toast.error("Unable to upload this image");
        } else {
          setlogoipfs(ipfsRes.ipfsUrl);
          setlogoCdn(ipfsRes.cdnUrl);
          setisLogoSelected(true);
        }
      })();

      // setLogoPresent(true);
    },
  });
  // -------------
  const [desLEngth, setDesLEngth] = useState(0);
  const [nameError, SetNameError] = useState("");
  const [DesError, SetDesError] = useState("");
  const handleChangeImage = async (event) => {
    const fileUploaded = event.target.files[0];
    // alert("onchage");
    // props.handleFileImage(fileUploaded);


    let formData = new FormData();
    formData.append("folderName", "collections");
    formData.append("createdBy", `${user.loggedInUser._id}`);
    formData.append("attachment", fileUploaded);
    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) imageUrl.current = result.responseData;

  };

  const handleChangeBanner = async (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFileBanner(fileUploaded);

    let formData = new FormData();
    formData.append("folderName", "collections");
    formData.append("createdBy", `${user.loggedInUser._id}`);
    formData.append("attachment", fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) coverUrl.current = result.responseData;

  };
  const onChangeDes = (e) => {
    const {name,value}=e.target;
    setDesLength(value.length);
  };

  function blockchainValue(value) {
    switch (value) {
      case 'ETH':
        return 'Ethereum'
      case 'MATIC':
        return "Polygon"
      case "BNB":
        return "Binance"
      default:
        return ""
    }
  }
  const handleSubmit = async (e) => {
    var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
    setloaderState(true);
    e.preventDefault();
    // e.preventDefault();
    if (
      logoCdn == "" ||
      bannerCdn == "" ||
      name.current == "" ||
      description.current == "" ||
      blockchain.current == ""
    ) {
      // alert("154");
      setloaderState(false);

      toast.error("Fill the required field");
      return null;
    }
    if (format.test(name.current)) {
      toast.error("Name should be not contain special character");
      setloaderState(false);
      return null;
    }
    if (name.current.length < 3) {
      toast.error("Name Length must be 3 character");
      setloaderState(false);
      return null;
    }


    // alert("here");
    // const data = {
    //   coverUrl: bannerCdn,
    //   imageUrl: logoCdn,
    //   name: name.current,
    //   description: description.current,
    //   blockchain: blockchain.current,
    //   addedBy: user.loggedInUser._id,
    //   // categoryId:categoryId.current,
    // };
    //---------------------
    blockchain.current = blockchainValue(selectedOption?.value);

    const data = {
      coverUrl: bannerCdn,
      // contractAddress: blockchainRes.contract_address,
      imageUrl: logoCdn,
      compressedURL: compressedLogo,
      name: name.current,
      description: descriptionText,
      blockchain: blockchain.current,
      addedBy: user.loggedInUser._id,
      categoryId: categoryId.current,
    };

    //-----------------------
    const result = await createCollection(data);
    if (result.success) {
      const [blockchainError, blockchainRes] = await Utils.parseResponse(
        BlockchainServices.createCollections({
          name: name.current,
          symbol: 'WL',
          blockchain: blockchain.current

        })
      );

      if (blockchainError || !blockchainRes) {
        const [txError, txStatusRes] = await Utils.parseResponse(
          updateCollectionTxStatus({
            contractAddress: "0x",
            status: "failed"
          }, result.responseData._id)
        )
        setloaderState(false);

        return toast.error(
          blockchainError.message || "Please Select valid Network in metamask", { autoClose: 7000, theme: "colored" }
        );
      }
      else {
        const [txErr, txStatus] = await Utils.parseResponse(
          updateCollectionTxStatus({
            contractAddress: blockchainRes.contract_address,
            status: "success"
          }, result.responseData._id)
        )
        setloaderState(false);
        if (location?.state?.data) {
          navigate("/create-single-nft");
        }
        else {
          navigate("/my-items/collection");
        }
        // navigate("/collections-tile");
        return toast.success(
          "Collection created", { autoClose: 7000, theme: "colored" }
        );
        // toast.success("Collection created");


      }

      // setloaderState(false);
      // ("odddddddddddd",result)
      // ("odddddddddddd",result.responseData._id)

      // toast.success("Collection created");
      // navigate("/collections-tile");
    } else {
      toast.error(result.message, { autoClose: 7000, theme: "colored" });
      setloaderState(false);
    }




    // (result, ">>> submit nftCollection");
  };

  let location = useLocation();

  // Blockchain option


  useEffect(() => {
    async function fetchData() {
      const response = await getTenantData()
      setBlockChains(response[0]?.blockchains)
      setTenantCategories(response[0]?.categories)
      // await getTenantData().then(response => setBlockChains(response?.blockchains));
    }
    fetchData();
  }, []);

  useEffect(() => { }, [selectCategory]);


  useEffect(() => {
    // const selectedCategories = defaultCategories.filter((item) => {
    //   if (tenantCategories.find((item2) => item2 == item._id)) {
    //     return item;
    //   } else return;
    // });
    setCategories(defaultCategories);
  }, [tenantCategories, defaultCategories]);

  useEffect(() => {
    for (let eachItem of blockchains) {
      if (eachItem === "Ethereum") {
        blockchainOption.push({ value: 'ETH', label: <div><img src={ethereum} height="32px" alt="" /> Ethereum</div> })
      } else if (eachItem === "Polygon") {
        blockchainOption.push({ value: 'MATIC', label: <div><img src={polygon} height="32px" alt="" /> Polygon</div> })
      } else if (eachItem === "Binance") {
        blockchainOption.push({ value: 'BNB', label: <div><img src={binance} height="32px" alt="" /> Binance</div> })
      }
    }
  }, [blockchains])


  useEffect(() => {

    if (customize.permissionToUploadNft === 'Only me') {
      navigate("/");

      toast.warning("You don't have access to create NFT", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

  }, [customize.permissionToUploadNft])

  useEffect(() => {
    
    $(document).ready(function () {
      var lines = 20;
      var linesUsed = $('#linesUsed');
      $('#test').keydown(function (e) {
        let newLines = $(this).val().split("\n").length;
        linesUsed.text(newLines);
        if (e.keyCode == 13 && newLines >= lines) {
          return false;
        }
      });
    });
  }, [])

  let enabled = name?.current.length > 0 && description?.current.length > 0 && nameError == "" && bannerCdn != "" && logoCdn != "" && DesError == "" && selectCategory?.length > 0;
  return (
    <>
      {loaderState ? (
        <div className="mint-mod-outer">
          <div className="mint-abs">
            <div className="">
              <div className="mint-outer" style={{ opacity: "1" }}>
                <div className="mintbody">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="completelistin">
                      Create your collection
                    </div>
                  </div>
                  <div className="abstractillusion">
                    <img src={logoCdn} />
                    <div className="abstractillusioncontent">
                      <div className="abstracttitle">{name.current}</div>
                      <div className="abstractposter">{blockchain.current}</div>
                      <div className="ethprice"></div>
                    </div>
                  </div>
                  <div className="checkpostcontainer">
                    <div className="checkpost">
                      <img src={success} className="checkimg" />
                      {/* <div className="checkimg">
                        <Oval
                          vertical="top"
                          horizontal="center"
                          color="#00BFFF"
                          height={30}
                          width={30} />
                      </div> */}

                      <div className="checkposttext">
                        <div className="heading">initializing</div>
                        <div className="description"></div>
                      </div>
                    </div>
                    <div className="checkpost">
                      {/* <img src={success} className="checkimg" /> */}
                      <div className="checkimg">
                        <Oval
                          vertical="top"
                          horizontal="center"
                          color="#00BFFF"
                          height={30}
                          width={30} />
                      </div>

                      <div className="checkposttext">
                        <div className="heading">Creating Collection</div>
                        <div className="description"></div>
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
      {
        props.loader ? <CollectionNftShimmer /> :
          <div className="main-container collectionContainer">
            <h1 className="fs-32 fw-b c-b title collectiontitle">Create your collection</h1>
            <p className="fs-16 fw-600 c-b pt-50 uploadCollectionImage">Upload Collection Image*</p>
            <div className="max-width-250 createCollectioDiv">
              {/*{!isLogoSelected && (*/}
              {/*    <div*/}
              {/*      onClick={() => setClickedOn("logo")}*/}
              {/*      className="img-div"*/}
              {/*      {...getRootProps()}*/}
              {/*    >*/}
              {/*      <input*/}
              {/*        {...getInputProps()}*/}
              {/*        name="logo"*/}
              {/*        onChange={() => setClickedOn("logo")}*/}
              {/*      />*/}
              {/*        <img*/}
              {/*          src={logoCdn != "" ? logoCdn : Image}*/}
              {/*          alt="upload-icon"*/}
              {/*          className="upload-icon"*/}
              {/*        />*/}
              {/*        <p className="fs-14 fw-b pt-20">Drag & Drop or <span style={{color:"#366EEF"}}>Browse</span></p>*/}
              {/*    </div>*/}
              {/*)}*/}

              <Bannerdrop
                bannerCdn={logoCdn}
                setbannerCdn={setlogoCdn}
                bannerIpfs={logoipfs}
                setbannerIpfs={setlogoipfs}
                compressedUrl={compressedLogo}
                setCompressedUrl={setCompressedLogo}
                appearance={customize.appearance}
                className="collectionImage"
              />
            </div>
            <div>
              {/* ---------------------------OLD BANNER UPLOAD----------------- */}
              <div className="fs-16 fw-600 c-b pt-20 pb-20 uploadCollectionBanner">Upload Collection Banner*</div>

              <Bannerdrop
                bannerCdn={bannerCdn}
                setbannerCdn={setbannerCdn}
                bannerIpfs={bannerIpfs}
                setbannerIpfs={setbannerIpfs}
                compressedUrl={compressedBanner}
                setCompressedUrl={setcompressedBanner}
                appearance={customize.appearance}
                className="collectionBannerImage"
              />

              {/* ----------------------------- */}
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="collectionCommonDivFirst">
                  <p className="fs-16 fw-b c-b pt-4 heading-common-collection">Collection Name*</p>
                  <div style={{ color: "Red", fontSize: "13px" }}>{nameError}</div>
                  <input
                    type="name"
                    name="name"
                    maxLength="400"
                    className="input-box-1 input-common-collection"
                    style={{ border: nameError != "" ? "1px solid red" : "1px solid #C8C8C8" }}
                    placeholder="Write your collection name"
                    onChange={(e) => {
                      name.current = e.target.value;
                      var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
                      if (!format.test(name.current))
                        SetNameError("")
                      else if (name.current.length != 0)
                        SetNameError("")
                      else if (!name.current.length < 3)
                        SetNameError("( Name should be atleast 3 character )")
                      //checkReqFieldFun();
                    }}
                  />
                </div>
                <div className="collectionCommonDiv">
                  <p className="fs-16 fw-b c-b pt-3 heading-common-collection">Description*</p>
                  <div style={{ color: "Red", fontSize: "13px" }}>{DesError}</div>
                  <textarea
                    rows="4"
                    id="test"
                    name="Description"
                    placeholder="Write description"
                    maxLength="1000"
                    className="input-box-1 mb-0"
                    onInput={(e)=>{
                      let value=e.target.value;
                      setDescriptionText(e.target.value);
                      setDesLength(value?.length);
                    }}   
                    style={{ border: DesError != "" ? "1px solid red" : "1px solid #C8C8C8" }}
                    value={descriptionText}
                    onFocus={(e) => {
                      var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
                      if (format.test(name.current))
                        SetNameError("( No Special Character Allowed )");

                      else if (name.current.length == 0)
                        SetNameError("( Name is required )")
                      else if (name.current.length < 3)
                        SetNameError("( Name should be atleast 3 character )")
                      else
                        SetNameError("");
                    }}
                    onChange={(e) => {
                      if (e.target.value.length == 0) {
                        SetDesError("(Description is required)")
                      } else
                        SetDesError("")
                      if (DesLength < 1000) {
                        description.current=e.target.value;
                        setDescriptionText(e.target.value);
                        onChangeDes(e);
                        // checkReqFieldFun();
                      }
                    }}
                  ></textarea>
                  <span className="fs-14" style={{ color: "#707070" }}>{DesLength} of 1000 characters and
                    <span> <span id="linesUsed">0</span> of 20 Lines.</span></span>
                </div>
                <div className="collectionCommonDiv">
                  <div className="fs-16 fw-b c-b pt-3 pb-3 heading-common-collection">Category</div>
                  {/* <Link>Create</Link> */}
                  <select
                    className="input-box-1 input-common-collection categoryCollection"
                    onChange={(e) => (categoryId.current = e.target.value, setSelectCategory(e.target.value))}
                  >
                    <option style={{ color: "#707070" }}>Select Category</option>
                    {Categories.map((item, key) => {
                      return <option value={item?._id} style={{ color: "#707070" }}>{item?.name}</option>;
                    })}
                    {/* <option>2</option>
                <option>3</option>
                <option>4</option> */}
                  </select>
                </div>
                <div className="collectionCommonDiv">
                  <div className="fs-16 fw-b c-b pt-3 pb-3 heading-common-collection">Blockchain*</div>
                  {/* <div className="block-chain-container">
                <div>
                  <img src={ethereum} height="32px" />
                </div>
                <div className="block-chain-right">
                  <select
                    className="input-box-1 rm-border blockchainSelect"
                    onChange={(e) => {
                      blockchain.current = e.target.value;
                      checkReqFieldFun();
                    }}
                  >
                    <option selected value="eth">
                      Ethereum
                    </option>
                  </select>
                </div>
              </div> */}
                  <div className="block-chain-right">
                    <Select
                      className="input-box-1 rm-border"
                      defaultValue={blockchainOption[0]}
                      onChange={setSelectedOption}
                      options={blockchainOption}
                      placeholder="Select Blockchain"
                      value={selectedOption}
                    >
                    </Select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={//checkReqField
                    !enabled}
                  className="submit-button"
                  style={{ opacity: enabled ? "1" : "0.5", background: `${fetchPalletsColor(customize.appearance.colorPalette)}` }}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
      }
      <ToastContainer
        position="top-center"
        autoClose={5000}
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


export default CreateNftCollections;