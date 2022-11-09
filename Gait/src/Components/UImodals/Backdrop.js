import ReactDOM from "react-dom";
import style from "./style";
const Bacdrop = (props) => {
  return ReactDOM.createPortal(
    <div className={style.backdrop} onClick={props.onClose} />,
    document.getElementById("overlay")
  );
};

export default Bacdrop;
