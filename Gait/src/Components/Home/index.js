import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import style from "./style";
import { getToken } from "../../token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const navigate = useNavigate();

    // check user if login or not
    useEffect(() => {
        const token = getToken();
        if(!token) navigate('/')
    },[])
    return (
        <div>
            <Navbar name={props.name} id={props.id} />
            <div className={style.container}>
                <h1 className={style.heading}>Home</h1>
                <div className={style.buttonContainer}>
                    <Link to='/managepatient'>
                        <button className={style.button}>
                            Manage Patient
                        </button>
                    </Link>
                    <Link to='/session'>
                        <button className={style.button}>
                            Manage Session
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Home;