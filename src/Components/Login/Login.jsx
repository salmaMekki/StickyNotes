import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
export default function Login(props) {
  const navigate = useNavigate();
  let [user, setUser] = useState({
   
    email: "",
    password: "",
   
  });
  let[errorMsg,setErrorMsg]=useState('')
  let[errorsList,setErrorList]=useState([])
  let[loading,setLoading]=useState(false)
  function goToRegister() {
    navigate("/register");
  }
  function goToHome() {
    navigate("/home");
  }
  async function submitForm(e) {
    e.preventDefault();
    setLoading(true)
    let validateResponse=validateForm();
    if(validateResponse.error){
        setErrorList(validateResponse.error.details)
    }else{
        let{data}= await axios.post(  "https://route-movies-api.vercel.app/signin",
        user)
        if(data.message=='success'){
          localStorage.setItem('userToken',data.token);
          props.savaUserData();
            goToHome();
     
        }else{
            setErrorMsg(data.message)
        }
    }
   
    setLoading(false)

  }
  function getUserData(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value
    setUser(myUser)
 
  }
   function validateForm(){
    const schema=Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{3}$/))
        .messages({
          "string.pattern.base": `First letter of the password should be small and 3 numbers.`,
          "string.empty": `Password cannot be empty`,
          "any.required": `Password is required`,
        }),

    })
    return schema.validate(user, { abortEarly: false })
   }
   function getCurrentErr(name) {
    for (const error of errorsList) {
      if (error.context.key === name) {
        return error.message;
      }
    }
    return "";
  }

  return (
    <>
      <div className={`${styles.landing} `}>
        <div className={`${styles.container}  p-5  `}>
          <div className={`${styles.login}  `}>
            <h2 className="text-center mb-2">Login </h2>
            {errorMsg?<div className="alert alert-danger w-50 mx-auto">{errorMsg}</div>:''}

            <form onSubmit={submitForm} className="w-50 mx-auto">
              <label htmlFor="email">Email</label>
              <input
              onChange={getUserData}
                type="email"
                name="email"
                className={`${styles.input} form-control mb-3 `}
                placeholder="example@gmail.com"
              />
               {getCurrentErr("email").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("email")}
              </div>
            )}
              <label htmlFor="password">Password</label>
              <input
              onChange={getUserData}
                type="password"
                name="password"
                className={`${styles.input} form-control mb-3 `}
              />
               {getCurrentErr("password").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("password")}
              </div>
            )}
              <div className="d-flex">
                <div className="col-md-4">
                  <button className={`fw-bold ${styles.button_color}`}>
                  {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
                  </button>
                </div>
                <div className="col-md-6 offset-md-2 ">
                  <span>Don't have account? </span>
                  <button className={`${styles.register_butn} btn`} onClick={goToRegister}>Rgister</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
