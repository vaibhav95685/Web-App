import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// const [bannerCdn, setbannerCdn] = useState("");
// const [bannerIpfs, setbannerIpfs] = useState("");
import { useDropzone } from "react-dropzone";
import Image from "../../assets/images/img-format.svg";

import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
import { Oval } from "react-loader-spinner";
import { fetchPalletsColor } from "../../utility/global";

function Bannerdrop({ bannerCdn, setbannerIpfs, setbannerCdn, bannerIpfs, setCompressedUrl, appearance,className }) {

  const [isBannerSelected, setisBannerSelected] = useState(false);
  const [isloader, setisLoader] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: "10485760",
    onDrop: (acceptedFiles, fileRejections) => {
      setisLoader(true);
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error("Image file size should be less than 10 mb")
            setisLoader(false);
            return;
          }
          else if (err.code === "file-invalid-type") {
            toast.error("File type not acceptable. Please use JPG,JPEG, PNG, GIF file");
            setisLoader(false);
            return;
          }
          else {
            toast.error("Image file size should be greater than ……. pxl");
            setisLoader(false);
            return;

          }
        })
      })
      let formData = new FormData();
      formData.append(
        "attachment",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
      // const [err, ipfsRes] = addIPFS(formData)

      (async () => {

        const [err, ipfsRes] = await Utils.parseResponse(
          getCollection.addIpfs(formData)
        );
        if (!ipfsRes.ipfsUrl) {
          toast.error("unable to upload image");
          setisLoader(false);
          return;
        } else {
          setbannerIpfs(ipfsRes.ipfsUrl);
          setbannerCdn(ipfsRes.cdnUrl);
          setCompressedUrl(ipfsRes.compressedURL)
          setisLoader(false);
          setisBannerSelected(true);
        }
      })();
    },
  });

  return (
    <>
      {" "}
      <div >
        {!isBannerSelected && (
          <div className={`img-sec-div ${className}`} {...getRootProps()}>
            <input onChange={(e) => {

            }} {...getInputProps()} name="banner" />

            {!isloader ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110">
                  <g id="image" transform="translate(-372 -618)">
                    <rect id="Rectangle_271" data-name="Rectangle 271" width="110" height="110" transform="translate(372 618)" fill="none" />
                    <g id="Icon_feather-image" data-name="Icon feather-image" transform="translate(380 626)">
                      <path id="Path_34" data-name="Path 34" d="M15.053,4.5H88.926A10.553,10.553,0,0,1,99.479,15.053V88.926A10.553,10.553,0,0,1,88.926,99.479H15.053A10.553,10.553,0,0,1,4.5,88.926V15.053A10.553,10.553,0,0,1,15.053,4.5Z" transform="translate(-4.5 -4.5)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
                      <path id="Path_35" data-name="Path 35" d="M26.33,18.415A7.915,7.915,0,1,1,18.415,10.5,7.915,7.915,0,0,1,26.33,18.415Z" transform="translate(10.607 10.607)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
                      <path id="Path_36" data-name="Path 36" d="M91.926,41.383,65.543,15,7.5,73.043" transform="translate(3.053 21.936)" fill="none" stroke={fetchPalletsColor(appearance.colorPalette)} stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
                    </g>
                  </g>
                </svg>

                <div>
                  <p className="fs-14 fw-b pt-20">Drag and Drop or <span style={{ color: `${fetchPalletsColor(appearance.colorPalette)}` }}>Browse</span></p>
                </div>

              </div>


            ) : (
              <div className="">
                {" "}
                <Oval
                  vertical="top"
                  horizontal="center"
                  color="#00BFFF"
                  height={30}
                  width={30}
                />
              </div>

            )}



          </div>
        )}
        {isBannerSelected && (
          <div className="img-sec-div" {...getRootProps()}>
            <input {...getInputProps()} name="banner"
            />
            {!isloader ? (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                src={bannerCdn != "" ? bannerCdn : Image}
                alt="upload-icon"
                className="upload-icon"
              />

            ) : (
              <div className="">
                {" "}
                <Oval
                  vertical="top"
                  horizontal="center"
                  color="#00BFFF"
                  height={30}
                  width={30}
                />
              </div>

            )}

          </div>
        )}
      </div>
    </>
  );
}

export default Bannerdrop;
