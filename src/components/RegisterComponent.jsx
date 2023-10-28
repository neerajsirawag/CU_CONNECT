import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";

import cuConnectLogo from "../assets/cuconnectLogo.png";
import university_logo from "../assets/university_logo.png";
import anydesk from "../assets/anydesk.png";
import google from "../assets/google.png";
import amazon from "../assets/amazon.png";
import facebook from "../assets/facebook.png";
import microsoft from "../assets/microsoft.webp";
import netflix from "../assets/netflix.png";
import oracle from "../assets/oracle.png";

import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import Marquee from "react-fast-marquee";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  return (
    <div className="login-wrapper">
    <div className="navbar">
      <img src={cuConnectLogo} className="cuconnectLogo" />
      <img src={university_logo} className="universtiylogo" />
    </div>
      <div className="form">
      <div className="login-wrapper-inner">
      <h1 className="heading">Sign up</h1>
        <p className="sub-heading">Make the most of your collage life</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Username"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      {/* </div> */}
      <hr className="hr-text" data-content="or" />
      {/* <div className="login-wrapper-inner"> */}
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
      </div>
      <Marquee className="marquee">
        <div className="logo-images">
        <img src={amazon} alt="amazon-logo" className="amazon"/>
        <img src={facebook} alt="facebook-logo" className="facebook"/>
        <img src={google} alt="google-logo" className="google" />
        <img src={microsoft} alt="microsoft-logo" className="microsoft"/>
        <img src={oracle} alt="oracle-logo" className="oracle"/>
        <img src={netflix} alt="netflix-logo" className="netflix"/>
        <img src={anydesk} alt="anydesk-logo" className="anydesk"/>
        </div>
      </Marquee>
    </div>
  );
}
