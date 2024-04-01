import "./Signup.scss";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../consts";


function Signup() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    //validate full_name email and password
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProfile =
        {
            full_name: event.target.full_name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            age: isNaN(Number(event.target.age.value)) ? 0 :Number(event.target.age.value) ,
            gender: event.target.gender.value,
            preexistingConditions: event.target.preexistingConditions.value,
        }
        console.log("email", newProfile)

        try {


            await axios.post(`${baseUrl}users/register`, newProfile);
            setSuccess(true);
            setError(null);
            event.target.reset();
        } catch (error) {
            setSuccess(false);
            setError(error.response.data);
        }
    };

    return (
        <main className="signup-page">
            <form className="signup" onSubmit={handleSubmit}>
                <h1 className="signup__title">Sign up</h1>
                {/* Expected body: { full_name, email, age, gender, password, preexisting_conditions } */}

                <InputField type="text" name="full_name" label="Full name" other="*" />

                <InputField type="text" name="email" label="Email" other="*" />
                <InputField type="password" name="password" label="Password" other="*" />

                <InputField type="text" name="age" label="Age" />
                <InputField type="text" name="gender" label="Gender" />
                <InputField type="text" name="preexistingConditions" label="Pre-existing Conditions" />

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