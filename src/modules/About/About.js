import React, { useEffect, useState } from "react";
import { getAboutData } from "../../services/contentMicroservice";
import axios from "axios";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { BASE_URL2, WHITE_LABEL_TOKEN } from "../../reducers/Constants";
import "../../assets/styles/about.css";
import { useSelector } from "react-redux";
import { fetchPalletsColor } from "../../utility/global";
import Skeleton from "react-loading-skeleton";
const dev_url = "https://goi4mbj86f.execute-api.us-east-1.amazonaws.com/dev/"; // need to store it in .env file

function About({ loader }) {

  const appearance = useSelector(state => state.customize.appearance);

  const [aboutData, setAboutData] = useState([]);
  useEffect(() => {
    (async () => {
      const url = `${dev_url}api/v1/about/61f7b7a4c017de6244c51144`;
      const { data } = await axios.get(url);
      setAboutData(data.responseData.about);
    })();
    // return () => {};
  }, []);
  return (
    <>
      <div className="mainDiv" >
        <div className="HeadingTag">
          <h2>{loader ? <Skeleton width="80%" height="40px" /> : 'About NFT marketplace'}</h2>
        </div>
        <p className="titleAbout">
          {
            loader ? <Skeleton count={6} /> :
              'NFTinger is an NFT Marketplace for the new age decentralised world. The NFTinger tribe can create NFTs on this dedicated marketplace to showcase their Art or they can choose to sell their NFTs. NFTs of any category can be listed on this platform. So, what are you waiting for .... Go Mint,Sell, Buy and Explore... Happy NFTing.'
          }
        </p>
        <div className="Marketplace" >
          <h6 className="marketplaceText">
            {
              loader ? <Skeleton width="200px" /> : 'NFT marketplace in numbers'
            }
          </h6>
          <div className="container">
            <div className="descriptionTag">
              {/* <div clasName="col-sm-3"></div> */}
              {
                loader ? <Skeleton width="100px" height="60px" /> :
                  <div className="first-div ">
                    <p className="valueText" style={{ color: `${fetchPalletsColor(appearance.colorPalette)}` }}>$274M</p>
                    <p className="TitleText">Trading volume</p>
                  </div>
              }
              {
                loader ? <Skeleton width="100px" height="60px" /> :
                  <div className="second-div ">
                    <p className="valueText" style={{ color: `${fetchPalletsColor(appearance.colorPalette)}` }}>405K</p>
                    <p className="TitleText">NFTs created</p>
                  </div>
              }
              {
                loader ? <Skeleton width="100px" height="60px" /> :
                  <div className="third-div ">
                    <p className="valueText" style={{ color: `${fetchPalletsColor(appearance.colorPalette)}` }}>1.6M</p>
                    <p className="TitleText">Total users</p>
                  </div>
              }
              {/* <div className="col-sm-3"></div> */}
            </div>
            <div className="row create-store-padding">
              {/* <div className="col-sm-4"></div> */}
              {
                loader ? <Skeleton width="310px" height="53px" /> :
                  <div className="col-sm-4 maincard">
                    <div
                      className="card cardmob"
                    >
                      <h6 className="text-center font-14 font-weight-700 mt-2">
                        <MailOutlineIcon
                          style={{ fontSize: "35px", color: `${fetchPalletsColor(appearance.colorPalette)}`, marginRight: "5px" }}
                        />
                        Contact Us:{" "}
                        <span>
                          <a href="mailto:hello@NFTinger.com" style={{ color: `${fetchPalletsColor(appearance.colorPalette)}` }}>
                            {
                              "hello@NFTinger.com"
                            }
                          </a>
                        </span>
                      </h6>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
