import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../Common/Navbar";
import style from "./style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../token";

const EditPatient = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [authToken, setAuthtoken] = useState();
  const data = location.state;
  const [userInfo, setUserInfo] = useState({
    name: data.name,
    id: data.id,
    dob: data.dob,
    address: data.address,
    comments: data.comments,
  });

  
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/patient/",
        userInfo,{
          headers: {
            'Authorization': `Bearer ${authToken?.access}`
          }
        }
        );
      const data = await response;
      if (data.status == 200) {
        alert(data.data.msg);
        navigate("/listofpatient");
      } else {
        alert("unathorized");
      }
    } catch (err) {
      console.log(err);
    }

    props.onAddToken(token);
  };
  useEffect(() => {
    setAuthtoken(getToken);
  }, []);

  const removeData = async (e) => {
    e.preventDefault();
    const payload = {"id":userInfo.id}
    let respone = await fetch("http://127.0.0.1:8000/api/patient/", {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${authToken?.access}`, "Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });
const data= await respone.json()
    if (data.msg || respone.status==200) {
      alert(data.msg);
      navigate("/listofpatient");
    } else {
      alert("something went wrong");
    }
  };
  return (
    <div>
      <Navbar name={props.name} id={props.id} />
      <div className={style.container}>
        <h1 className={style.heading}>Edit Patient</h1>
        <form className={style.form} onSubmit={submitData}>
          <div className="flex justify-around w-full">
            <div className={style.inputGroup}>
              <label className={style.label} htmlFor="name">
                Patient Full Name
              </label>
              <input
                className={style.input}
                type="text"
                name="name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </div>
            <div className={style.inputGroup}>
              <label className={style.label} htmlFor="Id">
                ID number (11 digits)
              </label>
              <input
                className={style.input}
                placeholder="unchangeable"
                type="number"
                name="Id"
                value={userInfo.id}
                // onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
              />
            </div>
            <div className={style.inputGroup}>
              <label className={style.label} htmlFor="DOB">
                Date of birth
              </label>
              <input
                className={style.input}
                type="text"
                name="DOB"
                value={userInfo.dob}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, DOB: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex w-4/5 ml-12 gap-20 items-end">
            <div className={style.inputGroup}>
              <label className={style.label} htmlFor="address">
                Address
              </label>
              <input
                className={style.input}
                type="text"
                name="address"
                value={userInfo.address}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, address: e.target.value })
                }
              />
            </div>
            <div className={style.comment}>
              <label className={style.label} htmlFor="comment">
                Comments
              </label>
              <textarea
                className={style.textarea}
                type="text"
                name="comment"
                value={userInfo.comments}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, comments: e.target.value })
                }
                rows={2}
              />
            </div>
          </div>
        </form>
        <div className={style.buttonGroup}>
          <Link to="/listofpatient">
            <button className={style.button} onClick={submitData}>
              save
            </button>
          </Link>
          <button onClick={removeData} className={style.button1}>
            Remove
          </button>
          <Link to="/listofpatient">
            <button className={style.button}>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EditPatient;
