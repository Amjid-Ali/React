import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import style from "./style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../token";
const AddPatient = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [remarks, setComments] = useState("");
  const [id, setId] = useState("");
  const [polit, setpolit] = useState("");
  const [token, setToken] = useState("");
  const [doctId, setdoctId]=useState() 

  useEffect(() => {
    setToken(getToken);
    const data=JSON.parse(localStorage.getItem("info"))
   setdoctId(data.id)
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      data: { name, dob, address, remarks, polit },
      id: doctId,
    };
    console.log(token)
    let respone = await fetch("http://127.0.0.1:8000/api/patient/", {
      method: "POST",
      headers: {'Authorization': `Bearer ${token?.access}`, "Content-Type": "application/json"},
      body: JSON.stringify(obj),
    });
    const data = await respone.json();
    if (respone.status != 401) {
      alert(data.msg);
      navigate("/home")
    } 
    else if (respone.status == 200) {
        alert(data.msg);
        navigate("/listofpatient")  
      } 
    else{
      alert(data.errors.detail);
      navigate("/home")
    }
  };

  return (
    <div>
      {/* popMessage */}
      <Navbar name={props.name} id={props.id} />
      <div className={style.container}>
        <h1 className={style.heading}>Add Patient</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.form}>
            <div className="flex justify-around items-center w-full">
              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="">
                  Patient Full Name
                </label>
                <input
                  required
                  className={style.input}
                  type="text"
                  name=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={style.inputGroup}>
                <label
                  className={style.label}
                  // for=""
                  placeholder="Optional!! it is assigned auto"
                >
                  ID number
                </label>
                <input
                  disabled
                  className={style.input}
                  type="text"
                  name=""
                  value={id}
                  placeholder="Optional!!! it is assinged auto"
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className={style.inputGroup}>
                <label className={style.label} for="date">
                  Date of birth
                </label>
                <input
                  required
                  className={style.input}
                  type="text"
                  name="date"
                  placeholder="YYYY-MM-DD"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-around items-center w-full">
              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="">
                  Address
                </label>
                <input
                  required
                  className={style.input}
                  type="text"
                  name=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="">
                  Remarks
                </label>
                <input
                  required
                  className={style.input}
                  type="text"
                  name=""
                  value={remarks}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="">
                  polit
                </label>
                <input
                  required
                  className={style.input}
                  type="text"
                  name=""
                  value={polit}
                  onChange={(e) => setpolit(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={style.buttonGroup}>
            {/* <Link to="/listofpatient"> */}
            <button className={style.button1} type="submit">
              ADD
            </button>
            {/* </Link> */}
            <Link to="/managepatient">
              <button className={style.button1}>Back</button>
            </Link>
            <Link to="/home">
              <button className={style.button1} type="submit">
                home
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPatient;
