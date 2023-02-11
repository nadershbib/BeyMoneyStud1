import React from 'react'
import "../resources/default-layout.css";
import {MenuProps,Button,Dropdown,Menu} from "antd"
import { useNavigate } from 'react-router-dom';


function DefaultLayout(props) {

 const user = JSON.parse(localStorage.getItem("beymoney-user"));
 const navigate = useNavigate();
 const items = [
    {
        key:"1",
        label:(
            <li onClick={()=> {
                localStorage.removeItem("beymoney-user");
                navigate("/login");
            }}>
                Logout
            </li>
        )
    }
 ]

  return (
     <div className="layout">
        <div className="header d-flex justify-content-between align-items-center">
            <div>
               <h1 className="logo">Bey-money</h1>
            </div>
            <div>
                <Dropdown menu={{items}} placement="bottomLeft" arrow>
                    <button className='primary username'>{user.name}</button>
                </Dropdown>
            </div>

        </div>
        <div className="content">
            {
                props.children
            }
        </div>
     </div>
  )
}

export default DefaultLayout;