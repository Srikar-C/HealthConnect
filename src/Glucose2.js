import "./User.css";
import { useState, useEffect } from "react";
import { useStateValue } from "./stateProvider";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {db} from "./firebase.js";
import {  getDoc } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
export default  function Glucose(){
 const [{user}]=useStateValue();
 console.log(user.email);
 const [gluco1,setgluco]=useState(Number());
 const [glucose,uglucose]=useState([]);
 const [wdate,uwdate]=useState([]);
 const [date,udate]=new useState("");
 ChartJS.register(...registerables);
 useEffect(()=>{
    
   getDoc(doc(db, "users", user.email)).then(docSnap => {
     if (docSnap.exists()) {
       const k=docSnap.data().glucose
       
         uglucose(k);
       
       uwdate(docSnap.data().glucoseDate);
      
     
     }
     
   })
   const mydate=new Date();
   udate(mydate.toLocaleString());

 });


 
 
 const data={
   labels: wdate?.map((d)=>d),
   datasets: [
     {
       label: "glucose levels vs Time",
       data: glucose?.map((d)=>+d),
       backgroundColor: [
         "rgba(75,192,192,1)",
         "#ecf0f1",
         "#50AF95",
         "#f3ba2f",
         "#2a71d0"
       ],
       borderColor: "black",
       borderWidth: 2
     }
   ]
 }
 function handleWeight(event){
   setgluco(event.target.value);
   
 }
 function addnewWeight(){
   const Ref = doc(db, "users", user.email);
   console.log(gluco1,date);
   updateDoc(Ref, {
    glucose: arrayUnion(gluco1)|| null,
  });
  updateDoc(Ref,{
   glucoseDate:arrayUnion(date)||null,
  });
 

 }
 return(
   <div style={{width:"80%",justifyContent:"center",alignItems:"center",textAlign:"center",margin:"0px auto"}}>
       <label >Update your latest Glocose level</label>
       <input type="number" value={gluco1} onChange={handleWeight}/>
       <button onClick={addnewWeight}>update glucose level</button>
       <div className="graph">
       <Line 
       data={data}
       options={{
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
           title: {
             display: true,
             text: "glucose levels vs Time"
           },
           legend: {
             display: false
           },
      
         }
       }}
     />
     </div>
   </div>
   
 )
}
