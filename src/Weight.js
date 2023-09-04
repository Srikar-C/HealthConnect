import "./User.css";
import { useState, useEffect } from "react";
import { useStateValue } from "./stateProvider";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {db} from "./firebase.js";
import {  getDoc } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
export default  function Weight(){
 const [{user}]=useStateValue();
 console.log(user.email);
 const [weight1,setWeight]=useState(Number());
 const [weights,uweights]=useState([]);
 const [wdate,uwdate]=useState([]);
 const [date,udate]=new useState("");
 ChartJS.register(...registerables);
 useEffect(()=>{
    
   getDoc(doc(db, "users", user.email)).then(docSnap => {
     if (docSnap.exists()) {
       console.log("Document data:",);
       console.log(docSnap.data());
       const k=docSnap.data().weight
       
         uweights(k);
       
       uwdate(docSnap.data().weightDate);
      
     
     }
     
   })
   const mydate=new Date();
   udate(mydate.toLocaleString());
 });
 console.log("nodhqufq");
 console.log(weights,wdate);
 
 
 const data={
   labels: wdate?.map((d)=>d),
   datasets: [
     {
       label: "weight vs date",
       data: weights?.map((d)=>+d),
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
   setWeight(event.target.value);
   
 }
 function addnewWeight(){
   const Ref = doc(db, "users", user.email);
   console.log(weight1,date);
   updateDoc(Ref, {
     weight: arrayUnion(weight1)|| null,
  });
  updateDoc(Ref,{
   weightDate:arrayUnion(date)||null,
  });
 

 }
 return(
   <div style={{width:"80%",justifyContent:"center",alignItems:"center",textAlign:"center",margin:"0px auto"}}>
       <label >Update your latest Weight</label>
       <input type="number" value={weight1} onChange={handleWeight}/>
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
             text: "weight vs  date"
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
