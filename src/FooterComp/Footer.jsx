import "./Footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useState} from "react";
import { useEffect } from "react";

export default function Footer(){

    useEffect(()=>{
        AOS.init({duration:2000});
    },[])

    return (
        <footer className="foot">
            <div className="foot-top">
                <div className="foot-left">
                    <div className="social-media">
                        <a href="" target="_blank">
                           <InstagramIcon sx={{
                            color: "white",
                              fontSize: "40px",
                              "&:hover": { color: "blue"},
                        }}/>
                        </a>
                        <h3 style={{color:"blue"}}>Instagram</h3>
                    </div>
                    <div className="social-media" >
                        <a href="" target="_blank">                    
                            <TwitterIcon sx={{
                                color: "white",
                                  fontSize: "40px",
                                    "&:hover": { color: "blue"},
                            }}/>
                        </a>
                        <h3 style={{color:"blue"}}>Twitter</h3>
                    </div>
                    <div className="social-media" >
                        <a href="" target="_blank">                    
                            <FacebookIcon sx={{
                                color: "white",
                                  fontSize: "40px",
                                    "&:hover": { color: "blue"},
                            }}/>
                        </a>
                        <h3 style={{color:"blue"}}>Facebook</h3>
                    </div>
                </div>
                <div className="foot-right">
                    <div className="contact">
                        <CallRoundedIcon style={{marginTop:"15px"}} />
                        <div><p style={{marginBottom:"25px",
                        marginTop:"-24px",
                        paddingLeft:"38px",
                        }}>+91 7995544174</p></div>
                        
                    </div>
                </div>
            </div>  
            <div className="foot-bottom">
                <p>Copyright @2023</p>
            </div>  
        </footer>
    );
}