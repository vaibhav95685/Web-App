import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import * as moment from "moment";
import Paper from "@mui/material/Paper";
import "../../assets/styles/Leader.css";
import { useLocation } from "react-router-dom";
import Spinner from "../../common/components/Spinner";
import { getBlogsId } from "../../services/clientConfigMicroService";

export default function BlogDetail() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const from = location?.state;
  const id = location?.state?.data?._id;

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      setIsLoading(true);
      await getBlogsId(id).then((response) => {
        if (response.success) setBlogs(response.responseData)
        else setBlogs([])
      })
      setIsLoading(false);
    } 
    fetchData();
  }, []);
  let data = blogs;
  return (
    <div>
      <Paper
        sx={{
          margin: "auto",
          marginTop: "81px",
          maxWidth: 960,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <div className="spinnerloader">{isLoading ? <Spinner /> : ""}</div>
        <div>
          <img
            style={{
              width: "-webkit-fill-available",
              height: "240px",
              objectFit: "contain",
            }}
            src={blogs?.coverUrl}
          ></img>
        </div>
        <div style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="blog-title">{blogs?.postTitle}</p>
            <p className="blog-date">
              {" "}
              {moment(blogs?.addedOn).format("DD MMMM YYYY")}
            </p>
          </div>
          <div>
            <p className="blog-content">{ReactHtmlParser(blogs?.content)}</p>
          </div>
        </div>
      </Paper>
    </div>
  );
}
