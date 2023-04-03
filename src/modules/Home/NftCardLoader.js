import React from "react"
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "../../assets/styles/common.css"


const NftCartLoader = (props) => {
    return (
        <>
            <div className="nftCardEach col-md-6 col-lg-3 col-sm-12  mt-5 nft_card" style={props.hasOwnProperty('mr') ? {marginRight: `${props.mr}`} : {} }>
                <div className="card nft-card-radius border-radius cardmob h-100">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <div className="image-container">
                            <Skeleton height={`187px`} />

                        </div>                       
                    </Link>

                    <div
                        className="nftTileEachDetails card-lower"
                        style={{
                            padding: "0px 12px 0px 14px",
                        }}
                    >
                        <div className="nftTileEachDetailsFirstContainer container__up">
                            <div
                                className="nftTileEachDetailsFirstContainerName poppins-normal bold-bold font-16"
                                style={{
                                    color: "#191919",
                                    overflow: "hidden",
                                    width: "58%",
                                }}
                                title={''}
                            >
                                <Skeleton />
                            </div>
                            {
                                <Skeleton width={`80px`} />
                            }
                        </div>
                        <div className="collectionName">

                            <Skeleton width={`200px`} />
                        </div>                    
                    </div>
                </div>
            </div>

        </>
    )
}

export default NftCartLoader;