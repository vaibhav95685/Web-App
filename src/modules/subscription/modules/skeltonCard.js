import React from "react";


const SkeltonCard = () => {
  const Loading = () => {
    return <>Loading</>;
  };

  const Modal = () => {
    return (
      <>
        <div
          //to="/"
          className="plansEach"
        >
          <div className="plansEachCircle"></div>
          <div className="plansHeading">
            <Loading />
          </div>
          <div className="plansHeading2">
            <Loading />
          </div>
          <div className={"chooseplanButton"}>
            <Loading />
          </div>

          <div className="planFeature">
            <div className="NFTCollection">
              <Loading />
            </div>
            <div className="planTitle">
              <Loading />
            </div>
            <ul className="ulDes">
              <li className="DescriptionPlan">
                <span class="BlueCircle"></span>
                <Loading />
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Modal />
    </>
  );
};

export default SkeltonCard;
