import Navbar from "../Common/Navbar";
import style from "./style";
// import listofpatient from "./listofpatient.json";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../token";

const ListOfPatient = (props) => {
  const [patientData, setPatientData] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const nagivate = useNavigate();
  const [token, setToken] = useState("");
  const [flag, setFlag] = useState(null);
  const [authToken, setAuthtoken] = useState();

  const loadData = async () => {
    const token = await getToken();
    const data=   await axios
      .get("http://127.0.0.1:8000/api/patient/",{
        headers: {
          'Authorization': `Bearer ${token?.access}`
        }
      })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  const FilterFunction = (event) => {
    event.preventDefault();
    setPatientData(patientData.filter((res) => res == filter));
  };
  // const handleEdit = (list) => {
  //   nagivate("/editpatient", { state: { list } });
  // };
  return (
    <div>
      <Navbar name={props.name} id={props.id} />
      <div className={style.container}>
        <div className="flex justify-between items-center">
          <h1 className={style.heading}>List of Patients</h1>
          <form onSubmit={FilterFunction}>
            <input
              className={style.input}
              placeholder="Search by Id,Name,Address ..."
              type="text"
              value={filter}
              name="filter"
              onChange={(e) => setFilter(e.target.value)}
            />
          </form>
        </div>
        <div className={style.tableContainer}>
          {/* header of the table */}

          <div className={style.headerRow}>
            <div className="w-32 text-center text-orange-600 font-semibold">
              ID
            </div>
            <div className="w-40 text-center text-orange-600 font-semibold ">
              Patient Full Name
            </div>
            {/* <div className="w-32 text-orange-600 font-semibold">
              Date of birth
            </div> */}
            <div className="w-32 text-center text-orange-600 font-semibold">
              Remarks
            </div>
            <div className="w-32 text-center text-orange-600 font-semibold">
              Annotation
            </div>
            <div className="w-48 text-center text-orange-600 font-semibold">
              Address
            </div>
            <div className="w-32 text-center text-orange-600 font-semibold">
              Action
            </div>
          </div>
          <div className={style.table}>
            {/* body of the table */}
            <div>
              {data.map((list) => {
                return (
                  <div className={style.bodyRow} key={list.id}>
                    <div className="w-32 text-center">{list.id}</div>
                    <div className="w-40 text-center">{list.name}</div>
                    <div className="w-32 text-center">{list.remarks}</div>
                    <div className="w-32 text-center">{list.annotation}</div>
                    <div className="w-48 text-center">{list.address}</div>
                    <div className="w-32 space-x-2 text-center">
                      <Link to="/editpatient" state={list}>
                        <button className={style.tableButton}>Edit</button>
                      </Link>
                      <Link to="/session" state={list}>
                        <button className={style.tableButton}>Session</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListOfPatient;
