import React from "react"
import Select from "react-dropdown-select";
import Skeleton from "react-loading-skeleton";
import "../../assets/styles/collection.css";

const CollectionNftShimmer = () => {
    return (
        <>
            <div className="main-container">
                <h1 className="fs-32 fw-b c-b title">
                    <Skeleton width="50%" height="50px" />
                </h1>
                <p className="fs-16 fw-600 c-b pt-50">
                    <Skeleton width="200px" />
                </p>
                <div className="max-width-250">
                    <Skeleton width="250px" height="240px" />
                </div>
                <div>

                    <div className="fs-16 fw-600 c-b pt-20 pb-20"><Skeleton width="200px" /></div>
                    <div>
                        <Skeleton height="240px" />
                    </div>
                </div>
                <div>
                    <form >
                        <div>
                            <p className="fs-16 fw-b c-b pt-4"><Skeleton width="200px" /></p>
                            <Skeleton height="50px" />
                        </div>
                        <div>
                            <p className="fs-16 fw-b c-b pt-3"><Skeleton width="200px" /></p>
                            <Skeleton height="100px" />

                        </div>
                        <div>
                            <div className="fs-16 fw-b c-b pt-3 pb-3"><Skeleton width="200px" /></div>
                            <Skeleton height="50px" />
                        </div>
                        <div>
                            <div className="fs-16 fw-b c-b pt-3 pb-3"><Skeleton width="200px" /></div>

                            <div className="block-chain-right">
                                <Skeleton height="50px" />
                            </div>
                        </div>
                        <Skeleton height="50px" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CollectionNftShimmer;