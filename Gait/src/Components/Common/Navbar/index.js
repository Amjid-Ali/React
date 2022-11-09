import style from "./style";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../../token";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  // const [name, setName] = useState("Doctor Methieu");
  const [navModal, setnavModal] = useState(false);
  const data = JSON.parse(localStorage.getItem('info'))
  const showNavHandler = () => {
    setnavModal((preState) => !preState);
  };
  const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('info');
    navigate('/')
    
  }
  return (
    <div className="flex justify-between w-full h-11 bg-[#28696d] rounded-lg items-center">
      <div className={style.container}>
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/181/615/original/medical-doctor-general-practitioner-physician-profile-avatar-cartoon-vector.jpg"
            alt="profile"
            className={style.image}
          />
        </div>
        <div>
          <GiHamburgerMenu color="white" />
        </div>
        <div className={style.doctorName}>
          {/* <h1>Welcome Dr {props.name ?  props.name: "" }</h1> */}
          <h1>Welcome Dr {data ? data.name : ''}</h1>
        </div>
      </div>
      <div className="mr-4" onClick={showNavHandler}>
        <div className="w-6">
        <div className={style.menubar}></div>
        <div className={style.menubar}></div>
        <div className={style.menubar}></div>
        </div>
        {navModal && (
          <div className={style.navbarlinks}>
            <button onClick={logoutUser}>Logout</button>
            <Link to="/changepassword">Change Password</Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
