import React, { useState } from "react";
import { LoginAPI , GoogleSignInAPI } from "../api/AuthAPI";
import cuConnectLogo from "../assets/cuconnectLogo.png";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

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
      <img src={cuConnectLogo} className="cuconnectLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

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
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="login-wrapper-inner">
        {/* <GoogleButton
          className="google-btn"
          onClick={googleSignIn}
        /> */}
        <p className="go-to-signup">
          New to CU Connect? <span className="join-now" onClick={ () => navigate('/register')}>Join now</span>
        </p>
      </div>
    </div>
  );
}
