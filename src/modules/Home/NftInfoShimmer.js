import React from "react"
import Skeleton from "react-loading-skeleton";
import "../../assets/styles/createSingleNft.css";

const NftInfoShimmer = () => {
    return (
        <>
            <div className="container" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-12">
                        <Skeleton height="150vh" />
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-12 details-section">
                        <Skeleton width="250px" height="40px" />

                        <Skeleton width="150px" height="25px" style={{marginBottom: '30px'}} />

                        <Skeleton width="50%" style={{marginBottom: '30px'}}/>
                        <Skeleton />
                        <Skeleton style={{marginBottom: '20px'}} />

                        <div style={{display: 'flex', marginBottom: '20px'}}>
                            <Skeleton width="40px" height="40px" style={{marginRight: '10px'}} />
                            <Skeleton width="40px" height="40px" />
                        </div>

                        <Skeleton width="100px" style={{marginBottom: '30px'}} />
                        <Skeleton count={5}/>

                        <Skeleton height="200px" style={{marginTop: '20px'}}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NftInfoShimmer;