import React from "react"
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import '../../assets/styles/custom.css'
import '../../assets/styles/homenftcard.css'

const LeaderBoardNftCard = () => {
    return (
        <div className="nftCard col-md-6 col-lg-3 col-sm-12 nft_card card-mar">
            <div className="card nft-card-radius border-radius cardmob">
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <Skeleton width="100%" height="187px" />
            
                    <div
                        className="nftTileEachDetails card-lower"
                        style={{
                            padding: '0px 14px 0px 12px',
                        }}
                    >
                        <div className="tile__details">
                            <div
                                className="container__up"
                                style={{ paddingTop: '4px' }}
                            >
                                <h6 className="sellerName1">
                                <Skeleton width="100px" />
                                </h6>
                            </div>

                            <div className="container__down">
                                <Skeleton count={2} width="130px" />    

                                <div
                                    style={{
                                        display: 'flex',
                                        height: 'auto',
                                        marginTop: '3px',
                                    }}
                                >
                                    {
                                       <Skeleton width="20px" />
                                    }

                                    <div
                                        style={{
                                            background: '#FFFFFF 0% 0% no-repeat padding-box',
                                            border: '1px solid #FFFFFF',
                                            borderRadius: '22px',
                                            width: '19px',
                                            height: '19px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: '8.38px',
                                        }}
                                    >
                                       <Skeleton width="20px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}


export default LeaderBoardNftCard;