import { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/authContext";
import style from "./style";
import jwt_decode from "jwt-decode";
import { getToken } from "../../../token/index.js";

function ChangePass() {
  const passwordInput = useRef();
  const confPass = useRef();
  const navigate = useNavigate();
  const [authToken, setAuthtoken] = useState();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const password = passwordInput.current.value;
    const password2 = confPass.current.value;
    let response = await fetch("http://127.0.0.1:8000/api/changepassword/", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${authToken?.access}`,"Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,password2
      }),
    });
    let data = await response.json();
    if (response.status==200 || data.msg){
      alert(data.msg)
      navigate("/home")
    }
    if(response.status!=200){
      alert(data.errors.non_field_errors[0])
    }
  };
  useEffect(() => {
    setAuthtoken(getToken);
  }, []);


  return (
    <form className={style.container} onSubmit={formSubmitHandler}>
      <div className="flex flex-col justify-center items-center space-y-10">
        <h1 className={style.heading}>Change Password</h1>
        <h1 className={style.para}>Enter your new password</h1>
      </div>
      {/* inputs for username and password */}
      <div className={style.fieldContainer}>
        <input
          ref={passwordInput}
          className={style.input}
          type="password"
          placeholder="new password"
          name="password"
          id="password"
        />
        <input
          ref={confPass}
          className={style.input}
          type="password"
          placeholder="confirm password"
          name="confpassword"
          id="confpassword"
        />
      </div>

      {/* submit button */}
      <div className="w-80 pt-6">
        <input className={style.button} type="submit" />
      </div>
    </form>
  );
}

export default ChangePass;
