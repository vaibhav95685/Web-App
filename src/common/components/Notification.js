import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import "../../assets/styles/Notification.css";
import "../../assets/styles/noti.css";
import profile from "../../assets/images/profile.png";

import { Link } from "react-router-dom";
import {
  getNotificationListById,
  getNotificationCountById,
} from "../../services/webappMicroservice";
import { useSelector } from "react-redux";
import { ManageNotiSideBar, ManageWalletSideBar } from "../../reducers/Action";
import { useDispatch } from "react-redux";
import moment from "moment";
import NotificationIcon from "../../assets/images/Notification.svg";
import profileImage from "../../assets/images/ProfileReplace.svg";
import { getParamTenantId } from "../../utility/global";

function Notification() {
  const { sideBar, user } = useSelector((state) => state);
  const { isOpenNoti } = sideBar;
  const [notifications, setNotifications] = useState([]);

  const { loggedInUser } = user;
  if (loggedInUser) {
    localStorage.setItem("userId", loggedInUser._id);
  }
  let userId = loggedInUser ? loggedInUser._id : localStorage.userId;

  const dispatch = useDispatch();

  useEffect(() => {
    getNotificationListById(userId).then((response) =>
      setNotifications(response)
    );
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleChange = (e) => {
    dispatch(ManageNotiSideBar(!isOpenNoti));
    dispatch(ManageWalletSideBar(false));
    document.body.className = !isOpenNoti ? "overflow" : "overflow-hidden";
    // document.body.style.overflow = !isOpenNoti ? "hidden" : "visible";
  };
  const [Count, setCount] = useState([]);
  const _id = notifications?.notificationObj?._id;
  // useEffect(() => {
  //   getNotificationCountById(notificationId).then((response) =>
  //     setCount(response)
  //   );
  // }, []);

  const notifyData = notifications?.notificationObj;
  const handleNotification = (_id) => {
    getNotificationCountById(_id).then((response) => setCount(response));
  };

  return (
    <div style={{ display: isOpenNoti ? null : "none" }} className="main-cont">
      {/* ------------ */}
      <div className="empty_div" onClick={() => handleChange()}></div>
      <div className="noti-outer">
        <h3 className="notification-text">Notification</h3>
        <div
          className="all-noti"
          style={{ display: notifyData?.length === 0 || notifyData===undefined ? "none" : "block" }}
        >
          {notifyData?.map((curElem) => {
            const { _id, addedOn, type, owner, content } = curElem;
            let addedOnTimeStamp = moment(addedOn).format("LT");

            return (
              <div className="single-noti">
                <div
                  className={
                    curElem?.status === false ? "noti-dynamic" : "noti-color"
                  }
                  onClick={() => handleNotification(_id)}
                >
                  <div className="single-noti-inner ">
                    <img
                      src={
                        typeof owner.photo === "object"
                          ? owner?.photo?.compressedURL
                          : typeof owner?.photo === "string" &&
                            owner?.photo != ""
                          ? owner?.photo
                          : profileImage
                      }
                      width="24px"
                      height="24px"
                      className="noti-image"
                    />
                    {type == "like" ? (
                      <div className="noti-text">
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/user-profile/" + owner?._id}
                        >
                          <span style={{ color: "#366EEF" }}>
                            {String(owner.userName).length >= 7
                              ? !owner.userName
                                ? " "
                                : String(owner?.userName).substring(0, 10)
                              : String(owner?.userName) === ""
                              ? String(owner?.wallet_address).substring(0, 10) +
                                "..."
                              : String(owner?.userName).substring(0, 10)}
                          </span>
                        </a>
                        &nbsp;{type}d&nbsp;your&nbsp;
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/nft-information/" + content?._id}
                        >
                          <span style={{ color: "#366EEF" }}>
                            {String(content.name).substring(0, 12)}{" "}
                          </span>
                        </a>
                      </div>
                    ) : type == "buy" ? (
                      <div className="noti-text">
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/user-profile/" + owner?._id}
                        >
                          <span style={{ color: "#366EEF" }}>
                            {String(owner.userName).length >= 7
                              ? !owner.userName
                                ? " "
                                : String(owner?.userName).substring(0, 10)
                              : String(owner?.userName) === ""
                              ? String(owner?.wallet_address).substring(0, 10) +
                                "..."
                              : String(owner?.userName).substring(0, 10)}
                          </span>
                        </a>
                        &nbsp;bought&nbsp;your&nbsp;
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/nft-information/" + content?._id}
                        >
                          <span style={{ color: "#366EEF" }}>
                            {String(content.name).substring(0, 12)}
                          </span>
                        </a>
                      </div>
                    ) : type == "reportNFT" ? (
                      <div className="noti-text">
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/user-profile/" + owner?._id}
                        >
                          <span style={{ color: "#366EEF" }}>
                            {String(owner.userName).length >= 7
                              ? !owner.userName
                                ? " "
                                : String(owner?.userName).substring(0, 10)
                              : String(owner?.userName) === ""
                              ? String(owner?.wallet_address).substring(0, 10) +
                                "..."
                              : String(owner?.userName).substring(0, 10)}
                          </span>
                        </a>
                        &nbsp;reported&nbsp;your&nbsp;
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/nft-information/" + content?._id}
                        >
                          <span style={{ color: "#366EEF" }}>
                            {String(content.name).substring(0, 12)}
                          </span>
                        </a>
                      </div>
                    ) : (
                      // <div>
                      //   <span>you got new{type} from srinivas</span>
                      // </div>
                      ""
                    )}
                  </div>

                  <div className="time">{addedOnTimeStamp}</div>
                </div>
              </div>
            );
          })}
          <br />
          {notifyData?.length > 0 ? (
            <footer style={{ display: "flex", justifyContent: "center" }}>
              <p className="end-noti">End of Notification</p>
            </footer>
          ) : null}
        </div>
        {notifyData?.length === 0 || notifyData===undefined && (
          <div
            className="no-notification"
            style={{ display: notifyData?.length === 0 || notifyData===undefined? "block" : "none" }}
          >
            <img className="no-image" src={NotificationIcon}></img>
            <p className="no-notification">No notification found</p>
          </div>
        )}
      </div>

      {/* ------------------ */}
    </div>
  );
}
export default Notification;
