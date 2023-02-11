import React from "react"
// css for antd
import 'antd/dist/antd.css';

import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Test from "./Pages/Test.js";

function App() {
  return (
        <div className="App">

          <BrowserRouter>
          
             <Routes>
        

                 <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                 <Route path="/test" element = {<ProtectedRoute><Test /></ProtectedRoute>}/>
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />

             </Routes>
          
          
          
          
          
          </BrowserRouter>







            
        </div>
  );
}

export function ProtectedRoute(props){
 
//  that means the user is already loged in
 if(localStorage.getItem("beymoney-user")){
   return props.children;
 }
//  if the user is not logged in
 else{
     return <Navigate to="/login" />
 }

}

export default App;
