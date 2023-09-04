import "./Login.css";
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
export default function Register(){
  useEffect(()=>{
    AOS.init({duration:2000});
},[])
   const [email,updateEmail]=useState('');
   const [password,updatePassword]=useState('');
   const history = useNavigate();  
   const [msg,setMsg] = useState("");
  function signin(event){
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((auth) => {
      // Signed in 
      
      if(auth){
        history("/");
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Please sign up before logging in");
    });
   
  }
  function Register(event){
    event.preventDefault();
    createUserWithEmailAndPassword(auth,email, password)
    .then((auth) => {
      // Signed in 
       if(auth) {
        
        history("/");
       }
    })
    .catch((error) => {
       alert(error.message);
      
      
    });
  }
  const checkValidation=()=>{
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2-6}$/;
    if(rgExp.test(email)){
        setMsg("Email is Valid");
    }
    else if(email===""){
        setMsg("Please enter Email");
    }
    else if(!rgExp.test(email)){
        setMsg("Email is not valid");
    }
    else{
        setMsg("");
    }
}
    return (
      <form className="register" data-aos="fade-up" >
            <div className="details">
                <label><b>Email </b></label><br/>
                <input placeholder="Enter your email Id" type="text" value={email} onChange={e=>updateEmail(e.target.value)}/><br/>
            </div>
            <div className="details">
                <label><b>Password </b></label><br/>
                <input placeholder="Enter your password" type="password" value={password} onChange={e=>updatePassword(e.target.value)}/><br/>
            </div>
            {/* <Link to="/"> */}
            <button type="submit" onClick={signin}>Sign in</button>
            <button className='registerbtn'  onClick={Register}>Create Your heal-well Account</button>
            {/* </Link> */}
        </form>
       
    )
}
