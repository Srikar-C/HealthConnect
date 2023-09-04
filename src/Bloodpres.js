import "./blood.css";
import { useState, useEffect } from "react";
import { useStateValue } from "./stateProvider";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {db} from "./firebase.js";
import {  getDoc } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

export default  function Bloodpres(){
 const [{user}]=useStateValue();
 console.log(user.email);
 const [cystole,setcystole]=useState(Number());
 const [cystoles,ucystoles]=useState([]);
 const [diastole,setdiastole]=useState(Number());
 const [diastoles,udiastoles]=useState([]);
 const [wdate,uwdate]=useState([]);
 const [date,udate]=new useState("");
 ChartJS.register(...registerables);
 useEffect(()=>{
    
   if(user){
    getDoc(doc(db, "users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        console.log("Document data:",);
        console.log(docSnap.data().diastole);
        ucystoles(docSnap.data().cystole);
        udiastoles(docSnap.data().diastole);
        uwdate(docSnap.data().bloodpressureDate);
       
      
      }
      
    })
   }
   const mydate=new Date();
   udate(mydate.toLocaleString());
 });
 console.log("nodhqufq");
 
 
 
 const data={
   labels: wdate?.map((d)=>d),
   datasets: [
     {
       label: "cystole value",
       data: cystoles?.map((d)=>+d),
       backgroundColor: [
         "rgba(75,192,192,1)",
         "#ecf0f1",
         "#50AF95",
         "#f3ba2f",
         "#2a71d0"
       ],
       borderColor: "blue",
       borderWidth: 2
     },
     {
        label: "diastole",
        data: diastoles?.map((d2)=>+d2),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "green",
        borderWidth: 2
      }
   ]
 }
 
 function addnewWeight(){
   const Ref = doc(db, "users", user.email);
   
   updateDoc(Ref, {
     cystole: arrayUnion(cystole)|| null,
  });
  updateDoc(Ref, {
    diastole: arrayUnion(diastole)|| null,
 });
  updateDoc(Ref,{
   bloodpressureDate:arrayUnion(date)||null,
  });
 

 }
 return(
   <div style={{width:"80%",justifyContent:"center",alignItems:"center",textAlign:"center",margin:"0px auto"}}>
       <label >Update the Cystole</label>
       <input type="number" value={cystole} onChange={e=>setcystole(e.target.value)}/>
       <label >Update your Diastole value</label>
       <input type="number" value={diastole} onChange={e=>setdiastole(e.target.value)}/>
       <button onClick={addnewWeight}>Add new weight</button>
       <div className="graph">
       <Line 
       data={data}
       options={{
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
           title: {
             display: true,
             text: "blood pressure"
           },
           legend: {
             display: false
           },
         }
       }}
     />
     </div>
     <div style={{marginTop:"2%"}}>
      <center>
        <h2>Blood Pressure Chart</h2>
        <table>
          <tr>
            <th>Classification</th>
            <th>Systolic Blood Pressure (SBP)</th>
            <th> </th>
            <th>Diastolic Blood Pressure (DBP)</th>
          </tr>
          <tr>
            <td class="color">LOW</td>
            <td class="col color">&lt;90</td>
            <td class="col color">or</td>
            <td class="col color">&lt;60</td>
          </tr>
          <tr>
            <td class="colora">NORMAL</td>
            <td class="col colora">&lt;120</td>
            <td class="col colora">and</td>
            <td class="col colora">&lt;80</td>
          </tr>
          <tr>
            <td class="colorb">PREHYPERTENSION</td>
            <td class="col colorb">120-139</td>
            <td class="col colorb">or</td>
            <td class="col colorb">80-89</td>
          </tr>
          <tr>
            <td class="colorc">HIGH: STAGE 1 HYPERTENSION</td>
            <td class="col colorc">140-159</td>
            <td class="col colorc">or</td>
            <td class="col colorc">90-99</td>
          </tr>
          <tr>
            <td class="colord">HIGH: STAGE 2 HYPERTENSION</td>
            <td class="col colord">>=160</td>
            <td class="col colord">or</td>
            <td class="col colord">>=100</td>
          </tr>
        </table>
      </center>
     </div>
   </div>
   
 )
}
