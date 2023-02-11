import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css"
import axios from "axios"

function Register() {
   const navigate = useNavigate();
   const onFinish = async (values) =>{
      try{
         await axios.post("/api/users/register",values)
         message.success("Registration Successful!");
      } catch(err){
         message.error("Something went wrong!");
      }
   }

   useEffect(()=>{
        
    if(localStorage.getItem("beymoney-user")){
     navigate("/")
    }

},[]);

  return (
    <div className="register">
   
  <div className="row justify-content-center align-items-center w-100 h-100">
    <div className="col-md-5">
      <div className="lottie">
        <lottie-player
          src="https://assets6.lottiefiles.com/packages/lf20_06a6pf9i.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
    <div className="col-md-4">
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Bey-Money / REGISTER</h1>
        <hr />
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password"/>
        </Form.Item>
        <div className="d-flex justify-content-between align-items-center text-end-authentication ">
          <Link to="/login">Already Registered, Click Here to Login </Link>
          <button className="primary" type="submit">REGISTER</button>
        </div>
      </Form>
    </div>
  </div>
</div>
  );
}

export default Register;
