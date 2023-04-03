import React, { useState, useEffect } from "react";
// import { CollectionTile_Api } from "../API/CollectionTile_Api";
import { CollectionTile_Api } from "../../constants/CollectionTile_Api";
import CollectionNftFilter from "../../common/components/CollectionNFtFilter";
import NftToggle from "../../common/components/NftToggle";
import { getCollections } from "../../services/webappMicroservice";
import "../../assets/styles/homeCollectionCards.css";

function Collections_tile() {
  const initialFilterData = {
    sort: 1,
    categoryId: "",
    searchByName: "",
  };

  const [collections, setCollections] = useState([]);
  const [filterData, setFilterData] = useState(initialFilterData);
  const [toggleNft, setToggleNft] = useState(false);
  useEffect(() => {
    getCollections().then((response) => setCollections(response));
  }, []);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  return (
    <>
      <div className="container">
        <NftToggle toggleNft={toggleNft} />
        {/* <Lower__homepage /> */}
        {/* <CollectionNftFilter /> */}

        {/* ----------filters */}
        <div className="lower__homepage" style={{ width: "100%" }}>
          <div id="filters filter-large" className="filter">
            <div className="mobilenftTilePageFirstSelect dropdown">
              <p className="mb-0">Categories </p>
              <select name="sale" id="sale" className="first_select ml_auto" onChange={e => handleFilter(e)}>
                <option value="all">All</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div className="filter">
            <div className="mobilenftTilePageThirdSelect dropdown sort-drop nftTilePageSecondSelect">
              <select
                name="sale"
                id="sale"
                // className="first_select ml_auto"
                className="priceRangeDropDown"
              >
                <option value="all">Sort By</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
        </div>

        {/* ------------- */}

        <div
          className="row mob_row col-cards-gap"
          style={{ justifyContent: "start" }}
        >
          {collections.map((collection) => {
            const { _id, imageUrl, name, nfts } = collection;
            const route = "collection-details/" + _id;
            return (
              <div className="collectionCardEach col-md-6 col-lg-3 col-sm-12 mt-5">
                <a href={route}>
                  <div
                    className=" nft-card-radius collection-card border-radius pt-4 cardmob"
                    style={{ backgroundColor: "#F8F8F8" }}
                  // style={{ marginLeft: "1em", backgroundColor: "#F8F8F8" }}
                  >
                    <div className="text-center">
                      <img
                        className="img-fluid border-radius collection-img-card-radius collection_imgmob"
                        src={imageUrl}
                        style={{
                          width: "100px",
                          height: "100px",
                          textDecoration: "none",
                        }}
                      />
                    </div>
                    <div className="text-center pt-3">
                      <p
                        className="collectionCardEachName text-center font-weight-900"
                        style={{ color: "#191919" }}
                      >
                        {name}
                      </p>
                      <p className="collectionCardEachTotalitems">
                        <span className=" font-14 text-dark">
                          Total Items:
                          <span className="text-primary">{nfts.length}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Collections_tile;
