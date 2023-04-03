import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Information from "../../assets/images/No-Info-Icon.svg";
import "../../assets/styles/Leader.css";
import banner from "../../assets/images/Banner.png";
import * as moment from "moment";
import { AuthToken } from "../../services/UserAuthToken";
import Spinner from "../../common/components/Spinner";
import { getBlogs } from "../../services/clientConfigMicroService";
import { data } from "jquery";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { fetchPalletsColor } from "../../utility/global";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
export default function ComplexGrid({ loader }) {

  const customize = useSelector(state => state.customize);

  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      setIsLoading(true);
      await getBlogs().then((response) => {
        if (response.success) setBlogs(response.responseData.filter((val)=> val.status.toLocaleLowerCase()=="active"))
        else setBlogs([])
      })
      setIsLoading(false);
    }
    fetchData();
  }, []);
  const loadMoreHandler = () => {
    <div className="spinnerloader">{isLoading && <Spinner />}</div>;
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
  };
  return (
    <div>

      {
        loader ? <Skeleton height="300px" /> :
          <div className="hero-image" style={{ background: `${fetchPalletsColor(customize?.appearance?.colorPalette)}` }}>
            <div className="hero-text">
              <p>Blogs</p>
            </div>
          </div>
      }

      <div className="text-center" style={{margin: '30px 0'}}>
        {isLoading || loader ? (
          <>
            <Skeleton count={3} width="50%" height="250px" />
          </>
        ) : (
          blogs?.length === 0 && (
            <div className="no-data no-data-found ">
              <img src={Information}></img>
              <p>No Blogs available</p>
            </div>
          )
        )}
      </div>
      <div>
      {blogs?.length > 0 && blogs?.slice(0, visibleBlogs).map((data) => {
        return (
          <>
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
              <div>
                <img
                  style={{
                    width: "-webkit-fill-available",
                    height: "240px",
                    objectFit: "contain",
                  }}
                  src={data?.coverUrl}
                ></img>
              </div>
              <div style={{ padding: "32px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="blog-title">{data.postTitle}</p>
                  <p className="blog-date">
                    {moment(data.addedOn).format("DD MMMM YYYY")}
                  </p>
                </div>
                <div>
                  <p className="blog-content">{parse(data.content.slice(0, 100))}</p>
                </div>
                <Link to="/blog-detail" state={{ data }}>
                  <button className="blog-read">Read more</button>
                </Link>
              </div>
            </Paper>
          </>
        );
      })}
      </div>
      {blogs?.length === 0 ? "" :
        <div>
          {visibleBlogs >= blogs?.length ? (
            visibleBlogs >= blogs?.length && !isLoading ? (
              <div style={{ textAlignLast: "center" }}>
                <button className="endButton"> End </button>
              </div>
            ) : (
              ""
            )
          ) : (
            <div style={{ textAlignLast: "center" }}>
              <button className="load-more" onClick={loadMoreHandler}>
                Load More
              </button>
            </div>

          )}
        </div>}

      {/* <div style={{ textAlignLast: "center" }}>
        <button className="load-more" onClick={loadMoreHandler}>
          Load More
        </button>
      </div> */}
    </div>
  );
}
