import React, { useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../API/LeaderBoardApi";

import "../../assets/styles/Leader.css";
import "../../assets/styles/collectiondetail.css";
import { Link } from "react-router-dom";
import { AbstractApi } from "../../constants/LeaderBoardApi copy";
import { useParams } from "react-router-dom";
import {
  getCollection,
  getNftsByCollectionId,
  addCollectionReport,
} from "../../services/webappMicroservice";
import search from "../../assets/images/search.svg";
import dropdown from "../../assets/images/dropdown.svg";
import NftCardsHome from "../../common/components/NftCardsHome";
import PageNotFound from "../../common/components/pageNotFound";
import CollDetailCard from "../../common/components/CollDetailCard";
import NoItem from "../../assets/images/Noitems.svg";
import { Button } from "react-bootstrap";
import Spinner from "../../common/components/Spinner";
// MUI select code
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import { ShimmerCircularImage, ShimmerThumbnail } from "react-shimmer-effects";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlagIcon from "@mui/icons-material/Flag";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import NftCartLoader from "../Home/NftCardLoader";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  background: url(${dropdown});
  background-position: 95%;
  background-repeat: no-repeat;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.25rem;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: #191919;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  @media only screen and (max-width:767px) {
    width:100%;
    margin-top:16px;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 200px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid #F4F4F4;
  border-radius: 0.25em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;

  @media only screen and (max-width:767px) {
    width:100%;
  }
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.25em;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

const queryString = require("query-string");

function CollectionDetails({ loader }) {
  const { user } = useSelector((state) => state);
  const defaultFilter = {
    searchByName: "",
    status: "",
    sortBy: "",
    minPrice: "",
    maxPrice: "",
  };
  const collectionId = useParams();
  const [collection, setCollection] = useState([]);
  const [statusDrop, setStatusDrop] = useState(false);
  const [priceDrop, setPriceDrop] = useState(false);
  const [sortDrop, setSortDrop] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [checkLike, setcheckLike] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState(defaultFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [reportIconClicked, setReportIconClicked] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reason, setReason] = useState("");
  const [isCollectionValid, setIsCollectionValid] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     await getCollection(collectionId.id).then((res) => {
  //       setCollection(res);
  //     });
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      await getCollection(collectionId.id, (response) => {
        if (response.success) {
          setCollection(response.responseData);
        } else {
          setIsCollectionValid(false);
        }
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const reqObj = queryString.stringify(filter);
      await getNftsByCollectionId(collectionId.id, reqObj).then((res) => {
        setNfts(res.nftContent);
        setIsLoading(false);
      });
    }
    fetchData();
  }, [filter]);

  const { _id, imageUrl, coverUrl, name, description, blockchain } = collection;
  const handleLike = () => {
    setcheckLike(!checkLike);
  };

  const setPrice = () => {
    setFilter({ ...filter, minPrice: minPrice, maxPrice: maxPrice });
    setPriceDrop(!priceDrop);
  };

  const clearValues = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const handleStatus = (e) => {
    setFilter({ ...filter, status: e });
  };

  const handleSort = (e) => {
    setFilter({ ...filter, sort: e });
  };
  let [imageLoading, setImageLoading] = useState({
    src: imageUrl,
    loaded: false,
  });
  let [bannerImage, BannerLoading] = useState({ src: coverUrl, loaded: false });

  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  };
  const onBannerLoad = () => {
    setImageLoading({ ...bannerImage, loaded: true });
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

  const options = [
    {
      value: "Fake collection or possible scam",
      label: "Fake collection or possible scam",
    },
    {
      value: "Explicit and sensitive content",
      label: "Explicit and sensitive content",
    },
    { value: "Might be stolen", label: "Might be stolen" },
  ];

  const sendReport = async () => {
    if (reason !== "") {
      let report = {
        collectionId: _id,
        addedBy: user?.loggedInUser?._id,
        reason: reason,
      };
      const reportObj = queryString.stringify(report);
      await addCollectionReport(reportObj, (response) => {
        if (response.success) {
          toast.success(response.message);
          setOpenReportModal(false);
        } else {
          toast.error(response.message);
          setOpenReportModal(false);
        }
      });
    } else {
      toast.error("Please select a reason");
    }
  };

  return (
    <>
      {!isCollectionValid && <PageNotFound />}
      {isCollectionValid && (
        <>
          <div>
            <div className="coldet-banner">
              <img
                src={coverUrl}
                alt=""
                style={{ objectFit: "cover" }}
                onLoad={onBannerLoad}
              />
              {!imageLoading.loaded && (
                <div className="bannerLoader">
                  <ShimmerThumbnail
                    className="thumbnail"
                    fitOnFrame={true}
                    rounded
                  />
                </div>
              )}
            </div>
            <div className="coldet-bio">
              <div className="coldet-avatar">
                <img
                  className="col-avatar"
                  src={imageUrl}
                  onLoad={onImageLoad}
                  alt=""
                />
                {!imageLoading.loaded && (
                  <div className="collectionDetailLoader">
                    <ShimmerCircularImage
                      className="thumbnailCirular"
                      fitOnFrame={true}
                      rounded
                    />
                  </div>
                )}
              </div>
              <div
                className="more-hori-div"
                onClick={() => setReportIconClicked(!reportIconClicked)}
              >
                <MoreHorizIcon sx={{ color: "#AFAFAF", fontSize: "40px" }} />
                {reportIconClicked && (
                  <>
                    <div
                      className="report-text-div"
                      onClick={() => setOpenReportModal(true)}
                    >
                      <FlagIcon />
                      Report
                    </div>
                  </>
                )}
              </div>
              <div className="coll-blockchain">
                {loader ? <Skeleton width="30px" height="30px" /> : blockchainCheck(blockchain)}
              </div>
              <div className="colusername">{loader ? <Skeleton width="200px" height="35px" /> : name}</div>
              <div className="coluserdes" title={description}>
                {
                  loader ? <Skeleton width="300px" count={5} /> : undefined !== description && description.length > 512
                    ? description.slice(0, 512) + "..."
                    : description
                }
              </div>
            </div>
            {/* <div className="coldet-bio">
          <div className="coldet-avatar">
          <div className="collectionDetailContainer">
            
            <img className="col-avatar" src={imageUrl} onLoad={onImageLoad} alt="" />
            {!imageLoading.loaded && (
            <div className="collectionDetailLoader"> 
                <ShimmerCircularImage className="thumbnailCirular" fitOnFrame={true} rounded />
              </div>
          )}
            </div>
          </div>
          <span>{blockchainCheck(blockchain)} </span>
          <div className="colusername">{name}</div>

          <div className="coluserdes" title={description}>
            {undefined !== description && description.length >512 ? description.slice(0,512)+"...":description}
          </div>
        </div> */}
            <div className="collection-body">
              <div className="collfilters">
                <div className="colleftfilter">

                  <div className="searchboxcol">
                    <input
                      type="text"
                      name="searchByName"
                      placeholder="Search"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      className="inputsearch"
                      onChange={(e) =>
                        setFilter({ ...filter, searchByName: e.target.value })
                      }
                    />
                    <div>
                      <img src={search} className="searchicon" />
                    </div>
                  </div>
                  <div>
                    <CustomSelect
                      name="status"
                      onChange={(e) => handleStatus(e)}
                      value={filter.status}
                      defaultValue=""
                    >
                      <StyledOption value="" hidden>
                        Status
                      </StyledOption>
                      <StyledOption value="">All</StyledOption>
                      <StyledOption value="onsale">Open for sale</StyledOption>
                      <StyledOption value="new">New</StyledOption>
                    </CustomSelect>
                  </div>

                  <div className="colldrop">
                    <div className="statusText">Price</div>
                    <div>
                      <img
                        src={dropdown}
                        alt="arrow"
                        onClick={(e) => setPriceDrop(!priceDrop)}
                      />
                    </div>
                    {priceDrop && (
                      <div className="dropitems">
                        <div className="row mb-3 align-items-center">
                          <div className="col-5">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Min"
                              name="minPrice"
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                            />
                          </div>
                          <div className="col-2 text-center">
                            <span className="to">to</span>
                          </div>
                          <div className="col-5">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Max"
                              name="maxPrice"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5">
                            <Button
                              variant="outline-primary"
                              onClick={clearValues}
                              className="clear-btn"
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="col-2"></div>
                          <div className="col-5">
                            <Button
                              variant="outline-primary"
                              onClick={setPrice}
                              className="clear-btn"
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

            

                  <div className="ms-md-auto">
                    <CustomSelect
                      name="sort"
                      onChange={(e) => handleSort(e)}
                      value={filter.sort}
                      defaultValue=""
                    >
                      <StyledOption value="" hidden>
                        Sort By
                      </StyledOption>
                      {/* <StyledOption value="">All</StyledOption> */}
                      <StyledOption value="1">Recently added</StyledOption>
                      <StyledOption value="2">Price: High to Low</StyledOption>
                      <StyledOption value="3">Price: Low to High</StyledOption>
                    </CustomSelect>
                  </div>
                </div>
              </div>
              <div className="nftTileContainer row cards-gap ntf_row">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {isLoading || loader ? (
                    <>
                      <NftCartLoader mr="5%" />
                      <NftCartLoader />
                      <NftCartLoader />
                      <NftCartLoader mr="0" />
                    </>
                  ) : (
                    nfts.length === 0 && (
                      <div className="Noitemdiv">
                        <img className="no-item-image" src={NoItem} />
                        <p className="textitem">No items available</p>
                      </div>
                    )
                  )}
                </div>

                {loader===false && isLoading === false && nfts.length > 0 &&
                  nfts.map((nft) => {
                    return <CollDetailCard nft={nft} />;
                  })}
              </div>
            </div>
          </div>
          <div
            className="report-outer"
            style={{ display: openReportModal ? "block" : "none" }}
          >
            <div className="report-abs-modal">
              <div className="report-modal">
                <div className="report-inner" style={{ opacity: "1" }}>
                  <div className="reportthisitem">
                    <h3 className="report-text poppins-normal">
                      Report this collection
                    </h3>
                    <i
                      className="fa-solid fa-xmark cross-icon icrossicon"
                      onClick={() => setOpenReportModal(false)}
                    ></i>
                  </div>
                  <div className="singlerowmodal">
                    <h3 className="reason-text"> Reason</h3>
                    <Select
                      onChange={(e) => setReason(e.value)}
                      options={options}
                      isSearchable
                    />
                  </div>
                  <button
                    className="btn btn-primary report-btn"
                    onClick={sendReport}
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CollectionDetails;
