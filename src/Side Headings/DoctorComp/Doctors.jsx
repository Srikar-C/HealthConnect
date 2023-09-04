import { useState } from "react";
import doctors from "./doctorList";
import "./Doctors.css";
import { useStateValue } from "../../stateProvider";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
function Doctor() {
  const [cityName, ucity] = useState("");
  const [specialization, uspecialization] = useState("");
  const [{ doctor,user }, dispatch] = useStateValue();
  function handleSpec(event) {
    uspecialization(event.target.value);
  }
  function handleAppointment(ids){
    dispatch({
      type: "SET_DOCTOR",
      doctor:ids
    });
    
    
  }
  function Card(props) {
    
    return (
      <div className="card">
        <p type="text" id="my-city" Style="display:none;">
        {props.location}
        </p>
         <p id="my-specialization" value={props.specialization} style={{display:"none"}}>
           {props.specialization}
          </p>
        <table>
          <tr>
          <p> <b>Name :</b> {props.name}</p>
          </tr>
          <tr>
          <p value={props.specialization}>
           <b>Specialisation: </b>{props.specialization}
          </p>
          </tr>
          <tr>
          <p><b>Location :</b> {props.location}</p>
          </tr>
        </table>
         <Link to={user && "/finddoctor/appoint"}>
           <button className="doctor-btn"  onClick={() => handleAppointment(props.ids)}>
           {user? "book a appointment":"Login to book appointemnt "}
          </button>
        </Link> 
      </div>
    );
  }
  function handleDoctor(event) {
    event.preventDefault();
    var e = document.getElementById("city");
    var value = e.options[e.selectedIndex].value;
    ucity(value);

    const cards = document.querySelectorAll(".card");
    const cities = document.querySelectorAll("#my-city");
    const specs = document.querySelectorAll("#my-specialization");
    console.log(specs);
    let i = 0;
    if (cityName !== "" && specialization !== "") {
      cards.forEach((c) => {
        // console.log(cities[i].innerHTML);
        if (
          cities[i].innerHTML === cityName &&
          specs[i].innerHTML === specialization
        ) {
          c.classList.remove("hide");
        } else {
          c.classList.add("hide");
        }
        i += 1;
      });
      i = 0;
    } else if (cityName !== "") {
      cards.forEach((c) => {
        // console.log(cities[i].innerHTML);
        if (cities[i].innerHTML === cityName) {
          c.classList.remove("hide");
        } else {
          c.classList.add("hide");
        }
        i += 1;
      });
      i = 0;
    } else if (specialization !== "") {
      cards.forEach((c) => {
        console.log(specs[i].innerHTML);
        if (specs[i].innerHTML === specialization) {
          c.classList.remove("hide");
        } else {
          c.classList.add("hide");
        }
        i += 1;
      });
    }
  }
  return (
    <div className="doctor-main">
      <h2 style={{textAlign:"center",marginBottom:"0px",marginTop:"2%"}}>Find Doctor's near you</h2>
      <form>
        <div className="doctor-spec">
          <label for="lang" className="sp"><h2>Specialization </h2></label>
          <input style={{marginLeft:"1%"}} type="text" onChange={handleSpec} placeholder="example: dentist"/>
        </div>
        <div className="doctor-city">
          <select id="city">
            <option value="">select a city</option>
            <option value="kurnool">kurnool</option>
            <option value="banglore">banglore</option>
            <option value="hyderabad">hyderabad</option>
            <option value="mumbai">mumbai</option>
            <option value="chennai">chennai</option>
          </select>
          <button onClick={handleDoctor} type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="doctor-cards" >
        {doctors.map((doc) => (
          <Card
            ids={doc}
            name={doc.name}
            location={doc.location}
            specialization={doc.specialization}
            rating={doc.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Doctor;