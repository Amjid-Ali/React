import ReactDOM from "react-dom";
import style from "./style";
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className={style.modal}>
      <h1 className={style.heading}>Oops!</h1>
      <div>Password are not matching.</div>
      <button className={style.modalBtn} onClick={props.onClose} >Ok</button>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
