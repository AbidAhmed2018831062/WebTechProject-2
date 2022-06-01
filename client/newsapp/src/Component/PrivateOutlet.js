import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LogIn from "./LogIn";

export default  function PrivateOutlet() {
 const [token,setToken]= useState(false);
 useEffect( ()=>{
   (
   async ()=>{
    const res=await axios.get("http://localhost:3001/profile",{
  headers: {
    // 'application/json' is the modern content-type for JSON, but some
    // older servers may use 'text/json'.
    // See: http://bit.ly/text-json,
    Authorization:`Bearer ${localStorage.getItem("token")}`,
    'content-type': 'text/json'
  }
});
const status=res.status;
if(status===200)
setToken(true);
})();
});
 console.log(token);
   return (
     <div>
     {token? <Outlet/>:<LogIn/>}
     </div>
   )
}