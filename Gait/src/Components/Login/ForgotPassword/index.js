import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stylePass from "./style";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const formSubmitHandler =async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/restpassword/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    });
    let data = await response.json();
    console.log(data)
    if (!data){
      alert("User is not register!!!")
    }
    else{
      alert(data.msg)
      navigate("/login")
    }
  };
  return (
    <div>
      <section className={stylePass.container}>
        <form
          onSubmit={formSubmitHandler}
          className="border-2 rounded-xl py-10 px-5"
        >
          <div className={stylePass.enteremaildiv}>
            <h1 className={stylePass.heading}>Email?</h1>
            <label htmlFor="email" className={stylePass.para}>
              Enter Your Email
            </label>
            <input
              type="email"
              required
              className={stylePass.input}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={stylePass.buttondiv}>
            <button className={stylePass.button}>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ForgotPassword;
