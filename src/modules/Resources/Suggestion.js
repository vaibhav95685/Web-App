import React, { useState } from "react";
import "../../assets/styles/suggestion.css";
import { addSuggestion } from "../../services/contentMicroservice";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { fetchPalletsColor } from "../../utility/global";
import Skeleton from "react-loading-skeleton";
import Utils from "../../utility"
function Suggestion({ loader }) {

  const appearance = useSelector(state => state.customize.appearance);

  const [formData, setFormData] = useState({
    email: "",
    title: "",
    detail: "",
  });

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const [checkButtonStatus, setCheckButtonStatus] = useState(true);
  const PostSuggestion = () => {
    const { email, title, detail } = formData;
    if (email == "" || title == "" || detail == "") {
      Utils.apiFailureToast("Fields are not blank");
      return null;
    }
    const checkMail = validateEmail(email);
    if (!checkMail) {
      toast.error("Invalid Email" ,{toastId: "customId"});
      return null;
    }

    addSuggestion(formData, (res) => {
      toast.success("Suggestion Sent");
      setFormData({ email: "", title: "", detail: "" });
    });
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (formData.email != "" && formData.title != "" && formData.detail != "") {
      setCheckButtonStatus(false);
    }
  };
  const enabled=formData.email != "" && formData.title != "" && formData.detail != "";

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        limit={2}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="suggestion-body ">
        <div className="suggestion suggestionmob">
          <h4 className="make-suggestion">
            {loader ? <Skeleton width="200px" height="35px" /> : 'Make a Suggestion'}
          </h4>
          <div className="form-box">
            <div className="form-inner">
              <div className="">
                {
                  loader ? <Skeleton style={{ marginBottom: "20px" }} height="80px" /> :
                    <>
                      <label for="email" className="label-key">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className="sugg-input"
                        placeholder="Write your email address"
                      />
                    </>
                }
              </div>
              <div className="">
                {
                  loader ? <Skeleton style={{ marginBottom: "20px" }} height="80px" /> : <>
                    <label for="pwd" className="label-key">
                      Title
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      className="sugg-input"
                      placeholder="A short descriptive title"
                    />
                  </>
                }
              </div>

              {
                loader ? <Skeleton style={{ marginBottom: "20px" }} height="120px" /> :
                  <><label for="comment" className="label-key">
                    Detail
                  </label>
                    <textarea
                      name="detail"
                      value={formData.detail}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      className="sugg-input text-area"
                      rows="4"
                      placeholder="Write comment"
                    ></textarea></>
              }

              <div className="butt-outer">
                {
                  loader ? <Skeleton width="150px" height="45px" /> :
                    <button
                      onClick={PostSuggestion}
                      // type="submit"
                      className="send-button"
                      style={{
                        opacity: !enabled ? 0.8 : 1,
                        background: !enabled ?  "#9BB7F7 0% 0% no-repeat padding-box": `${fetchPalletsColor(appearance.colorPalette)}`
                      }}
                      disabled={!enabled}
                    >
                      Send
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Suggestion;
