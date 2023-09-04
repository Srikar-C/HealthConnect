
import find from "./finddoc.png";
import goal from "./goal.png";
import health from "./metric.png";
import "./Main.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import{ db} from "../firebase";
import { collection, doc, getDoc,updateDoc,setDoc ,update } from "firebase/firestore"; 
import Carasol from "./Carasol";
export default  function Main(){
    const [{user},dispatch]=useStateValue();
    const userdata={
        cistole:[],
        diastole:[],
        weight:[],
        glucose:[],
        glucoseDate:[],
        weightDate:[],
        appoints:[],
        bloodpressureDate:[],
        goals:[],
        goalDate:[],
    }
    useEffect(()=>{
        AOS.init({duration:1000});
       if(user){
        getDoc(doc(db, "users",user.email)).then(docSnap => {
            if (docSnap.exists()) {
                console.log("hurray user");
            } else {
                setDoc(doc(db, "users", user.email), userdata);
              console.log("usernot found");

            }
          })
       }
    },[])

    function Box(props){
        return(
            <div className="boxes">
                <img className="img" src={props.img} alt={props.alter} style={{borderRadius:"30%"}}/>
                <p>{props.name}</p>
            </div>
        )
    }

    return (
        <div className="body-main">
            <div class="image-container">
                <img src="https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg" alt="Image"/>
                <div class="image-text">
                    <h1>Optimize well-being with personalized plans. 
                    Track activities, set goals, and monitor progress.
                    Achieve a healthier lifestyle through our comprehensive health management platform.</h1>
                </div>  
            </div>
            <div className="body-middle" data-aos="fade-down">
                <Link style={{textDecoration:"none"}} to="/finddoctor">
                    <Box img={find} alter="Near Doctors" name="DOCTORS AROUND YOU" />
                </Link>
                <Link style={{textDecoration:"none"}}  to ="/healthmetrics">
                    <Box img={health} alter="First Aid" name="HEALTH METRICS"  />
                </Link>
                <Link to="/goals" style={{textDecoration:"none"}}>
                    <Box img={goal} alter="Tablets" name="SET PERSONAL GOALS" />    
                </Link>
            </div>
            <h1 style={{textAlign:"center",width:"fit-content",padding:"10px",margin:"10px auto"}}>OUR SERVICES</h1>
            <Carasol/>
        </div>
    );
}