import Navbar from "../Common/Navbar";
import style from "./style";
import { useMemo, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Checkbox from "../Checkbox";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getToken } from "../../token";

const ListOfRecording = (props) => {
  const navigate = useNavigate();

  const [listR, setListR] = useState([]);
  const [data, setData] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [doctId, setdoctId]=useState() 
  
  


  useEffect(() => {
    const data=JSON.parse(localStorage.getItem("info"))
    const obj = { id: data.id };
    const token = getToken();
    axios
      .post("http://127.0.0.1:8000/api/listOfRecordings/", obj,{
        headers: {
          'Authorization': `Bearer ${token?.access}`
        }
      })
      .then((res) => {
        // console.log(listR);
        if (Array.isArray(res?.data) && res.status == 200) {
          setListR(res.data);
        } else {
          setData(res.data.msg);
        }
      });

  }, []);
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(listR.map((li) => li?.id));
    setSelectedData(listR);
    if (isCheckAll) {
      setIsCheck([]);
      setSelectedData([]);
    }
  };

  useMemo(() => {
    if (selectedId !== null) {
      const temp = listR?.filter((item) => {
        return item?.id === selectedId;
      });
      setSelectedData([...selectedData, temp]);
    }
  }, [selectedId]);
  console.log(data);

  // console.log("Selected data", selectedData);
  const handleClick = (e) => {
    const { id, checked } = e.target;
    // const temp = listR?.filter((item) => item?.id === id);
    setSelectedId(id);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // Record assocation
  const AssocaiteRecords = () => {
    navigate("/", selectedData);
  };
  const backToHome = () => {
    navigate("/home");
  };
  const condiRender = (
    <>
      <div>
        <label className="mr-1">All</label>
        <Checkbox
          type="checkbox"
          name="selectAll"
          id="selectAll"
          handleClick={handleSelectAll}
          isChecked={isCheckAll}
        />
      </div>
      <Link to="/associate" state={selectedData}>
        <button className={style.tableButton} onClick={AssocaiteRecords}>
          Associate
        </button>
      </Link>
    </>
  );
  const classN = data ? "justify-center" : "justify-end";
  let candiData;
  if (data) {
    candiData = (
      <div className="fixed top-96 left-2/5 border p-4 rounded-lg">{data}</div>
    );
  }
  return (
    <div>
      <Navbar name={props.name} id={props.id} />
      <div className={style.container}>
        <div className="flex justify-between items-center">
          <h1 className={style.heading}>List of Recording</h1>
          <input className={style.input} placeholder="Search by Id,Date ..." />
        </div>
        <div className={style.tableContainer}>
          {/* header of the table */}

          <div className={style.headerRow}>
            <div className="w-40 text-orange-600 font-semibold text-center">
              Uploading Date
            </div>
            <div className="w-40 text-orange-600 font-semibold text-center">
              Time
            </div>
            <div className="w-40 text-orange-600 font-semibold text-center">
              ID
            </div>

            <div className="w-28 text-orange-600 font-semibold text-center">
              Select
            </div>
          </div>
          <div
            className={`flex items-center ${classN} mr-0 gap-3 ml-auto mt-0`}
            style={{ width: "105%" }}
          >
            {data ? candiData : condiRender}
          </div>
          <div className={style.table}>
            {/* body of the table */}
            <div>
              {listR.map((list, index) => {
                return (
                  <div className={style.bodyRow} key={list.id}>
                    {/* <div className="w-40 ">{list._id["$oid"].slice(5)}</div> */}
                    {<div className="w-40 text-center"></div>}
                    {
                      <div className="w-44 text-center">
                        {list.info.time_stamp}
                      </div>
                    }
                    {
                      <div className="w-40 text-center">
                        {list.id.slice(0, 15)}
                      </div>
                    }
                    {/* <div className="w-40">{list.name}</div> */}
                    {/* {<div className="w-44">{list.info.dont_know}</div>} */}

                    <div className="w-28 text-center">
                      {/* <button className={style.tableButton}>Select</button> */}
                      <Checkbox
                        key={list?.id}
                        type="checkbox"
                        name={index + ""}
                        id={list?.id}
                        handleClick={handleClick}
                        isChecked={isCheck?.includes(list?.id)}
                        className="mt-5"
                      />
                      <input type="checbox" />
                    </div>
                  </div>
                );
              })}
            </div>
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
  );
};
export default ListOfRecording;
