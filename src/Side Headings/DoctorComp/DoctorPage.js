import { useState } from "react";
import { useStateValue } from "../../stateProvider";
import { Link } from "react-router-dom";
function DoctorPage(){
    const [{ doctor,user }, dispatch] = useStateValue();
      
    return(
      <div> 
        <h1>{doctor.name}</h1>
        <p>location:{doctor.location}</p>
        <p>rating:{doctor.rating}</p>
        <p>specialization:{doctor.specialization}</p>
        <p>about:{doctor.about}</p>
        <Link to="/appoint">
          <button>Book Appointment</button>
        </Link>
      </div>
    )
}
export default DoctorPage;


