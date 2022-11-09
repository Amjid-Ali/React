import { useLocation } from 'react-router-dom';
import Navbar from "../Common/Navbar";
import style from "./style";

const Session = () => {
  const location = useLocation();
  const data = location.state;
  
  return (
    <div>
      <Navbar  />
      <div className={style.container}>
        <h1 className={style.heading}>{data ? data.name : "Patient Name"}</h1>
        <div className={style.labelContainer}>
          Number of Session : <span className="text-orange-500 mr-4"> 3 </span> Last
          Session <span className="text-orange-500">12/02/2022</span>
        </div>

        <div>
          <div>

          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Session;