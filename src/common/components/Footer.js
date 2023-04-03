import React, { useState } from "react";
import "../../assets/styles/Notification.css";
import { addEmail } from "../../services/UserMicroService";
import discordIcon from "../../assets/images/discord.svg";
import hoverDiscord from "../../assets/images/hoverDiscord.svg";
import instaIcon from "../../assets/images/insta.svg";
import hoverInsta from "../../assets/images/hoverInsta.svg";
import { toast } from "react-toastify";
import HoverImage from "react-hover-image";
import { version } from "../../version.js"
import { useSelector } from "react-redux";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global"
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function Footer({ loader }) {

  const navigate = useNavigate();

  const customize = useSelector(state => state.customize);

  let [email, setEmailError] = useState("");
  let [displayTimeout, setDisplayTimeout] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const AddEmail = () => {
    const { email } = formData;

    if (email == "") {
      setEmailError("( Please Enter E-mail )");
      setDisplayTimeout(true);
      setTimeout(() => {
        setDisplayTimeout(false);
      }, 4000);

      // toast.error("Fill The Field");
      return null;
    }
    const checkMail = validateEmail(email);
    if (!checkMail) {
      setEmailError(" ( Invalid Email please check)");
      setDisplayTimeout(true);
      setTimeout(() => {
        setDisplayTimeout(false);
      }, 4000);

      //toast.error("Invalid Email");
      return null;
    }
    addEmail(formData, (res) => {
      toast.success("Email added successfully");
      setFormData({ email: "" });
    });
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleMouseOver = (e) => {
    let tempDiv = e.target;
    tempDiv.style.color = fetchPalletsColor(customize.appearance.colorPalette)

  }

  const handleMouseOut = (e) => {
    let tempDiv = e.target;
    tempDiv.style.color = "#818181"
  }

  const handleRedirect = (url) => {

    try {
      let urlObj = new URL(url);

      window.open(url)
    }
    catch (error) {
      window.open(url.replace('www.', 'http://'));
    }

  }

  const handleRedirectLink = (url) => {
    navigate(url)
  }

  return (
    <>
      <div
        className="container-fluid footer-main-cont"
        style={{
          color: "#8F8F8F",
          backgroundColor: "#FBFBFB",
          width: "100%",
          paddingLeft: "6.7%",
          paddingRight: "6.7%",
        }}
      >
        <div className="row footer-cont">
          <div className="footer-top">
            <p className="fs-18 community">
              {loader ? <Skeleton /> : 'Join our community'}
            </p>
            <div className="allicon">
              {
                customize.socailMedia.length > 0 ?
                  customize.socailMedia.map((item, index) => (
                    <a onClick={() => handleRedirect(item.url)} key={index} target="_blank" className="footerAnchor">
                      <i className={`fa-brands fa-${item.name.toLowerCase()} Icon`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} />
                    </a>
                  ))
                  : null
              }
            </div>
            <div className="mobicon">
              {
                customize.socailMedia.length > 0 ?
                  customize.socailMedia.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" className="footerAnchor">
                      <i className={`fa-brands fa-${item.name.toLowerCase()} Icon`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} />
                    </a>
                  ))
                  : null
              }
            </div>
            <p className="subscribe">
              {
                loader ? <Skeleton count={2} /> : 'Subscribe to our newsletter for the latest NFTs'
              }
            </p>
            <div
              className="input-group-lg input-group  footerinputbox"
              style={{ marginBottom: displayTimeout ? "15px" : "37px" }}
            >
              {
                loader ? <Skeleton height="40px" width="300px" />  :
                  <>
                    <input
                      type="email"
                      name="email"
                      className="form-control ib "
                      value={formData.email}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      placeholder="Your email"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      style={{
                        borderTopLeftRadius: "0.2em",
                        borderBottomLeftRadius: "0.2em",
                      }}
                    />
                    <div className="input-group-append inputfooter">
                      <button
                        onClick={AddEmail}
                        className="btn btn-primary submitbuttonfooter"
                        // type="button"
                        style={{ backgroundColor: `${fetchPalletsColor(customize.appearance.colorPalette)}`, zIndex: "0", border: 'none' }}
                        id="button-addon2"
                      >
                        {" "}
                        Submit
                      </button>
                    </div>
                  </>
              }

            </div>
            <div
              style={{
                fontsize: "10px",
                color: "red",
                display: displayTimeout ? "block" : "none",
                marginBottom: "15px",
              }}
            >
              {email}
            </div>
            <h3 className="about">
              <a className="aboutText" onClick={() => handleRedirectLink('/about')} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                {
                  loader ? <Skeleton /> : customize.about.title
                }
              </a>
            </h3>
            <div className="d-none d-sm-none d-md-block d-lg-block fs-16 aboutdes">
              <p style={{ marginBottom: "0", cursor: "default" }} >
                {
                  loader ? <Skeleton count={4} /> : customize.about.description
                }
              </p>
            </div>
            <div className="d-sm-block d-md-none d-lg-none fs-16">
              <p className=" footerdes">
                {
                  loader ? <Skeleton count={4} /> : customize.about.description
                }
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              <div
                className="fs-18 d-flex flex-column"
                style={{ color: "#8F8F8F" }}
              >
                <a onClick={() => handleRedirectLink('/nfts')} className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'200px'} /> : 'Marketplace'}
                </a>
                <a onClick={() => handleRedirectLink('/nfts')} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'NFT'}
                </a>
                <a onClick={() => handleRedirectLink('/collections-tile')} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Collections'}
                </a>
              </div>
              <div className="fs-18 d-flex flex-column">
                <a onClick={() => handleRedirectLink('/leader-board')} className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'200px'} /> : 'Leaderboard'}
                </a>
                <p>
                  <a onClick={() => handleRedirectLink('/top-seller')} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                    {loader ? <Skeleton width={'150px'} /> : 'Top Seller'}
                  </a>
                </p>
                <p>
                  <a onClick={() => handleRedirectLink('/top-bidder')} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                    {loader ? <Skeleton width={'150px'} /> : 'Top Buyer'}
                  </a>
                </p>
                <p>
                  <a onClick={() => handleRedirectLink('/top-collection')} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                    {loader ? <Skeleton width={'150px'} /> : 'Top Collections'}
                  </a>
                </p>
              </div>
            </div>
            <div className="fs-18 d-flex flex-column">
              <Link to={`/help-center`} className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                {loader ? <Skeleton width={'200px'} /> : 'Community'}
              </Link>
              <p>
                <Link to={`/help-center`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Help Centers'}
                </Link>
              </p>
              <p>
                <Link to={`/FAQs`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'FAQs'}
                </Link>
              </p>
              <p>
                <Link to={`/suggestion`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Suggestions'}
                </Link>
              </p>
              <p>
                <Link to={`/blogs`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Blogs'}
                </Link>
              </p>
            </div>
            <div className="fs-18 d-flex flex-column">
              <Link to={`/about`} className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                {loader ? <Skeleton width={'200px'} /> : 'Company'}
              </Link>
              <p>
                <Link to={`/about`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'About'}
                </Link>
              </p>
              <p>
                <Link to={`/privacy`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Privacy Policy'}
                </Link>
              </p>
              <p>
                <Link to={`/Terms-Condition`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Terms and Conditions'}
                </Link>
              </p>
            </div>
          </div>
          <div className="copyrightDiv">
            <span className="textCopyright">
            © 2022 NFTinger. All Rights Reserved.
            </span>
          </div>
          <div className="version">
            <span className="textversion">
              {version}
            </span>
          </div>
          <div className="row footer-bottom-sm">
            <div className="col-7">
              <h3 className="fs-18 fw-b">
                <Link to={`/nfts`} className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Marketplace'}
                </Link>
              </h3>
              <p>
                <Link to={`/nfts`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Nft'}
                </Link>
              </p>
              <p>
                <Link to={`/collections-tile`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Collections'}
                </Link>
              </p>
            </div>
            <div className="col-5">
              <h3 className="fs-18 fw-b">
                <Link className="footertitle" to={`/leader-board`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Leaderboard'}
                </Link>
              </h3>
              <p>
                <Link to={`/top-seller`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Top Seller'}
                </Link>
              </p>
              <p>
                <Link to={`/top-bidder`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Top Buyer'}
                </Link>
              </p>
              <p>
                <Link to={`/top-collection`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Top Collections'}
                </Link>
              </p>
            </div>
            <div className="col-7 mt-3">
              <h3 className="fs-18 fw-b">
                <Link className="footertitle" to={`/help-center`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Community'}
                </Link>
              </h3>
              <p>
                <Link to={`/help-center`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Help Centers'}
                </Link>
              </p>
              <p>
                <Link to={`/FAQs`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'FAQs'}
                </Link>
              </p>
              <p>
                <Link to={`/suggestion`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Suggestions'}
                </Link>
              </p>
              <p>
                <Link to={`/blogs`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Blogs'}
                </Link>
              </p>
            </div>
            <div className="col-5 mt-3">
              <h3 className="fs-18 fw-b">
                <Link to={`/about`} className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Company'}
                </Link>
              </h3>
              <p>
                <Link to={`/about`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'About'}
                </Link>
              </p>
              <p>
                <Link to={`/about`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Privacy Policy'}
                </Link>
              </p>
              <p>
                <Link to={`/about`} className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  {loader ? <Skeleton width={'150px'} /> : 'Terms and Conditon'}
                </Link>
              </p>
            </div>
            <div className="copyrightDivMob">
              <span className="textCopyrightMob">
              © 2022 NFTinger Marketplace. All Rights Reserved.
              </span>{" "}
            </div>
            <div className="versionmob">
              <span className="textversionmob">
                {version}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
