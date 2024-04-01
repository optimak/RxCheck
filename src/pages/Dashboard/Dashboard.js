import "./Dashboard.scss";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../consts";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();

  const getProfile = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(`${baseUrl}users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfile(response.data);
    } catch (error) {
      console.error(error);
      setFailedAuth(true);
    }

    setIsLoading(false);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setFailedAuth(true);
    setProfile(null);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (failedAuth) {
    return (
    navigate("/login")
    )
  }

  if (isLoading) {
    return (
      <main className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__card">


        <div className='dashboard__image' > </div>



        <h2 className="dashboard--sizing">My Profile</h2>
        <div className="dashboard__profile">
          <p> {profile.full_name}</p>

          <p>{profile.email}</p>
          <p>{profile.age} years old</p>
          <p>{profile.gender}</p>
          <p>Pre-existing Conditions: {profile.preexisting_conditions}</p>


        </div>

        {/* <button onClick={logout}>
          Log out
        </button> */}
      </div>

    </main>
  );
}


export default Dashboard