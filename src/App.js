import Goals from "./Goals"
import logo from "./logo.png";
import Naviga from "./Navigation/Naviga";
import { useState } from 'react';
import Login from './LoginComp/Login';
import Main from './Body/Main';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Footer from './FooterComp/Footer'
import {onAuthStateChanged} from "firebase/auth";
import { useStateValue } from "./stateProvider";
import './App.css';
import {auth} from "./firebase";
import { useEffect } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {signOut} from "firebase/auth";
import Doctors from "./Side Headings/DoctorComp/Doctors";
import DoctorPage from "./Side Headings/DoctorComp/DoctorPage";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Appointment from './Side Headings/DoctorComp/Appointment';
import Button from '@mui/material/Button';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import HealthMetrics from "./HealthMetrics";
import Profile from "./Profile";
import Prescriptions from "./Prescriptions";
import HealthRecords from './HealthRecords';
function App() {

  useEffect(()=>{
      AOS.init({duration:2000});
  },[])

  const [sideHead,setSideHead] = useState(false);
  const [{user},dispatch]=useStateValue();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
    
     console.log("user");
     if(user){
        dispatch({
         type:'SET_USER',
         user:user
        })
     }
     else{
       dispatch({
         type:'SET_USER',
         user:null
        })
     } 
    });
    },[]);
  function handleAuth(){
    if(user)
    {
        signOut(auth);
    }
     
   }
   const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

   function MenuPopupState() {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu" >
        {(popupState) => (
          <React.Fragment>
            <Button style={{margin:"0px 30px"}} variant="contained" {...bindTrigger(popupState)}>
              Dashboard
            </Button>
            <Menu {...bindMenu(popupState)}>
               <Link to={user && '/profile'}><MenuItem onClick={popupState.close} className='menu-item'>Profile</MenuItem> </Link> 
               <Link to={user && '/healthrecords'}><MenuItem onClick={popupState.close} className='menu-item'>Health Records</MenuItem></Link>
               <Link to={user && '/prescriptions'}><MenuItem onClick={popupState.close} className='menu-item'>Prescriptions</MenuItem></Link>
               <Link to={user && '/healthmetrics'}><MenuItem onClick={popupState.close} className='menu-item'>Health Metrics</MenuItem></Link>
               <Link to={user && '/goals'}><MenuItem onClick={popupState.close} className='menu-item'>Goals</MenuItem></Link>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  }
  const [toggle, settoggle] = useState(false);
  function NavigationMenu(){
    return(
      <PopupState style={{display:"none"}} variant="popover" popupId="demo-popup-menu" >
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              <Naviga onClick={() => {settoggle(!toggle)}}/>
            </Button>
            <Menu {...bindMenu(popupState)}>
               <Link to='/finddoctor'><MenuItem onClick={popupState.close} className="menu-item">Find Doctors</MenuItem></Link>
               <Link to={user && '/profile'}><MenuItem onClick={popupState.close} className='menu-item'>Profile</MenuItem> </Link> 
               <Link to={user && '/healthrecords'}><MenuItem onClick={popupState.close} className='menu-item'>Health Records</MenuItem></Link>
               <Link to={user && '/prescriptions'}><MenuItem onClick={popupState.close} className='menu-item'>Prescriptions</MenuItem></Link>
               <Link to={user && '/healthmetrics'}><MenuItem onClick={popupState.close} className='menu-item'>Health Metrics</MenuItem></Link>
               <Link to={user && '/goals'}><MenuItem onClick={popupState.close} className='menu-item'>Goals</MenuItem></Link>
               <Link to={!user && '/login'}><MenuItem onClick={handleAuth} className="menu-item">{user?"SIGN OUT":"SIGN IN"}</MenuItem></Link>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    )
  }
  useEffect(() => {
    window.innerWidth <= 460 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);
  const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        window.innerWidth < 460 ? setIsMobile(true) : setIsMobile(false);
    };

  function Nav(){
    return (
      <div className="nav-bar">
        <div className="nav-left">
          <Link style={{textDecoration:"none"}} to="/">
            <img className="nav-image" src={logo}/>
          </Link>
          <Link to="/finddoctor" style={{textDecoration:"none"}}>
            <h3 className="nav-heading">Find Doctors</h3>
          </Link>
        </div>
        <div className="nav-right">
          <h5 className="navright-user">Hello {user?user.email:"guest"}</h5>  
          <div className="navright-dash"><MenuPopupState className="dashboard" /></div>
          <Link to={!user && '/login'} >
          <button className="navright-btn" onClick={handleAuth}>{user ? 'SIGN OUT':'SIGN IN'}</button>
          </Link>
        </div>
        <div className="shortdrop"><NavigationMenu/></div>
      </div>
    );
  }

  return (
    <div style={{margin:"0px"}}>
      <Router>
        <Routes>
            <Route path="/" element ={[<Nav /> , <Main />, <Footer />]}></Route>
            <Route path="/login" element={[<Login />]}></Route>
            <Route path="/finddoctor" element={[<Nav />,<Doctors />]}></Route>
            <Route path="/finddoctor/doctorpage" element={[<Nav />,<DoctorPage />]}></Route>
            <Route path="/finddoctor/appoint" element={[<Nav/>,<Appointment/>]} ></Route>
            <Route path='/appoint' element={[<Nav/>]} > </Route>
            <Route path="/healthrecords" element={[<Nav />,<HealthRecords />]}> </Route>
            <Route path="/prescriptions" element={[<Nav />,<Prescriptions />]}> </Route>
            <Route path="/healthmetrics" element={[<Nav />,<HealthMetrics/>]}> </Route>
            <Route path="/profile" element={[<Nav />,<Profile />]}> </Route>
            <Route path="/goals" element={[<Nav />,<Goals />]}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
