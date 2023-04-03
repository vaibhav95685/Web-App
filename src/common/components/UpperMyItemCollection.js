import React from "react";
import { Link } from "react-router-dom";

function UpperMyItems() {
  return (
    <div>
      <div id="upper__myitem">
        <div className="upper__myitem">
          <h1 className="main_upper__heading mt-4 font-weight-700 font-20">
            My Items
          </h1>
        </div>

        <div className="middle__myitem mt-3">
          <Link
            className="item_middle__heading font-weight-700 font-16"
            to="/my-items"
          >
            Single
          </Link>
          <Link
            className="item_middle__heading font-weight-700 font-16"
            style={{ marginLeft: "1em" }}
            to="/my-items-collection"
          >
            Collections
          </Link>
        </div>
        <button type="submit" className="btn btn-primary mt-4 add-btn">
          <span className="font-weight-normal text-white font-14">
            Create Collection
          </span>
        </button>
      </div>
    </div>
  );
}

export default UpperMyItems;
