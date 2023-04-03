import React from "react"
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "../../assets/styles/homeCollectionCards.css";
import "../../assets/styles/collectiondetail.css";

const CollectionCardLoader = (props) => {
    return (
        <>
            <div className="collectionCardEach col-md-6 col-lg-3 col-sm-12 mt-5 nft_card" style={props.hasOwnProperty('mr') ? {marginRight: `${props.mr}`} : {} }>

                <Link to={'/'}>
                    <div
                        className=" nft-card-radius collection-card border-radius pt-4 cardmob"
                        style={{ backgroundColor: "#F8F8F8" }}
                    // style={{ marginLeft: "1em", backgroundColor: "#F8F8F8" }}
                    >
                        <div className="text-center">
                            <Skeleton width={`100px`} height={`100px`} circle={true} />
                        </div>
                        <div className="text-center pt-3">
                            <span><Skeleton width={`25px`} height={`25px`} /></span>
                            <p
                                className="collectionCardEachName text-center font-weight-900"
                                style={{ color: "#191919" }}
                            >
                                <Skeleton width={`200px`} />
                            </p>
                            <p className="collectionCardEachTotalitems">
                                <Skeleton width={`150px`} />
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default CollectionCardLoader;