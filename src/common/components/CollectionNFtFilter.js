import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeNftFilters() {
  return (
    <>
      <div className="lower__homepage" style={{ width: "100%" }}>
        <div id="filters filter-large" className="filter">
          <div className="mobilenftTilePageFirstSelect dropdown">
            <p className="mb-0">Categories </p>
            <select name="sale" id="sale" className="first_select ml_auto">
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
    </>
  );
}

export default HomeNftFilters;
