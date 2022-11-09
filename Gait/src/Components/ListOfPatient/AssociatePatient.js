import Navbar from "../Common/Navbar";
import style from "./style";
// import listofpatient from "./listofpatient.json";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import { getToken } from "../../token";

const AssociatePatient = (props) => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [recordings, setRecordings] = useState([]);
  const [senddata, setsenddata] = useState({});
  const [remarks, setRemarks] = useState("");
  const [authToken, setAuthtoken] = useState();
  // const remarks = useRef();

  const inputHandler = (e) => {
    setRemarks(e);
  };
  const location = useLocation();
  const state = location?.state;

  useEffect(() => {
    const token = getToken();
    axios.get("http://127.0.0.1:8000/api/patient",{
      headers: {
        'Authorization': `Bearer ${token?.access}`
      }}
    ).then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    setRecordings(state);
    setAuthtoken(getToken())
 
  }, []);
  const handleAssociate = async (patient) => {
    const payload = {
      recordings: recordings,
      patentId: patient?.id,
    };

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/cleandata/",
        payload,
        {  headers: {
          'Authorization': `Bearer ${authToken?.access}`
        }}
      );

      if (data) {
        const associatePayload = {
          data: data?.data,
          remarks: remarks,
          id: data?.id,
        };
            const res = await axios.patch(
              "http://127.0.0.1:8000/api/associate/",
              associatePayload,{
                headers: {
                  'Authorization': `Bearer ${authToken?.access}`
                }
              }
            );
            if(res.data?.msg && res.status==200){
            alert(res.data.msg)
            navigate("/listofpatient")
            }
          } else {
            alert("Please select the recordings first");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const backToHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <Navbar name={props.name} id={props.id} />
      <div className={style.container}>
        <div className="flex justify-between items-center">
          <h1 className={style.heading}>List of Patients</h1>
          <form>
            <input
              className={style.input}
              placeholder="Search by Id,Name,Address ..."
              type="text"
              value={filter}
              name="filter"
            />
          </form>
        </div>
        <div className={style.tableContainer}>
          {/* header of the table */}

          <div className={style.headerRow}>
            <div className="w-32 text-orange-600 font-semibold">ID</div>
            <div className="w-40 text-orange-600 font-semibold ">
              Patient Full Name
            </div>
            <div className="w-48 text-orange-600 font-semibold">Remarks</div>
            <div className="w-32 text-orange-600 font-semibold">Action</div>
          </div>
          <div className={style.table}>
            {/* body of the table */}
            <div>
              {data.map((list) => {
                return (
                  <div className={style.bodyRow} key={list.id}>
                    <div className="w-32 ">{list.id}</div>
                    <div className="w-40">{list.name}</div>
                    <div className="w-48">
                      <Input inputValue={inputHandler} key={list.id} />
                      {/* <input
                        type="text"
                        className="border focus:outline-none border-gray-300"
                        // value={remarks}
                        // onChange={inputHandler}
                        ref={remarks}
                      /> */}
                    </div>
                    {/* <div className="w-48">{list.Comments}</div> */}
                    <div className="w-32">
                      <button
                        className={style.tableButton}
                        onClick={() => handleAssociate(list)}
                      >
                        Associate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-4/5 mt-4">
          <button
            onClick={backToHome}
            className="bg-[#01c6b2] rounded float-right font-semibold px-3 py-2"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
export default AssociatePatient;
