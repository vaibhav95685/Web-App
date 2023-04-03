import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import styled from "styled-components";
import { connect } from "react-redux";
import { BASE_URL2 } from "../../reducers/Constants";
import { httpConstants } from "../../constants";
import { updateUserProfile } from "../../services";
import "../../assets/styles/editProfile.css";
import profileImage from "../../assets/images/NoProfile.svg";


// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const Button = styled.button``;

function EditProfile(props) {
  const hiddenFileInput = useRef(null);
  const tempUrl =
    "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png";
  const [imageUrl, setImageUrl] = useState(tempUrl);
  const cdnUrl = useRef("");
  const bio = useRef("");
  const username = useRef("");
  const personalSite = useRef("");

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    let formData = new FormData();
    formData.append("folderName", "collections");
    formData.append("createdBy", `${props.user._id}`);
    formData.append("attachment", fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v2/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) cdnUrl.current = result.responseData;
    setImageUrl(cdnUrl.current);

    // Edit.handleFile(fileUploaded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username.current,
      bio: bio.current,
      personalSite: personalSite.current,
      cdnUrl: cdnUrl.current,
    };
    const result = await updateUserProfile(data, props.user._id);
  };

  return (
    <>
      <div className="editProfileContainer container row mt-5">
        {/* <div className="col-sm-5 col-12 col-xs-12 offset-sm-3 form-responsive edit_profilemob"> */}
        <div className="editProfileTopHeading top-heading">
          <div className="editProfileHeadingTitle">
            <h4 className="create-nft-font ">Edit Profile</h4>
          </div>

          <h3 className=" font-15 font-weight-700 border-bottom pb-3">
            General Setting
          </h3>
        </div>
        <div className="chooseProfilePicContainer border-0">
          <div className="chooseProfilePicInnerContainer row border">
            <img
              className="rounded-circle img-fluid img-responsive"
              // src="https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
              src={imageUrl}
              alt="/"
            />
            <Button
              onClick={handleClick}
              className="btn btn-outline-primary btn-normal-size btn-choose-file"
              // style={{ marginTop: "4em" }}
              onChange={(e) => handleChange(e)}
            >
              <span className="btn-text font-14">Choose File</span>
            </Button>
            <input
              type="file"
              className="form-control"
              placeholder="Write your name"
              name="email"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="editProfileFormContainer singlenft-form-box">
          <form className="suggestion-form " onSubmit={(e) => handleSubmit(e)}>
            <div className=" mb-3 mt-3">
              <label htmlFor="email" className="form-label input-heading">
                Username
              </label>
              <input
                type="name"
                className="editProfileFormContainerEachInput form-control"
                name="email"
                onChange={(e) => (username.current = e.target.value)}
              />
            </div>
            <div className=" mb-3 mt-3">
              <label htmlFor="comment" className="input-heading pb-2">
                Bio
              </label>
              <textarea
                className="editProfileFormContainerEachInput form-control"
                rows="4"
                name="text"
                placeholder="Write description"
                onChange={(e) => (bio.current = e.target.value)}
              ></textarea>
              <span className="text-secondary font-13">
                0 of 1000 characters used
              </span>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label input-heading">
                Personal site or Portfolio
              </label>
              <input
                type="name"
                className="editProfileFormContainerEachInput form-control bg-light"
                placeholder="www.example.com"
                onChange={(e) => (personalSite.current = e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="editProfileFormContainerEachInput btn btn-primary mt-4 w-100"
            >
              <span className=" font-14 text-white">Update Profile</span>
            </button>
          </form>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.addUserData,
  };
};

export default connect(mapStateToProps)(EditProfile);
