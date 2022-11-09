import Login from "./Components/Login";
import ManagePatient from "./Components/ManagePatient";
import AddPatient from "./Components/AddPatient";
import EditPatient from "./Components/EditPatient";
import Home from "./Components/Home";
import ListOfPatient from "./Components/ListOfPatient";
import AssociatePatient from "./Components/ListOfPatient/AssociatePatient";
import ListOfRecording from "./Components/ListOfRecording";
import Session from "./Components/Session";
// React Router import
import { Routes, Route } from "react-router-dom";
import RegisterUser from "./Components/RegisterUser";
import ForgotPassword from "./Components/Login/ForgotPassword/index";
import ChangePass from "./Components/Login/ChangePassword/index";
import PageNotFound from "./Components/UImodals/PageNotFound";
import { useState } from "react";
import GmailPage from "./Components/Login/gmailpage";

function App() {
  const [name, setname] = useState("");
  const [id, setId] = useState("");
  const [token, setToken] = useState(null);
  const reciveDataHandler = (reciveData) => {
    setname(reciveData.name);
    setId(reciveData.id);
    console.log(reciveData);
  };
  const tokenData = (tData) => {
    setToken(tData);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Login sentData={reciveDataHandler} />} />
        <Route
          path="/forgotpassword"
          element={<ForgotPassword id={id} name={name} />}
        />
        <Route
          path="changepassword"
          element={<ChangePass id={id} name={name} />}
        />
        {/* <Route path="/" element={<RegisterUser />} /> */}
        <Route path="/api/reset-password/:id/:token" element={<GmailPage />} />
        <Route
          path="managepatient"
          element={<ManagePatient id={id} name={name} />}
        />
        <Route path="addpatient" element={<AddPatient name={name} id={id} />} />
        <Route
          path="editpatient"
          element={<EditPatient id={id} name={name} onAddToken={tokenData} />}
        />
        <Route path="home" element={<Home name={name} id={id} />} />
        <Route
          path="listofpatient"
          element={<ListOfPatient id={id} name={name} token={token} />}
        />
        <Route
          path="associate"
          element={<AssociatePatient id={id} name={name} />}
        />
        <Route
          path="listofrecording"
          element={<ListOfRecording id={id} name={name} />}
        />
        <Route path="session" element={<Session />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
