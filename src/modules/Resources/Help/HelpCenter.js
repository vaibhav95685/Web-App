import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/helpcenter.css";
import buying from "../../../assets/images/buying.svg";
import selling from "../../../assets/images/selling.svg";
import creating from "../../../assets/images/createCollection.svg";
import adding from "../../../assets/images/addingNfts.svg";
import { useSelector } from "react-redux";
import { fetchPalletsColor } from "../../../utility/global";
import Skeleton from "react-loading-skeleton";

const data = [
  {
    link: "/buying",
    image: buying,
    title: "Buying",
    description:
      "Set up your wallet, connect it to NFTinger and make purchases for your favourite NFTs.",
  },
  {
    link: "/selling",
    image: selling,
    title: "Selling",
    description:
      "Make your NFTs available for sale either by auction or fixed price listings.",
  },
  {
    link: "/resource-collection",
    image: creating,
    title: "Creating Collection",
    description:
      "Create your personalized on-chain collections. Add description, profile and banner images.",
  },
  {
    link: "/adding-Nfts",
    image: adding,
    title: "Adding Nfts",
    description:
      "Showcase your art by adding your NFTs to the marketplace and making them available for sale.",
  },
];

function HelpCenter({ loader }) {

  const appearance = useSelector(state => state.customize.appearance)

  return (
    <div>
      <div className="help-outer">
        <div className="help-center">
          {loader ? <Skeleton width="150px" /> : 'Helpcenter'}
        </div>
        <div className="card-outer-body">

          <Link to={data[0].link} className="link">
            <div className="single-card">
                  {
                    loader ? <Skeleton width="50px" height="50px" /> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 51 51">
                        <g id="Group_706" data-name="Group 706" transform="translate(-76 -797)">
                          <rect id="Rectangle_1035" data-name="Rectangle 1035" width="51" height="51" transform="translate(76 797)" fill="none" />
                          <g id="tag" transform="translate(84 805)">
                            <path id="Path_340" data-name="Path 340" d="M36.617,23.247,23.266,36.6a3.724,3.724,0,0,1-5.27,0L2,20.621V2H20.621l16,16A3.724,3.724,0,0,1,36.617,23.247Z" transform="translate(-2 -2)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            <line id="Line_1" data-name="Line 1" x2="0.019" transform="translate(9.311 9.311)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="6" />
                          </g>
                        </g>
                      </svg>
                  }

                  <div className="title-help">
                    {loader ? <Skeleton width="100px" /> : data[0].title}
                  </div>
                  <div style={{ width: "101.4%"}}>
                    {
                      loader ? <Skeleton count={4} /> : <p title={data[0].description} className="content">
                        {data[0].description}
                      </p>
                    }
                  </div>

            </div>
          </Link>


          <Link to={data[1].link} className="link">
            <div className="single-card">
                  {
                    loader ? <Skeleton width="50px" height="50px" /> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 51 51">
                        <g id="Group_707" data-name="Group 707" transform="translate(-147 -797)">
                          <rect id="Rectangle_1036" data-name="Rectangle 1036" width="51" height="51" transform="translate(147 797)" fill="none" />
                          <g id="Group_219" data-name="Group 219" transform="translate(151 803)">
                            <path id="Path_341" data-name="Path 341" d="M129.5,280.317a2.526,2.526,0,0,0-2.954-.912,2.512,2.512,0,0,0-3.93-1.818l-.414.274a2.5,2.5,0,0,0-3.937-1.74c-3.333,2.807-7.375,5.614-8.421,5.614-.765,0-3.1-1.305-4.976-2.351-2.386-1.34-4.646-2.6-5.916-2.7-2.435-.19-9.824,4.126-10.681,4.617a.71.71,0,1,0,.7,1.235c3.018-1.775,8.379-4.519,9.825-4.435.989.07,3.3,1.4,5.347,2.526,2.7,1.509,4.435,2.463,5.523,2.519a.5.5,0,0,0,.147,0h4.912a1.628,1.628,0,0,1,0,3.256h-.049a45.162,45.162,0,0,1-6.835,0c-1.853-.316-4.21-2.414-4.252-2.435h0a.713.713,0,1,0-.955,1.06c.105.1,2.709,2.407,4.976,2.807a18.8,18.8,0,0,0,2.877.162c2.042,0,4.154-.147,4.288-.154a3.06,3.06,0,0,0-.084-6.084h-1.635a63.685,63.685,0,0,0,6.035-4.484,1.095,1.095,0,0,1,1.242,1.8h-.049l-.056.049-.042.049-.028.133v.786a.98.98,0,0,0,.077.084l.049.035.084.063h.049l.105.035h.414a.9.9,0,0,0,.162-.084l2.281-1.41a1.09,1.09,0,0,1,1.256,1.783l-.737.491a.753.753,0,0,0,.863,1.235l.7-.491,1.362-.912a1.1,1.1,0,1,1,1.4,1.691l-.14.1c-7.8,5.432-16.625,11.088-17.923,11.108-.989,0-3.095-1.277-4.976-2.393-2.105-1.27-4.126-2.463-5.544-2.646-2.807-.379-7.179,2.877-7.663,3.27h0a.716.716,0,1,0,.87,1.137c1.193-.919,4.7-3.242,6.6-3,1.13.147,3.179,1.4,5,2.47,2.231,1.333,4.351,2.59,5.705,2.59,2.372,0,16-9.488,18.73-11.389l.063-.056h0a2.519,2.519,0,0,0,.54-3.48Z" transform="translate(-87.912 -256.753)" fill={fetchPalletsColor(appearance.colorPalette)} stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="0.25" />
                            <path id="Path_342" data-name="Path 342" d="M231.3,50.414a5.213,5.213,0,1,0-3.678-1.532,5.214,5.214,0,0,0,3.678,1.532Zm0-8.99a3.776,3.776,0,1,1-2.669,1.106A3.774,3.774,0,0,1,231.3,41.424Z" transform="translate(-215.022 -39.986)" fill={fetchPalletsColor(appearance.colorPalette)} stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="0.25" />
                            <path id="Path_343" data-name="Path 343" d="M405.637,63.211A4,4,0,1,0,402.8,62.04a4,4,0,0,0,2.835,1.171Zm0-6.575h0a1.066,1.066,0,1,0,0,.007Z" transform="translate(-376.47 -53.99)" fill={fetchPalletsColor(appearance.colorPalette)} stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="0.25" />
                            <path id="Path_344" data-name="Path 344" d="M303.98,184.321a5.213,5.213,0,1,0,1.527-3.68A5.206,5.206,0,0,0,303.98,184.321Zm5.207-3.775h0a3.776,3.776,0,1,1-2.669,1.106,3.776,3.776,0,0,1,2.669-1.106Z" transform="translate(-286.651 -167.956)" fill={fetchPalletsColor(appearance.colorPalette)} stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="0.25" />
                          </g>
                        </g>
                      </svg>
                  }

                  <div className="title-help">{
                    loader ? <Skeleton width="100px" /> : data[1].title
                  }</div>
                  <div style={{ width: "101.4%"}}>
                    {
                      loader ? <Skeleton count={4} /> :
                        <p title={data[1].description} className="content">{data[1].description}</p>
                    }
                  </div>
            </div>
          </Link>


          <Link to={data[2].link} className="link">
            <div className="single-card">
                  {
                    loader ? <Skeleton width="36px" height="36px" /> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 51 51">
                        <g id="Group_708" data-name="Group 708" transform="translate(-251 -797)">
                          <rect id="Rectangle_1037" data-name="Rectangle 1037" width="51" height="51" transform="translate(251 797)" fill="none" />
                          <g id="noun_collection_2355468" transform="translate(257 803)">
                            <g id="Group_26" data-name="Group 26">
                              <path id="Path_32" data-name="Path 32" d="M17.637,2.5H4.443A1.943,1.943,0,0,0,2.5,4.443V17.678a1.943,1.943,0,0,0,1.943,1.943H17.678a1.943,1.943,0,0,0,1.943-1.943V4.443A2,2,0,0,0,17.637,2.5Z" transform="translate(-2.5 -2.5)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="2" />
                              <path id="Path_33" data-name="Path 33" d="M70.437,2.5H57.243A1.943,1.943,0,0,0,55.3,4.443V17.678a1.943,1.943,0,0,0,1.943,1.943H70.478a1.943,1.943,0,0,0,1.943-1.943V4.443A1.978,1.978,0,0,0,70.437,2.5Z" transform="translate(-33.93 -2.5)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="2" />
                              <path id="Path_34" data-name="Path 34" d="M17.637,55.3H4.443A1.943,1.943,0,0,0,2.5,57.243V70.478a1.943,1.943,0,0,0,1.943,1.943H17.678a1.943,1.943,0,0,0,1.943-1.943V57.243A2.034,2.034,0,0,0,17.637,55.3Z" transform="translate(-2.5 -33.93)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="2" />
                              <path id="Path_35" data-name="Path 35" d="M70.437,55.3H57.243A1.943,1.943,0,0,0,55.3,57.243V70.478a1.943,1.943,0,0,0,1.943,1.943H70.478a1.943,1.943,0,0,0,1.943-1.943V57.243A2.005,2.005,0,0,0,70.437,55.3Z" transform="translate(-33.93 -33.93)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-width="2" />
                            </g>
                          </g>
                        </g>
                      </svg>

                  }

                  <div className="title-help">{
                    loader ? <Skeleton width="100px" /> : data[2].title
                  }</div>
                  <div style={{ width: "101.4%"}}>
                    {loader ? <Skeleton count={4} /> : <p title={data[2].description} className="content">{data[2].description}</p>}
                  </div>
            </div>
          </Link>

          <Link to={data[3].link} className="link">
            <div className="single-card">
                  {
                    loader ? <Skeleton width="36px" height="36px" /> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 51 51">
                        <g id="Group_709" data-name="Group 709" transform="translate(-345 -797)">
                          <rect id="Rectangle_1038" data-name="Rectangle 1038" width="51" height="51" transform="translate(345 797)" fill="none" />
                          <g id="image_1_" data-name="image (1)" transform="translate(351 803)">
                            <rect id="Rectangle_303" data-name="Rectangle 303" width="39" height="39" rx="2" transform="translate(0)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            <circle id="Ellipse_56" data-name="Ellipse 56" cx="3" cy="3" r="3" transform="translate(9 9)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            <path id="Path_345" data-name="Path 345" d="M39.667,20.833,28.833,10,5,33.833" transform="translate(-0.296 5.167)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                          </g>
                        </g>
                      </svg>
                  }

                  <div className="title-help">{
                    loader ? <Skeleton width={`100px`} /> : data[3].title
                  }</div>
                  <div style={{ width: "101.4%"}}>                    
                    {
                      loader ? <Skeleton count={4} /> : <p title={data[3].description} className="content">{data[3].description}</p>
                    }
                  </div>
            </div>
          </Link>


        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
