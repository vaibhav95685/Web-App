import React from "react";
import Skeleton from "react-loading-skeleton";
import '../../assets/styles/Leader.css'
import '../../assets/styles/homenftcard.css'

const LeaderBoardCard = () => {
    return (
        <>
            <div className="leaderboardTopDetailsRow">
                <Skeleton width="52px" height="52px" circle={true} />

                <div className="descriptiontopSeller">
                    <h2 className="sellerName">
                        {' '}
                        {
                            <Skeleton width="100px" />
                        }
                        {' '}
                    </h2>

                    <p className="volumeData" >
                        <Skeleton width="60px" />
                    </p>
                </div>
            </div>
        </>
    )
}


export default LeaderBoardCard;