import "./Login.scss";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo/logo-no-background.svg";
import logo2 from "../../assets/logo/logo-no-background.png";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../consts";
import InputField from "../../components/InputField/InputField";


function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}users/login`, {
        email: event.target.email.value,
        password: event.target.password.value
      });
  
      sessionStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        {/* <img className="login__logo" src={logo} alt="rxcheck logo"/> */}
        <img className="login__logo" src={logo2} alt="rxcheck logo"/>

        {/* <h1 className="login__title">RxCheck</h1> */}
        <hr className="divider"></hr>

        <InputField type="text" name="email" label="Email" />
        <InputField type="password" name="password" label="Password" />

        <button className="login__button">Log in</button>

        {error && <div className="login__message">{error}</div>}
      </form>

      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </main>
  );
}

export default Login