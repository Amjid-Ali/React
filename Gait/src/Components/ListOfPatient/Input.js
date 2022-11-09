import { useState } from "react";
const Input = (props) => {
  const [inputRemarks, setInputRemarks] = useState("");
  const inputChangehandler = (e) => {
    setInputRemarks(e.target.value);
  };
  const submiData = ()=>{
    props.inputValue(inputRemarks);
  }

  return (
    <form>
      <input
        value={inputRemarks}
        className="border-2"
        type="text"
        onChange={inputChangehandler}
        onBlur={submiData}
      />
    </form>
  );
};

export default Input;
