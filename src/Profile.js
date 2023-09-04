import "./profile.css";
import Avatar from '@mui/material/Avatar';
import { useStateValue } from "./stateProvider";
import { useState,useEffect} from "react";
import { doc, getDoc,collection } from "firebase/firestore";
import {db} from "./firebase.js";
import { getAuth } from "firebase/auth";
import {auth} from "./firebase";
export default function Profile(){
   const [myemail,uemail]=useState("");
   const [{user},diapatch]=useStateValue();
    const [appoints,setappoints]=useState();
    useEffect(()=>{
        
       const docref=doc(db,"users",user.email);
        getDoc(docref).then(docSnap => {
          if (docSnap.exists()) {
            const k=docSnap.data().appoints;
            
              setappoints(k);
          
           
          
          }
          
        })
      });
    return(
        <div className="profile-details" >
            <form className="profile-slot">
                <div style={{display:"flex",margin:"30px 0px"}}><Avatar style={{height:"50px",width:"50px",marginRight:"30px"}}/><h1>Profile</h1></div>
                <hr style={{border:"4px solid white",color:"white"}}/>
                <div style={{display:"start",margin:"30px 0px"}}>
                    <h4>Email: </h4><br/>
                    <h4>{user.email}</h4>
                </div>
            </form>   
            <div className="booked-slots">  
                <h1>Your Booked Slots</h1>    
                {
                    appoints?.map(a=>{
                        return(
                        
                                <div className="slot-det">
                                    <h4>Name : {a.doctor}</h4>
                                    <hr style={{backgroundColor:"black",height:"4px",width:"inherit",color:"white"}}/>
                                    <h4>Specilization : {a.specialization}</h4>
                                    <hr style={{backgroundColor:"black",height:"4px",width:"inherit",color:"white"}}/>
                                    <h4>Location : {a.location}</h4>
                                    <hr style={{backgroundColor:"black",height:"4px",width:"inherit",color:"white"}}/>
                                    <h4>date : {a.day}</h4>
                                    <hr style={{backgroundColor:"black",height:"4px",width:"inherit",color:"white"}}/>
                                    <h4>time : {a.t1}-{a.t2}</h4>
                                </div>
                        
                        )
                    })
                }
            </div>
        </div>
    )
}