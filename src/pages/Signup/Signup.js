import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../consts";
import logo2 from "../../assets/logo/logo-no-background.png";


function Signup() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [filterByCondition, setFilterByCondition] = useState('');

    const navigate = useNavigate();


    const handleFilterByConditionChange = (event) => {
        setFilterByCondition(event.target.value);
    };
    //validate full_name email and password
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProfile =
        {
            full_name: event.target.full_name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            age: isNaN(Number(event.target.age.value)) ? 0 : Number(event.target.age.value),
            gender: event.target.gender.value,
            // preexistingConditions: event.target.preexistingConditions.value,
            preexisting_conditions: filterByCondition.split(":")[1] ?? "none"
        }
        console.log("email", newProfile,event.target,filterByCondition)

        try {


            await axios.post(`${baseUrl}users/register`, newProfile);
            setSuccess(true);
            setError(null);
            event.target.reset();
            setTimeout(() => { navigate('/login') }, 1900)
        } catch (error) {
            setSuccess(false);
            setError(error.response.data);
        }
    };

    return (
        <main className="signup-page">
            <form className="signup" onSubmit={handleSubmit}>
                <img className="login__logo" src={logo2} alt="rxcheck logo" />
                {/* <h1 className="signup__title">Sign up</h1> */}
                {/* Expected body: { full_name, email, age, gender, password, preexisting_conditions } */}

                <InputField type="text" name="full_name" label="Full name" other="*" />

                <InputField type="text" name="email" label="Email" other="*" />
                <InputField type="password" name="password" label="Password" other="*" />

                <InputField type="text" name="age" label="Age" />
                <InputField type="text" name="gender" label="Gender" />
                {/* <InputField type="text" name="preexistingConditions" label="Pre-existing Conditions" /> */}
                <label htmlFor="signup__select">Select Pre-existing Condition</label>

                <select className="signup__select" value={filterByCondition} onChange={handleFilterByConditionChange}>
                    <option value="">None</option>
                    <option value="0:Kidney Disease">Kidney Disease</option>
                    <option value="1:Liver Disease">Liver Disease</option>
                    <option value="2:Heart Conditions">Heart Conditions</option>
                    <option value="3:Allergies and Sensitivities">Allergies and Sensitivities</option>
                    <option value="4:Pregnancy">Pregnancy</option>
                </select>

                <button className="signup__button">Sign up</button>

                {success && <div className="signup__message">Signed up!</div>}
                {error && <div className="signup__message">{error}</div>}
            </form>

            <p>
                Have an account? <Link to="/login">Log in</Link>
            </p>
        </main>
    );
}




export default Signup;