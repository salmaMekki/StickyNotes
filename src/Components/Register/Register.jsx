import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Joi from 'joi'
export default function Register() {
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });
  let[errorMsg,setErrorMsg]=useState('')
  let[errorsList,setErrorList]=useState([])
  let[loading,setLoading]=useState(false)
  const navigate = useNavigate();
  function goToLogin(){
    navigate('/login')
  }
 async function submitForm(e) {
    e.preventDefault();
    setLoading(true)
    let validateResponse=validateForm();
    if(validateResponse.error){
        setErrorList(validateResponse.error.details)
    }else{
        let{data}= await axios.post(  "https://route-movies-api.vercel.app/signup",
        user)
        if(data.message=='success'){
            goToLogin()
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
        first_name: Joi.string().alphanum().required().min(3).max(10),
      last_name: Joi.string().alphanum().required().min(3).max(10),
      age: Joi.number().required().min(20).max(80),
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
            
            <h2 className="text-center mb-2">Register </h2>

            {errorMsg?<div className="alert alert-danger w-50 mx-auto">{errorMsg}</div>:''}
            <form onSubmit={submitForm} className="w-50 mx-auto">
              <label htmlFor="first_name">Firstname</label>
              <input
              onChange={getUserData}
                type="text"
                name="first_name"
                className={`${styles.input} form-control mb-3 `}
              />
                {getCurrentErr("first_name").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("first_name")}
              </div>
            )}
              <label htmlFor="last_name">Lastname</label>
              <input
              onChange={getUserData}
                type="text"
                name="last_name"
                className={`${styles.input} form-control mb-3 `}
              />
                    {getCurrentErr("last_name").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("last_name")}
              </div>
            )}
              <label htmlFor="age">Age</label>
              <input
              onChange={getUserData}
                type="number"
                name="age"
                className={`${styles.input} form-control mb-3 `}
              />
                       {getCurrentErr("age").length == 0 ? (
              ""
            ) : (
              <div className="alert alert-danger">
                {getCurrentErr("age")}
              </div>
            )}
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
              <div className="d-flex justify-content-between ">
                <div className="col-lg-4">
                  <button className={`  fw-bold ${styles.button_color}`}>
                  {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Register"
              )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
