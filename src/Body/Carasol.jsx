import Carousel from 'react-bootstrap/Carousel';
import image from "./cara.png";
import "./carasol.css";

function DarkVariantExample() {
  return (
    <Carousel style={{width:"70%",height:"15%",marginLeft:"auto",marginRight:"auto",alignItems:"center",justifyContent:"center"}} data-bs-theme="dark">
      <Carousel.Item className="sub-slides">
        <img
          className="d-block w-100"
          src={image}
          alt="First slide"
        />
        <Carousel.Caption style={{justifyContent:"center",marginBottom:"13%"}} >
          <h2 style={{color:"#D14747"}}>FIND DOCTORS</h2>
          <h4>This feature streamlines the process of finding suitable healthcare options in the user's local area, making it convenient and efficient to book appointments or seek medical advice.</h4>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className="sub-slides">
        <img
          className="d-block w-100"
          src={image}
          alt="Second slide"
        />
        <Carousel.Caption style={{justifyContent:"center",marginBottom:"13%"}}>
          <h2 style={{color:"#D14747"}}>HEALTH METRICS</h2>
          <h4>This personalized section not only helps users keep a comprehensive record of their health journey but also assists healthcare professionals in providing tailored medical advice and treatments based on the individual's specific health metrics.</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="sub-slides">
        <img
          className="d-block w-100"
          src={image}
          alt="Third slide"
        />
        <Carousel.Caption style={{justifyContent:"center",marginBottom:"10%"}}>
          <h2 style={{color:"#D14747"}}>PERSONAL GOALS</h2>
          <h4>
            This feature aims to empower users to take control of their health journey and work towards their desired wellness outcomes.
The app provides tools to track progress, offering insights and reminders to help users stay on track. It might include features like personalized workout plans, suggested meal plans, progress graphs, and notifications to celebrate milestones
          </h4>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;