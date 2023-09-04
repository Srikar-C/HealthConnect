import send from "./send.png";
import tick from "./tick.png";
import { useState } from "react";
import { useEffect } from "react";
import profilelogo from "./profile.png";
import list from "./doctorList";
import star from "./star.png";
import { useStateValue } from "../../stateProvider";
import "./Appoint.css";
import { collection, doc, getDoc, setDoc, updateDoc,arrayUnion} from "firebase/firestore"; 
import{ db} from "../../firebase";
import emailjs from "@emailjs/browser";
export default function Appointment(){
    const [{ doctor,user }, dispatch] = useStateValue();
    const [startTime, setStart] = useState(doctor.startTime);
    const [endTime, setEnd] = useState(doctor.endTime);
    const [slot, setSlot] = useState([]);
    const [loading, setLoading] = useState(false);
    const [datab,udatab]=useState([]);
    const [review,setreview]=useState("");
    const [reviews,setreviews]=useState([]);
   const today = new Date() // get today's date
   const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    async function setSlots(i) {
        getDoc(doc(db, "doctors",doctor.id)).then(docSnap => {
            if (docSnap.exists()) {
                setStart(docSnap.data().startTime);
                setEnd(docSnap.data().endTime);
            } else {
              console.log("No such document!");
            }
          })
        return new Promise((resolve, reject) => {
        setSlot((prev) => {
            return [...prev, i];
        });

        if (slot) {
            resolve("It worked!");
        } else {
            reject(Error("It failed!"));
        }
        });
    }
    useEffect(()=>{
    
        getDoc(doc(db, "doctors", doctor.id)).then(docSnap => {
          if (docSnap.exists()) {
            console.log("Document data:",);
            console.log(docSnap.data());
            const k=docSnap.data().reviews;
            setreviews(k);
          }
          
        })
   
      });
    useEffect(() => {
        emailjs.init("iuFtzLVK3q6_61olU")
        getDoc(doc(db, "doctors",doctor.id)).then(docSnap => {
            if (docSnap.exists()) {
                const a=[];
                a.push(docSnap.data().slots.slot1);
                a.push(docSnap.data().slots.slot2);
                a.push(docSnap.data().slots.slot3);
                a.push(docSnap.data().slots.slot4);
                a.push(docSnap.data().slots.slot5);
                a.push(docSnap.data().slots.slot6);
                a.push(docSnap.data().slots.slot7);
                a.push(docSnap.data().slots.slot8);
                udatab(a);
                
            } else {
              console.log("No such document!");
            }
          })
        
        console.log(datab[1]);
        setSlot([]);
        addSlot();
        
    }, []);

    function addSlot() {
       
        let i = 0;
        console.log(startTime+" "+endTime);
        for (i = startTime; i < endTime; i++) {
            console.log(i, i + 1);
            setSlots(i);
            
        }
       
    }
    
    const handleSlots  = async (event) =>
    {
        console.log(event);
        event.preventDefault();
        var datax = event.currentTarget.getAttribute('data');
        var slotTime = event.currentTarget.getAttribute('time');
         // Add 1 to today's date and set it to tomorrow
          //console.log("Tomorrow is", tomorrow.toDateString())
        console.log(datax);
       datab[datax]=1;
       udatab(datab);
       console.log(datab+"here bkvgw");
        if(event.currentTarget.style.backgroundColor="green"){   
            event.currentTarget.style.backgroundColor="red";
            event.currentTarget.style.boxShadow="red";
            event.currentTarget.style.border= "1px solid darkred";
            const DocRef = doc(db, "doctors",doctor.id);
            await updateDoc(DocRef, {
              
              "slots.slot1":datab[0],
              "slots.slot2":datab[1],
              "slots.slot3":datab[2],
              "slots.slot4":datab[3],
              "slots.slot5":datab[4],
              "slots.slot6":datab[5],
              "slots.slot7":datab[6],
              "slots.slot8":datab[7],
              
                
            });
           
            const serviceId = "service_y9h5hak.";
             const templateId = "template_2ahhf3g";
           try {
            
                await emailjs.send(serviceId, templateId, {
                  name: user.email,
                  doctorName:doctor.name,
                  to_name:user.email,
                  t1:slotTime,
                  t2:(Number(slotTime)+1),
                  day:tomorrow.toDateString(),
                 recipient: user.email
             });
             const Ref = doc(db, "users", user.email);
             const appoint={
                doctor:doctor.name,
                t1:slotTime,
                t2:(Number(slotTime)+1),
                day:tomorrow.toDateString(),
                location:doctor.location,
                specialization:doctor.specialization
             }
             updateDoc(Ref, {
               appoints: arrayUnion(appoint)|| null,
            });
            // var image = document.getElementById("myImage").src="src/QR Code/qr_img.png";
            // alert("OnLoad image"+image );
            alert("slot booked successfully");
           } catch (error) {
             console.log(error);
           } finally {
          
           }
           
      }
        else{
            event.currentTarget.style.backgroundColor="green";
            event.currentTarget.style.boxShadow="green";
            event.currentTarget.style.border="1px solid darkgreen";
        }
    };
    function addnewreview(event){
        event.preventDefault();
         const Ref = doc(db, "doctors", doctor.id);
         const goal={
            rev:review,
            id:user.email
         }
         updateDoc(Ref, {
           reviews: arrayUnion(goal)|| null,
        });
    }
    return (
        <div class="main">
            <div class="conatiner">
                <div class="sub">
                    <div class="image">
                        <img class="img1"
                        src={profilelogo}
                        width="100"
                        height="100"/>
                    </div>
                    <div class="text">
                        <p><b>Name</b>: 
                        {doctor.name}
                        </p>
                        <p><b>Qualification : </b> MBBS</p>
                        <p><b>Specialization : </b> {doctor.specialization}</p>
                        <p><b>Experience : </b> {doctor.expe} years</p>
                        <p><b>Rating : </b> {doctor.rating} <img className="img2" src={star}
                            width={30} height={29}
                        /></p>
                        <p>Medical Registration Verified  <img className="img2" src={tick}
                         width={30} height={28}/></p>
                    </div>
                </div>
            </div>
            <div class="info">
                <h3>ABOUT : </h3>
                <p style={{fontSize:"20px"}}>
                {doctor.about}
                </p>
            </div>
            <div class="info1" style={{fontSize:"20px"}}>
                <center>
                <table>
                    <tr>
                    <th>Address</th>
                    <th>Work Timings</th>
                    <th>Fee</th>
                    </tr>
                    <tr>
                    <td>{doctor.address}</td>
                    <td>
                        {doctor.startTime}:00 - {doctor.endTime}:00 
                    </td>
                    <td>₹500</td>
                    </tr>
                </table>
                </center>
            </div>
            <div class="book">
                <h3><b>Book Your Slot for : </b></h3>  <p style={{fontSize:"20px"}}>{tomorrow.toDateString()}</p> 
            </div>
            <div class="btn">
                {slot.length > 0 ? (
                slot.map((ele, idx) => {   
                    if(datab[idx]===0){
                        return (
                            <div  className="slots"  key={idx}>
                                <button style ={{backgroundColor:"green"}} time={ele} data={idx} className="bookings" onClick={handleSlots}>
                                    {ele} - {ele + 1}
                                </button>
                            </div>
                        );
                    }
                    else{
                        return (
                            <div  className="slots"  key={idx}>
                                <button style={{backgroundColor: "red"}} value={idx} className="bookings"  >
                                    {ele} - {ele + 1}
                                </button>
                            </div>
                        );
                    }
                })
                ) : (
                <div>No slots available</div>
                )}
                
            </div>
            <div className="card-wrapper">
                <label><em>Write a review</em></label>
                <input placeholder="Write Your Review" value={review} onChange={e=>setreview(e.target.value)}/>
                <button onClick={addnewreview}><img src={send} style={{width:"45px",height:"45px"}}/></button>
            </div>
            {
                reviews.map((g,idx)=>{
                    return( <div className="note-rev">
                    <p style={{fontSize:"20px"}}>{g.rev}</p>
                    <p className="th-user">{g.id}</p>
                    </div>)
                })
            }
        </div>
    )
}