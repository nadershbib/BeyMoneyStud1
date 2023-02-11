import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css"
import axios from "axios"
function Login() {
const navigate = useNavigate()
   const onFinish = async (values) =>{
      try{
         const response = await axios.post("/api/users/login",values);
         localStorage.setItem("beymoney-user", JSON.stringify(response.data))
         message.success("Login successfuly!");
         navigate("/")
      }catch(err){
         console.log(err)
         message.error("Login failed")
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
    <div className="col-md-4">
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Bey-Money / Login</h1>
        <hr />
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password"/>
        </Form.Item>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/register">Not registered yet, Click Here to Register </Link>
          <button className="primary" type="submit">LOGIN</button>
        </div>
      </Form>
    </div>
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
  </div>
</div>
  );
}

export default Login;