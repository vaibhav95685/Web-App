import React from "react";
import { Link } from "react-router-dom";
import { MyItemCollectionApi } from "../../constants/MyItemApi";
import UpperMyItemCollection from "../../common/components/UpperMyItemCollection";
function MyItems() {
  return (
    <>
      <div className="container">
        <UpperMyItemCollection />
        <div className="row">
          {MyItemCollectionApi.map((curElem) => {
            const { id, image, title, bottomText, number } = curElem;
            return (
              <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                <div className="myitems_container__tile">
                  <ul>
                    <li className="collection myitemmob">
                      <img
                        className="Collection__logo"
                        style={{ marginTop: "-20px", marginLeft: "2em" }}
                        className="img-fluid"
                        className="rounded-circle"
                        alt="100x100"
                        src={image}
                        data-holder-rendered="true"
                      />
                    </li>
                    <div className="text-center" style={{ marginTop: "-2em" }}>
                      <li className="font-16 font-weight-700">{title}</li>
                      <li className="font-15 text-secondary">
                        {bottomText}:
                        <span className="font-14 font-weight-bold">
                          {number}
                        </span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyItems;
