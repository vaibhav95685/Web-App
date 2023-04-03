import React from "react";
import Skeleton from "react-loading-skeleton";

const TopListShimmer = () => {
    return (
        <>
            <div className="row">                
                <div className="col-lg-12">
                    <Skeleton count={8} height="65px" style={{marginBottom: '42px'}} />
                </div>
            </div>
        </>
    )
}

export default TopListShimmer;