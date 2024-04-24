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
import AboutPage from './pages/AboutPage/AboutPage';


function App() {
  const [userMeds, setUserMeds] = useState([]);
  const [userComments, setUserComments] = useState(null);

  const [updateUserMeds, setUpdateUserMeds] = useState(true);
  const [updateUserComments, setUpdateUserComments] = useState(true);
  // const profileId = sessionStorage.getItem('profileId');
  const [profileId, setProfileId] = useState(null);

  const [allMeds, setAllMeds] = useState(null)



  const updateUserCommentList = () => {
    setUpdateUserComments(!updateUserComments)

  }
  useEffect(() => {
    const getUserComments = async () => {
      // const profileId = sessionStorage.getItem('profileId')
      try {
        const id = profileId ?? sessionStorage.getItem('profileId');
        let response = await axios.get(`${baseUrl}comments/all/${id}`);
        // setUpdateUserMeds(!updateUserMeds);
        setUserComments(response.data)
        console.log(response.data, profileId, "profileID")
        // if (!response) {
        //   const id = sessionStorage.getItem('profileId')

        //   let newResponse = await axios.get(`${baseUrl}comments/all/${id}`);
        //   setUserComments(newResponse.data)
        //   console.log(newResponse.data, id, "newId")

        // }
      } catch (error) {
        console.error(error);

      }


    };
    getUserComments()
  }, [profileId, updateUserComments])


  const getUserMeds = async () => {
    try {
      const id = profileId ?? sessionStorage.getItem('profileId');
      const response = await axios.get(`${baseUrl}users/${id}/meds`)
      setUserMeds(response.data);
      sessionStorage.setItem('userDrugs', JSON.stringify(response.data));


    } catch (error) {
      console.error(error);
    }


  };
  const deleteUserMed = async (medId, profileId) => {

    try {
      await axios.delete(`${baseUrl}users/${profileId}/meds/${medId}`)

      setUpdateUserMeds(!updateUserMeds);
    } catch (error) {
      console.error(error);

    }


  };
  const updateUserDrugs = () => {

    setUpdateUserMeds(!updateUserMeds);
  };
  useEffect(() => {
    getUserMeds();

  }, [updateUserMeds,profileId])

  //get all meds
  const getMeds = async () => {

    try {
      const response = await axios.get(`${baseUrl}medications`)
      setAllMeds(response.data)

    } catch (error) {
      console.error(error);
    }

    // setIsLoadingData(false);
  };
  useEffect(() => {
    getMeds()
    updateUserDrugs()
  }, [])
  const getProfileId = (profileId) => {
    setProfileId(profileId)
  }
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<><Header /> <Dashboard userMeds={userMeds} userComments={userComments} updateUserDrugs={updateUserDrugs} deleteUserMed={deleteUserMed} allMeds={allMeds} getProfileId={getProfileId} /></>} />
          <Route path="/about" element={<><Header /> <AboutPage userMeds={userMeds} updateUserDrugs={updateUserDrugs} deleteUserMed={deleteUserMed} /></>} />


          <Route path="/search" element={<><Header /> <FindMeds userMeds={userMeds} /> </>} >
            <Route path="" element={<SearchPage />} />

            <Route path=":medId" element={<Details userMeds={userMeds} updateUserDrugs={updateUserDrugs} deleteUserMed={deleteUserMed} updateUserCommentList={updateUserCommentList} />} />
          </Route>
          <Route path="*" element={<><Header /><Dashboard /> </>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
