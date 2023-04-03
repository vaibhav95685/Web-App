import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Single from "../../assets/images/single.svg";
import Collection from "../../assets/images/collection.svg";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { AddWalletDetails } from "../../reducers/Action";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "../../assets/styles/createnft.css";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global";
import Skeleton from "react-loading-skeleton";

function CreateNFT({ loader }) {
  const { user } = useSelector((state) => state);

  const customize = useSelector(state => state.customize);

  const { loggedInUser } = user;
  const navigate = useNavigate();
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address

  const [checkClick, setcheckClick] = useState(false);

  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    if (customize.permissionToUploadNft === 'Only me') {
      navigate(`/`);

      toast.warning("You don't have access to create NFT", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, [customize.permissionToUploadNft])


  return (
    <div>
      <div className="container create-nft">
        <div className="row">
          <div className="col-xl-12 text-center">
            <h4 className="create-nft-font">
              {
                loader ? <Skeleton width="200px" height="45px" /> : 'Create NFT'
              }
            </h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 col-lg-3 col-sm-6 col-12 main-card-box">
            <Link to={`/create-single-nft`}>
              <div className="card card-border card-width">
                <div className="card-body text-center">

                  {
                    loader ? <Skeleton width="160px" height="160px" /> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
                        <g id="single" transform="translate(-1071 -429)">
                          <rect id="Rectangle_273" data-name="Rectangle 273" width="160" height="160" transform="translate(1071 429)" fill="none" />
                          <g id="Group_183" data-name="Group 183" transform="translate(372.584 116.771)">
                            <rect id="Rectangle_235" data-name="Rectangle 235" width="119.55" height="119.543" rx="8.351" transform="translate(718.416 332.228)" fill="#d8e4ff" stroke={fetchPalletsColor(customize.appearance.colorPalette)} stroke-width="2" />
                            <g id="Icon_feather-plus" data-name="Icon feather-plus" transform="translate(767.645 382.791)">
                              <path id="Path_29" data-name="Path 29" d="M18,7.5V25.919" transform="translate(-8.792 -7.5)" fill="none" stroke={fetchPalletsColor(customize.appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                              <path id="Path_30" data-name="Path 30" d="M7.5,18H25.919" transform="translate(-7.501 -8.791)" fill="none" stroke={fetchPalletsColor(customize.appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                            </g>
                          </g>
                        </g>
                      </svg>
                  }

                  {/* <img src={Single} alt="Single" className="" /> */}
                </div>
              </div>
            </Link>
            <div className="text-center">
              <h5 className="bottom-heading-font">
                {
                  loader ? <Skeleton width="100px" /> : 'Single'
                }
              </h5>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-sm-6 col-12 main-card-box">
            <Link to={`/create-nft-collection`}>
              <div className="card card-border card-width">
                <div className="card-body text-center">

                  {
                    loader ? <Skeleton width="160px" height="160px" /> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
                        <g id="collection" transform="translate(-1417 -429)">
                          <rect id="Rectangle_272" data-name="Rectangle 272" width="160" height="160" transform="translate(1417 429)" fill="none" />
                          <g id="Group_184" data-name="Group 184" transform="translate(354.404 125.248)">
                            <rect id="Rectangle_237" data-name="Rectangle 237" width="119.55" height="119.543" rx="8.351" transform="translate(1074.596 315.753)" fill="#fff3d8" stroke="#F1BE4B" stroke-width="2" />
                            <rect id="Rectangle_238" data-name="Rectangle 238" width="119.55" height="119.543" rx="8.351" transform="translate(1091.59 332.185)" fill="#d8e4ff" stroke={fetchPalletsColor(customize.appearance.colorPalette)} stroke-width="2" />
                            <g id="Icon_feather-plus" data-name="Icon feather-plus" transform="translate(1142.094 382.687)">
                              <path id="Path_29" data-name="Path 29" d="M18,7.5V25.919" transform="translate(-8.791 -7.5)" fill="none" stroke={fetchPalletsColor(customize.appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                              <path id="Path_30" data-name="Path 30" d="M7.5,18H25.919" transform="translate(-7.5 -8.791)" fill="none" stroke={fetchPalletsColor(customize.appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                            </g>
                          </g>
                        </g>
                      </svg>
                  }

                  {/* <img src={Collection} alt="Single" className="" /> */}
                </div>
              </div>
            </Link>
            <div className="text-center">
              <h5 className="bottom-heading-font">
                {
                  loader ? <Skeleton width="100px" /> : 'Collection'
                }              
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;
