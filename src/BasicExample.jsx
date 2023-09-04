import Drop from 'react-bootstrap/Dropdown';
import {Link} from "react-router-dom";

function BasicExample() {
  return (
    <Drop>
      <Drop.Toggle style={{backgroundColor:"blue",margin:"20px 20px"}} variant="success" id="drop-basic">
        <span class="material-symbols-outlined">menu</span>
      </Drop.Toggle>

      <Drop.Menu>
        <Link to="/">
        <Drop.Item href="#/action-1">Home</Drop.Item>
        </Link>
        <Link to="/finddoctor">
        <Drop.Item href="#/action-2">Find Doctors</Drop.Item>
        </Link>
        {/* <Drop.Item href="#/action-3">Something else</Drop.Item> */}
      </Drop.Menu>
    </Drop>
  );
}

export default BasicExample;