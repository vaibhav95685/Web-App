import React ,{useState}from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getParamTenantId} from "../../utility/global"
import { BsChevronUp } from "react-icons/bs";
import DropDown from "../../assets/images/drop-down-arrow.svg"
import {

  RedirectTo,

} from "../../reducers/Action";
import { useNavigate } from "react-router-dom";
// import Upper_MyItems from "./Upper_MyItems";
// import { Myitem_API } from "../API/MyItemApi";

function Menu(props) {
  const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandList,setExpandList]=useState(false);

  const manageNavigation = (name) => {
    if (name == "create") {
      if (walletAddress == null) {
        dispatch(RedirectTo("create"));
        navigate("/add-wallet");
      } else {
        navigate("/create-nft");
      }
    }
    if (name == "profile") {
      if (walletAddress == null) {
        dispatch(RedirectTo("profile"));
        navigate("/add-wallet");
        // navigate("/my-profile");
      } else {
        navigate("/my-profile");
      }
    }
  };
  return (
    <>
      <div className="container new-container menuphone">

        <div className="menuin" style={{
          display: "flex", cursor: "pointer",
          justifyContent: "space-between"
        }} onClick={() => { navigate('/nfts'); props.handleHamburger(); }}>
          <h2 style={{
            textDecoration: "none",
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "600",

          }}>

            Marketplace

          </h2>
          <i className="fas fa-chevron-right"></i>



        </div>
        <div className="menuin" style={{
          display: "flex", cursor: "pointer",
          justifyContent: "space-between"
        }} onClick={() => { navigate('/leader-board'); props.handleHamburger(); }}>
          <h2 style={{
            textDecoration: "none",
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}>

            Leaderboard

          </h2>
          <i className="fas fa-chevron-right"></i>
        </div>

        <div className="menuin" style={{
          display: "flex", cursor: "pointer",
          justifyContent: "space-between"
        }}  onClick={()=>{setExpandList(!expandList);}}>
          {/* <h2>Resources</h2> */}
          <li className="nav-item dropdown list-unstyled">
            <a
              className="nav-link dropdown"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: "1.1rem" }}
            >
              Resource
            </a>
         

          </li>
          {expandList ? (<img src={DropDown} className="drop_down_arrow_menu" />):(<i className="fas fa-chevron-right"></i>)}
          
        </div>

        {expandList ? (
           <>
           <div className="menuin" style={{
             display: "flex", cursor: "pointer",
             justifyContent: "space-between"
           }}  onClick={()=>{navigate('/help-center') ; props.handleHamburger();}}>
             {/* <h2>Resources</h2> */}
             <li className="nav-item dropdown list-unstyled">
               <a
                 className="nav-link dropdown"
                 href="#"
                 id="navbarDropdown"
                 role="button"
                 data-bs-toggle="dropdown"
                 aria-expanded="false"
                 style={{ fontSize: "1.1rem" }}
               >
                 Help-center
               </a>
            
   
             </li>
             <i className="fas fa-chevron-right"></i>
           </div>
           <div className="menuin" style={{
             display: "flex", cursor: "pointer",
             justifyContent: "space-between"
           }}  onClick={()=>{navigate('/suggestion');props.handleHamburger()}}>
             {/* <h2>Resources</h2> */}
             <li className="nav-item dropdown list-unstyled">
               <a
                 className="nav-link dropdown"
                 href="#"
                 id="navbarDropdown"
                 role="button"
                 data-bs-toggle="dropdown"
                 aria-expanded="false"
                 style={{ fontSize: "1.1rem" }}
               >
                 Suggestion
               </a>
            
   
             </li>
             <i className="fas fa-chevron-right"></i>
           </div>
           </>

        ):""}

       

        <button className="py-2" onClick={() => { manageNavigation("create"); props.handleHamburger(); }}>

          <Link
            to={walletAddress == null ? "/add-wallet" : "/create-nft"}
            className="btn btn-primary btnnav"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            Create
          </Link>

        </button>
      </div>
    </>
  );
}

export default Menu;
