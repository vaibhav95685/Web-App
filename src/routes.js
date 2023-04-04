import "./App.css";
import react, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./reducers/store";
import Navbar from "./common/components/Navbar";
import NftPage from "./modules/Home/Nft";

import Footer from "./common/components/Footer";
import LeaderBoard from "./modules/Leaderboard/LeaderBoard";
import Notification from "./common/components/Notification";
import CollectionCards from "./modules/Collections/CollectionCards";
import Top_collection from "./modules/TopList/Top_collection";
import TopBidders from "./modules/TopList/TopBidders";
// import TopCollection from './components/TopCollection';
import TopSeller from "./modules/TopList/TopSeller";
import Create from "./modules/Create/Create";
import MyProfile from "./modules/MyPages/MyProfile";
import UserProfilePage from "./modules/MyPages/UserProfilePage";

import "./assets/styles/custom.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import HelpCenter from "./modules/Resources/Help/HelpCenter";
import Suggestion from "./modules/Resources/Suggestion";
import Buying from "./modules/Resources/Help/Buying";
import MyItems from "./modules/Items/MyItems";
import EditProfile from "./modules/Profile/EditProfile";
import MyItems_Collection from "./modules/MyPages/MyItemCollection";
import CreateNFT from "./modules/Create/CreateNFT";
import CreateSingleNFT from "./modules/Create/index";
import About from "./modules/About/About";

import CreateNftCollections from "./modules/Create/CreateNftCollections";
import CollectionDetails from "./modules/Collections/CollectionDetails";
import NftInformation from "./modules/Home/index";
// import NftInformationOffer1 from "./modules/Home/NftInformationOffer1";
import EditItem from "./modules/Items/EditItem";
import Wallet from "./modules/Wallet/Wallet";
// import NftInformationFixedPrice from "./modules/Home/NftInformationFixedPrice";
// import FixedPrice from "./modules/Items/FixedPrice";
import Menu from "./common/components/Menu";
import { WEB_APP_USER_WALLET_ADDRESS } from "./reducers/Constants";
import { addUseraction, addUserData } from "./reducers/Action";
import { CheckUserByWalletAddress } from "./services/UserMicroService";
import FAQsPage from "./modules/Faqs/index";
import Home from "./modules/Home/Home";
import CollectionPage from "./modules/Resources/CreateCollection/index";
import NftsPage from "./modules/Resources/AddingNfts/index";
import BuyPage from "./modules/Resources/Buying/index";
import SellPage from "./modules/Resources/Selling/index";
import ScrollToTop from "./ScrollToTop";
import SearchResults from "./common/components/searchResults";
import PageNotFound from "./common/components/pageNotFound";
import Blog from "./modules/blogs/blog";
import Privacy from "./modules/company/privacy";
import TermsAndCondition from "./modules/company/termsAndCondition";
import BlogDetail from "./modules/blogs/blogDetail";
import { getTenantData,getTenantByStoreName } from "./services/clientConfigMicroService";
import { useState } from "react";
import Spinner from "./common/components/Spinner";
import Layout from "./modules/createStore/index";
import HomeStore from './modules/createStore/modules/homeCard';
import {
  getTenantByWallet,
  createSubDomain,
  getTenant,
} from "./services/clientConfigMicroService";
import {  useSelector } from "react-redux";
import Utils from "./utility";
import Billing from "./modules/subscription";
import utility from "./utility"
import { metaMaskConnector } from "./utility/global";
import PutItonSale from "./modules/saleNft";


const url = new URL(window.location.href);
const storeName = url.hostname.split('.');
localStorage.setItem("storeName", storeName[0]);

function App() {
  const dispatch = useDispatch();
  const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;

  const [loader, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const [customizeStore,setCustomizeStore]=useState(false);
  const [storedata,setStoreData]=useState(false);

  useEffect(() => {
    const checkWalletAddress = localStorage.getItem(
      WEB_APP_USER_WALLET_ADDRESS
    );
    if (checkWalletAddress != null) {
      CheckUserByWalletAddress(checkWalletAddress, (res) => {
        localStorage.setItem("WHITE_LABEL_TOKEN", res.token);
        dispatch({type:"token",payload:res.token})
        addUserData(res);
      });
    }
  }, []);

  useEffect(async() => {
    let tenantDataStoreName=await getTenantIdByStoreName(storeName[0]);
    setStoreData(true);
    if (walletAddress == null) {
      if (localStorage.getItem("has_wallet") === "false") {
        setModal(false);
      }
    }
    else{
      if(walletAddress?.address === tenantDataStoreName?.responseData.wallet){
      dispatch({type:"tenantLogin",payload:true})
      setCustomizeStore(true);
      setTimeout(()=>{
        setModal(true);
      })
     
      }
      else{
        dispatch({type:"tenantLogin",payload:false})
        setCustomizeStore(false);
        setModal(false);
      }
    }
  }, [walletAddress?.address,storedata]);

  const getTenantIdByStoreName = async (storeName) => {
    try {
      const [error, result] = await utility.parseResponse(
        getTenantByStoreName('space')
      );
      if(result.success){
        //fetch tenant detail after store exist
        localStorage.setItem("tenantId", result.responseData._id)
      // setTenantId(true)
      dispatch({type:"tenantId", payload:result.responseData._id})
        setTimeout(()=>{
          getTenantData( false,false,result.responseData._id) //pass 
          .then((response) => {
            dispatch({ type: "ADD_CUSTOMIZE_DATA", payload: response[0] });
            dispatch({ type: "ADD_BANNER_NFTS", payload: response[1] });
            setLoader(false);
          })
          .catch((error) => {
            setLoader(false);
          });
        },2000)
       
      }
      return result;
    } catch (error) {
     console.log(error);
    }
  };

  return (
    <div className="App">
      {/* {
         loader && <div className="loader-spinner"><Spinner/></div>
        } */}

      <Router>
        <ScrollToTop />

        <Navbar loader={loader} customizeStore={customizeStore} setModal={setModal} />

        {/* <Tile__homepage /> */}
        {/* <Switch> */}
        <Routes>
          <Route path="/FAQs" element={<FAQsPage />} />
          <Route
            exact
            path="/nfts"
            element={<NftPage loaderState={loader} />}
          />
          <Route path="/" element={<Home loaderState={loader} />} />

          {/* <Route
              exact
              path="/my-profile/nft-information/:id"
              element={<NftInformation />}
            /> */}
          <Route
            exact
            path="/nft-information/:id"
            element={<NftInformation loader={loader} />}
          />
            <Route
            exact
            path="/nft-information/sell-nft/:id/:currency"
            element={<PutItonSale loader={loader} />}
          />

          {/* <Route
              exact
              path="/nft-information_1/:id"
              element={<NftInformation1 />}
            /> */}
          {/* <Route
            // exact
            path="/nft-information_2"
            element={<NftInformation2 />}
          /> */}

          {/* <Route
            exact
            path="/nft-information_Offer_1"
            element={<NftInformationOffer1 />}
          /> */}
          <Route
            exact
            path="/help-center"
            element={<HelpCenter loader={loader} />}
          />
          <Route
            exact
            path="/suggestion"
            element={<Suggestion loader={loader} />}
          />
          <Route exact path="/selling" element={<SellPage />} />
          <Route
            exact
            path="/resource-collection"
            element={<CollectionPage />}
          />
          <Route exact path="/adding-nfts" element={<NftsPage />} />
          {/* ------------------ */}
          <Route
            exact
            path="/top-collection"
            element={<Top_collection loader={loader} />}
          />
          <Route
            exact 
            path="/top-bidder"
            element={<TopBidders loader={loader} />}
          />
          <Route
            exact
            path="/top-seller"
            element={<TopSeller loader={loader} />}
          />
          {/* ----------- */}
          <Route
            exact
            path="/leader-board"
            element={<LeaderBoard loader={loader} />}
          />
          <Route exact path="/buying" element={<BuyPage />} />
          <Route exact path="/my-items/:value" element={<MyItems loader={loader} />} />
          <Route
            exact
            path="/my-items-collection"
            element={<MyItems_Collection />}
          />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/notification" element={<Notification />} />
          <Route
            exact
            path="/create-nft"
            element={<CreateNFT loader={loader} />}
          />
          <Route
            exact
            path="/collection-details/:id"
            element={<CollectionDetails loader={loader} />}
          />

          <Route exact path="/edit-items/:id" element={<EditItem />} />
          <Route
            exact
            path="/collections-tile"
            element={<CollectionCards loader={loader} />}
          />
          <Route
            exact
            path="/create-single-nft"
            element={<CreateSingleNFT loader={loader} />}
          />
          <Route
            exact
            path="/create-nft-collection"
            element={<CreateNftCollections loader={loader} />}
          />
          <Route exact path="/add-wallet" element={<Create />} />
          <Route
            exact
            path="/my-profile"
            element={<MyProfile loader={loader} />}
          />
          <Route
            exact
            path="/user-profile/:id"
            element={<UserProfilePage loader={loader} />}
          />

          <Route
            exact
            path="/edit-profile"
            element={<EditProfile loader={loader} />}
          />
          <Route exact path="/about" element={<About loader={loader} />} />
          <Route exact path="/wallet" element={<Wallet />} />

          {/* <Route
            exact
            path="/nft-information-fixed-price"
            element={<NftInformationFixedPrice />}
          /> */}
          {/* <Route eaxct path="/MyProfile" element={<MyProfile />} /> */}
          {/* <Route exact path="/MyProfile" element={<MyProfile />} /> */}

          {/* <Route
                exact
                path="/CollectionDetails"
                element={<CollectionDetails />}
              /> */}
          {/* <Route exact path="/fixed-price" element={<FixedPrice />} /> */}
          {/* <Route exact path="/CreateNFT" element={<CreateNFT />} /> */}
          {/* <Route
                exact
                path="/CollectionDetails"
                element={<CollectionDetails />}
              /> */}
          {/* <Route exact path="/Highest_Bid" element={<Highest_Bid />} /> */}
          {/* <Route exact path="/ToggleSwitch" element={<ToggleSwitch />} /> */}
          {/* <Route path="/" element={<NftToggle />} /> */}
          {/* <Route path="/" element={<Lower__homepage />} /> */}
          {/* <Route
              exact
              path="/Collection_HomeNftFilters"
              element={<Collection_HomeNftFilters />}
            /> */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/blogs" element={<Blog loader={loader} />} />
          <Route path="/privacy" element={<Privacy loader={loader} />} />
          <Route
            path="/Terms-Condition"
            element={<TermsAndCondition loader={loader} />}
          />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* </Switch> */}
        <Wallet />

        <Footer loader={loader} />
      </Router>

      <Notification />
    </div>
  );
}

function MarketingApp() {
  const [loader, setLoader] = useState(true);

  

  return (
    <div className="App">
      <Router>
        <ScrollToTop />


        <Routes>
          <Route path="/" element={<Layout Element={HomeStore} store={true} />} />
          <Route
            exact
            path="/help-center"
            element={<Layout Element={HelpCenter} />}
          />
          <Route exact path="/buying"  element={<Layout Element={BuyPage} />} />
          <Route exact path="/selling"  element={<Layout Element={SellPage} />} />
          <Route
            exact
            path="/suggestion"
            element={<Layout Element={Suggestion} />}
          />
           <Route
            exact
            path="/resource-collection"
            element={<Layout Element={CollectionPage} />}
          />
          <Route exact path="/adding-nfts"  element={<Layout Element={NftsPage} />} />
          <Route exact path="/about"  element={<Layout Element={About} />} />
          <Route path="/FAQs"  element={<Layout Element={FAQsPage} />} />
        </Routes>
      </Router>
    </div>
  );
}

export { App, MarketingApp };
