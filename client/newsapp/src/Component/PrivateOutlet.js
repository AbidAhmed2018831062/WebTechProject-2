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
    Authorization:`Bearer ${localStorage.getItem("token")}`,
    'content-type': 'text/json'
  }
});
const status=res.status;
if(status===200)
setToken(true);
})();
});
   return (
     <div>
     {token? <Outlet/>:<LogIn />}
     </div>
   )
}