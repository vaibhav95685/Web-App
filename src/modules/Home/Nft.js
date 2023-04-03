import React, { useEffect, useState, useRef } from "react";
import "../../assets/styles/Notification.css";
import "../../assets/styles/homenftcard.css";
import NftToggle from "../../common/components/NftToggle";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getNFtsData } from "../../services/webappMicroservice";
import { useSelector,useDispatch } from "react-redux";
import Spinner from "../../common/components/Spinner";
import NftCardsHome from "../../common/components/NftCardsHome";
import dropdown from "../../assets/images/dropdown.svg";
import { Button } from "react-bootstrap";
import NoItem from "../../assets/images/Noitems.svg";

import { fetchPalletsColor } from "../../utility/global";
// MUI select code
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import NftCartLoader from "./NftCardLoader";
import Navbar from "../../common/components/Navbar";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import EthereumIcon from "../../assets/images/Ethereum.png";
import PolygonIcon from "../../assets/images/polygon.png";
import BinanceIcon from "../../assets/images/binance.png";
import { NFTSData } from "../../reducers/Constants";

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
  min-width: 260px;
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
  min-width: 260px;
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
  font-family: poppins-medium;
  font-size: 14px;

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

const options = [
  { value: "-1", label: "Recently added" },
  { value: "3", label: "Price: Low to High" },
  { value: "2", label: "Price: High to Low" },
  { value: "1", label: "Oldest" },
  { value: "sale", label: "On Sale" },
];

function NftPage(props) {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(props.loaderState);
  const { loggedInUser } = user;
  const appearance = useSelector((state) => state.customize.appearance);
  const [limit, setLimit] = useState(16);
  const [filterReq, setFilterReq] = useState({
    minPrice: "",
    maxPrice: "",
    sort: "-1",
    userId: loggedInUser?._id,
    limit: limit,
  });
  const [nfts, setNfts] = useState([]);
  const [totalNftCount, setTotalNftCount] = useState(0);
  const [toggleNft, setToggleNft] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef();
  const [priceRangeBox2, setPriceRangeBox2] = useState(false);
  const [currencyTypeImage, setCurrencyTypeImage] = useState("EthereumIcon");
  const [currencyType, setCurrencyType] = useState("Ether");

  useEffect(() => {
    if (user?.loggedInUser !== null) {
      setFilterReq({ ...filterReq, userId: loggedInUser?._id });
    }
  }, [loggedInUser]);

  let saleobj = {
    onSale: true,
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      await getNFtsData(user?.tenantId,filterReq, (res) => {
        setIsLoading(true);
        if (res.success) {
          setNfts(res.responseData.nftContent);
          setTotalNftCount(res.responseData.totalNftCount);
          dispatch({type:"NFTSData",payload:res.responseData.nftContent })
          setIsLoading(false);
        } else {
          toast.error(res.message);
          setIsLoading(false);
        }
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setLoader(true);
    async function fetchData() {
      if (filterReq.sort === "sale") {
        await getNFtsData(user?.tenantId,{ onSale: true }, (res) => {
          setIsLoading(true);
          if (res.success) {
            setNfts(res.responseData.nftContent);
            setTotalNftCount(res.responseData.totalNftCount);
            setIsLoading(false);
            setLoader(false);
          } else {
            toast.error(res.message);
            setIsLoading(false);
            setLoader(false);
          }
        });
      } else {
        await getNFtsData(user?.tenantId,filterReq, (res) => {
          setIsLoading(true);
          if (res.success) {
            setNfts(res.responseData.nftContent);
            setTotalNftCount(res.responseData.totalNftCount);
            setIsLoading(false);
            setLoader(false);
          } else {
            toast.error(res.message);
            setIsLoading(false);
            setLoader(false);
          }
        });
      }
    }
    fetchData();
  }, [filterReq, limit]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const handlePriceFilter = (e) => {
    setIsMenuOpen(false);
    let currency = "";
    if (currencyType === "Ether"){
      currency = "ETH";
    } else if (currencyType === "Matic"){
      currency = "MATIC";
    } else if (currencyType === "BNB"){
      currency = "BNB";
    }
    setFilterReq({ ...filterReq, minPrice: minPrice, maxPrice: maxPrice, currency: currency});
  };
  const clearPriceFilter = (e) => {
    setMaxPrice("");
    setMinPrice("0");
    setFilterReq({ ...filterReq, minPrice: "", maxPrice: "" });
  };
  const handleSort = (e) => {
    setFilterReq({ ...filterReq, sort: e });
  };

  const loadMoreHandler = () => {
    <div className="spinnerloader">{isLoading && <Spinner />}</div>;
    // setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
    setLimit((prevLimit) => prevLimit + 16);
    setFilterReq({ ...filterReq, limit: limit });
  };

  const handleLoadOut = (e, type = false) => {
    const button = e.target;

    button.style.color = fetchPalletsColor(appearance.colorPalette);

    if (type) button.style.background = "#ffffff";
    else button.style.background = "#edf2fd 0% 0% no-repeat padding-box";
  };

  const handleLoadHover = (e) => {
    const button = e.target;

    button.style.color = "#ffffff";
    button.style.background = fetchPalletsColor(appearance.colorPalette);
  };

  const customStyles = {
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "black", // Custom colour
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    }),
  };

  const handleCurrencyType = (Image, Type) => {
    setCurrencyTypeImage(Image);
    setCurrencyType(Type);
    setPriceRangeBox2(false);
  };

  return (
    <>
      <div className="ntf_div">
        <NftToggle
          toggleNft={toggleNft}
          appearance={appearance}
          loader={props.loaderState}
        />
        <div className="lower__homepage" style={{ width: "100%" }}>
          {props.loaderState ? (
            <Skeleton width={`250px`} height={`36px`} />
          ) : (
            <div
              id="filters filter-large"
              className="filter"
              style={{ gap: "30px" }}
            >
              <div
                className="mobilenftTilePageSecondSelect dropdown"
                ref={ref}
                style={{
                  border: "1px solid #d2d2d2",
                  padding: "9px 12px 9px 12px",
                }}
              >
                <p className="mb-0 sale-type">
                  Price range{" "}
                  <span style={{ color: "#858585" }}>
                    {minPrice}-{maxPrice}{" "}
                    {currencyTypeImage === "EthereumIcon" && "ETH"}
                    {currencyTypeImage === "PolygonIcon" && "MAT"}
                    {currencyTypeImage === "BinanceIcon" && "BNB"}
                  </span>{" "}
                </p>
                <div className="filter-drop">
                  <div className="d-flex justify-content-end w-100">
                    {/* <div className="text">All</div> */}
                    <div>
                      {isMenuOpen ? (
                        <img
                        alt=""
                        src={dropdown}
                        className="rotateImg180"
                        style={{ height: "13px", marginLeft: "8px" }}
                        onClick={() => setIsMenuOpen((oldState) => !oldState)}
                      />
                      ) : (
                        <img
                        alt=""
                        src={dropdown}
                        style={{ height: "13px", marginLeft: "8px" }}
                        onClick={() => setIsMenuOpen((oldState) => !oldState)}
                      />
                      )}
                      
                    </div>
                  </div>
                  <div
                    className="filter-item"
                    style={{ display: isMenuOpen ? "block" : "none" }}
                  >
                    <div
                      className="PriceRangeBoxDropDownCurrencyType"
                      onClick={() => setPriceRangeBox2(!priceRangeBox2)}
                    >
                      <div className="PriceRangeBoxDropDownCurrencyTypeName">
                        {currencyTypeImage === "EthereumIcon" && (
                          <img src={EthereumIcon} alt="ethereum" />
                        )}
                        {currencyTypeImage === "PolygonIcon" && (
                          <img src={PolygonIcon} alt="ethereum" />
                        )}
                        {currencyTypeImage === "BinanceIcon" && (
                          <img src={BinanceIcon} alt="ethereum" />
                        )}
                        <span className="currency-Name">{currencyType}</span>
                      </div>
                      {priceRangeBox2 ? (
                        <BsChevronUp style={{ cursor: "pointer" }} />
                      ) : (
                        <BsChevronDown style={{ cursor: "pointer" }} />
                      )}
                      
                    </div>
                    {priceRangeBox2 ? (
                      <div className="PriceRangeBoxDropDownCurrencyTypeDropDown">
                        <div
                          className="selectDisplayFlex etherDiv"
                          onClick={() =>
                            handleCurrencyType("EthereumIcon", "Ether")
                          }
                        >
                          <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                            <img src={EthereumIcon} alt="ethereum" />
                            <span className="currency-Name">Ether</span>
                          </div>
                          {currencyTypeImage === "EthereumIcon" && (
                            <AiOutlineCheck style={{ color: "#366EEF" }} />
                          )}
                        </div>
                        <div
                          className="selectDisplayFlex maticDiv"
                          onClick={() =>
                            handleCurrencyType("PolygonIcon", "Matic")
                          }
                        >
                          <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                            <img src={PolygonIcon} alt="ethereum" />
                            <span className="currency-Name">Matic</span>
                          </div>
                          {currencyTypeImage === "PolygonIcon" && (
                            <AiOutlineCheck style={{ color: "#366EEF" }} />
                          )}
                        </div>
                        <div
                          className="selectDisplayFlex bnbDiv"
                          onClick={() =>
                            handleCurrencyType("BinanceIcon", "BNB")
                          }
                        >
                          <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                            <img src={BinanceIcon} alt="ethereum" />
                            <span className="currency-Name">BNB</span>
                          </div>
                          {currencyTypeImage === "BinanceIcon" && (
                            <AiOutlineCheck style={{ color: "#366EEF" }} />
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="row mb-3 align-items-center">
                          <div className="col-5">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Min"
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
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <Button
                              type="submit"
                              onClick={(e) => clearPriceFilter(e)}
                              variant="outline-primary"
                              onMouseOver={(e) => handleLoadHover(e)}
                              onMouseOut={(e) => handleLoadOut(e, true)}
                              style={{
                                color: `${fetchPalletsColor(
                                  appearance.colorPalette
                                )}`,
                                border: `1px solid ${fetchPalletsColor(
                                  appearance.colorPalette
                                )}`,
                              }}
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="col-6">
                            <Button
                              onClick={(e) => handlePriceFilter(e)}
                              variant="outline-primary"
                              className="accept-button"
                              onMouseOver={(e) => handleLoadHover(e)}
                              onMouseOut={(e) => handleLoadOut(e, true)}
                              disabled={maxPrice?.length > 0 ? false : true}
                              style={{
                                color: `${fetchPalletsColor(
                                  appearance.colorPalette
                                )}`,
                                border: `1px solid ${fetchPalletsColor(
                                  appearance.colorPalette
                                )}`,
                                backgroundColor:
                                  maxPrice?.length > 0 ? "#366EEF" : "#9AB6F7",
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="mobilenftTilePageThirdSelect"> */}
          {props.loaderState ? (
            <Skeleton width={`250px`} height={`36px`} />
          ) : (
            <Select
              className="select-element"
              onChange={(e) => handleSort(e.value)}
              options={options}
              placeholder="Sort by All"
              isSearchable={false}
              styles={customStyles}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: "#191919", // Placeholder color
                },
              })}
            />
          )}
          {/* <CustomSelect
              name="sort"
              id="sale"
              onChange={(e) => handleSort(e)}
              value={filterReq.sort}
              defaultValue="all"
            >
              <StyledOption value="-1" hidden>Sort By</StyledOption>
              <StyledOption value="1">Ascending Order</StyledOption>
              <StyledOption value="-1">Descending Order</StyledOption>
            </CustomSelect> */}
          {/* </div> */}
        </div>
        <div
          className="nftTileContainer row   ntf_row cards-container"
          // style={{ justifyContent: "start" }}
        >
          <div className="spinnerloader homepage-noitem">
            {isLoading || props.loaderState ? (
              <>
                <NftCartLoader key={`nft-1`} mr={"5%"} />
                <NftCartLoader key={`nft-2`} />
                <NftCartLoader key={`nft-3`} />
                <NftCartLoader key={`nft-4`} mr={0} />
              </>
            ) : (
              nfts.length === 0 && (
                <div className="Noitemdiv">
                  <img className="no-image" src={NoItem} alt="No-items" />
                  <p className="textitem">No items available</p>
                </div>
              )
            )}
          </div>

          {nfts.length > 0 &&
            nfts.map((nft) => {
              return (
                <>
                  <NftCardsHome
                    nft={nft}
                    appearance={appearance}
                    loader={loader || props.loaderState ? true : false}
                  />
                </>
              );
            })}
          {totalNftCount > nfts.length && (
          <div style={{ textAlign: "center" }}>
            {props.loaderState ? (
              <Skeleton
                className="load-more"
                style={{ background: "#ededed" }}
              />
            ) : (
              <button
                onMouseOver={(e) => handleLoadHover(e)}
                onMouseOut={(e) => handleLoadOut(e)}
                style={{
                  color: `${fetchPalletsColor(appearance.colorPalette)}`,
                }}
                className="load-more"
                onClick={loadMoreHandler}
              >
                Load More
              </button>
            )}
          </div>
          )}
          {/* {visibleBlogs >= nfts.length ? (
            visibleBlogs >= nfts.length && !isLoading ? (
              <div style={{ textAlignLast: "center" }}>
                <button className="endButton"> End </button>
              </div>
            ) : (
              ""
            )
          ) : (
            <div style={{ textAlignLast: "center"}}>
              <button onMouseOver={(e)=>handleLoadHover(e)} onMouseOut={(e)=>handleLoadOut(e)} style={{color: `${fetchPalletsColor(appearance.colorPalette)}`}} className="load-more" onClick={loadMoreHandler}>
                Load More
              </button>
            </div>
          )} */}
        </div>
      </div>
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

export default NftPage;
