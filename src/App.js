import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import FindMeds from "./pages/FindMeds/FindMeds";
import SearchPage from "./pages/SearchPage/SearchPage";

import Details from "./pages/Details/Details";
import Header from "./components/Header/Header";
import axios from "axios";
import { useEffect, useState } from 'react';
import { baseUrl } from './consts';


function App() {
  const [userMeds, setUserMeds] = useState([]);
  const [updateUserMeds, setUpdateUserMeds] = useState(true);

  const getUserMeds = async () => {
    console.log(baseUrl)
    try {
      const id = JSON.parse(sessionStorage.getItem('profileId'));
      const response = await axios.get(`${baseUrl}users/${id}/meds`)
      // setProfile(response.data);
      setUserMeds(response.data);
      // setFilteredMeds(response.data)
      sessionStorage.setItem('userDrugs', JSON.stringify(response.data));


      console.log("Obtaiined MEDS", response.data)
    } catch (error) {
      console.error(error);
      // setFailedAuth(true);
      console.log("NO DATA GOTTEN")
    }

    // setIsLoadingData(false);
  };
  const deleteUserMed = async (medId, profileId) => {

    try {
      const response = await axios.delete(`${baseUrl}users/${profileId}/meds/${medId}`)
      // setProfile(response.data);
      // setUserMeds(response.data)
      setUpdateUserMeds(!updateUserMeds);
      console.log("deleted MEDS", response.data)
    } catch (error) {
      console.error(error);
      // setFailedAuth(true);
      console.log("NO DATA GOTTEN")
    }

    // setIsLoadingData(false);
  };
  const updateUserDrugs = () => {
    // if (userMeds.length !== newValue.length) {

    // }
    setUpdateUserMeds(!updateUserMeds);
  };
  useEffect(() => {
    getUserMeds();

  }, [updateUserMeds])


  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<><Header /> <Dashboard userMeds={userMeds} updateUserDrugs={updateUserDrugs} deleteUserMed={deleteUserMed} /></>} />


          <Route path="/search" element={<><Header /> <FindMeds userMeds={userMeds} /> </>} >
            <Route path="" element={<SearchPage />} />

            <Route path=":medId" element={<Details userMeds={userMeds} updateUserDrugs={updateUserDrugs} deleteUserMed={deleteUserMed} />} />
          </Route>
          <Route path="*" element={<><Header /><Dashboard /> </>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
