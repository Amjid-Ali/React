import Navbar from "../Common/Navbar";
import style from "./style";
// import style2 from '../AddPatient/style.js'

import { Outlet, Link } from "react-router-dom";

const ManagePatient = (props) => {
  return (
    <div>
      <Navbar  name={props.name} id={props.id} />
      <div className={style.container}>
        <h1 className={style.heading}>Manage Patient</h1>
        <div className={style.buttonContainer}>
          <Link to="/addpatient">
            <button className={style.button}>Add Patient</button>
          </Link>
          <Link to="/listofrecording">
            <button className={style.button}>List of Recording</button>
          </Link>
          <Link to="/listofpatient">
            <button className={style.button}>Associate to a recording</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ManagePatient;
