import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log("Resister click!", email, password, terms);
    // const length6Pattern = /^.{6,}$/;
    // const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    // const specialCharPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    // if (!length6Pattern.test(password)) {
    //   console.log("password didnt match")
    //   setError("Password must be 6 character or longer")
    //   return;
    // } else if (!casePattern.test(password)) {
    //   setError("Password must have at least one uppercase and one lowercase character.")
    //   return;
    // } else if (!specialCharPattern.test(password)) {
    //   setError("Password must include at least one special character (e.g., !@#$%^&*).")
    //   return;
    // }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    // reset error
    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Please accept our terms and conditions");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("After creation of a new user", result.user);
        setSuccess(true);
        e.target.reset();
        // send verification email
        sendEmailVerification(result.user)
          .then(() => {
          alert("Please login to your email and verifacition email address")
        })
      })
      .catch((error) => {
        console.log("error happend", error.message);
        setError(error.message);
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    placeholder="Email"
                  />
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input"
                      placeholder="Password"
                    />
                    <button
                      onClick={handleTogglePasswordShow}
                      className="btn btn-xs top-2 right-5 absolute"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  <div>
                    <label className="label">
                      <input
                        type="checkbox"
                        name="terms"
                        className="checkbox"
                      />
                      Accept Our Terms and Condition
                    </label>
                  </div>
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                {success && (
                  <p className="text-green-500">Account created successfully</p>
                )}
                {error && <p className="text-red-500">{error}</p>}
              </form>
              <p>
                Already have an account? Please{" "}
                <Link to="/login" className="text-blue-600 underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
