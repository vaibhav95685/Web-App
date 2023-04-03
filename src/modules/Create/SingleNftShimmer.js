import React from "react"
import Select from "react-dropdown-select";
import Skeleton from "react-loading-skeleton";
import "../../assets/styles/createSingleNft.css";

const SingleNftShimmer = () => {
    return (
        <>
            <div className="full-content-margin">
                <div className="create-nft-text">
                    <Skeleton width="250px" height="50px" />
                </div>

                <div className="create-single-nft-outer">
                    <div
                        className="create-nft-form"
                    >
                        <div className="nft-file-upload">
                            <Skeleton width="250px" height="240px" />
                        </div>
                        <div className="single-form">
                            <div className="">
                                <div className="create-collection mr-b-s" style={{ display: 'inline-block' }}>
                                    <Skeleton height="50px" />
                                </div>
                            </div>

                            <div className="">
                                <div className="create-collection mr-b-s" style={{ display: 'inline-block' }}>
                                    <Skeleton height="50px" />
                                </div>
                            </div>

                            <div className="input-name">
                                <div className="create-collection mr-b-s" style={{ display: 'inline-block' }}>
                                    <Skeleton height="50px" />
                                </div>
                            </div>

                            <div className="input-price">
                                <div className="create-collection mr-b-s" style={{ display: 'inline-block' }}>
                                    <Skeleton height="50px" />
                                </div>
                            </div>
                            <div className="input-description">
                                <div className="create-collection mr-b-s" style={{ display: 'inline-block' }}>
                                    <Skeleton height="100px" />
                                </div>
                            </div>


                            <div className="create-collection" style={{ display: 'inline-block' }}>
                                <Skeleton height="50px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleNftShimmer;