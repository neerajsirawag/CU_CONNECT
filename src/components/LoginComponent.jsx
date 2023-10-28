import React, { useState } from "react";
import { LoginAPI , GoogleSignInAPI } from "../api/AuthAPI";

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
import GoogleButton from "react-google-button";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import Marquee from "react-fast-marquee";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };
  // const googleSignIn = () => {
  //   try {
  //     let response =  GoogleSignInAPI();
  //     console.log(response);
  //     navigate('/home')
  //     toast.success("Signed In Successfully!");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Please check your Credentials!");
  //   }
  // };
  return (
    <div className="login-wrapper">
    <div className="navbar">
      <img src={cuConnectLogo} className="cuconnectLogo" />
      <img src={university_logo} className="universtiylogo" />
    </div>
      <div className="form">
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated with your collage life</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone no."
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      <hr className="hr-text" data-content="or" />
        {/* <GoogleButton
          className="google-btn"
          onClick={googleSignIn}
        /> */}
        <p className="go-to-signup">
          New to CU Connect? <span className="join-now" onClick={ () => navigate('/register')}>Join now</span>
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
