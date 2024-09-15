import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { useState } from 'react';

const Register = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched" });
  const [existingEmailError, setExistingEmailError] = useState("");

  // Register Function
  const registerSubmit = handleSubmit(async (data) => {
    const response = await axios.get("http://localhost:3001/users");
    const existingUser = response.data.find(user => user.email === data.email);
    if (existingUser) {
      setExistingEmailError("Email already exists");
    } else {
      setExistingEmailError("");
      await axios.post("http://localhost:3001/users", data).then(() => navigate("/login"));
    }
  });

  return (
    <section className="Register">
      <div className="container">
        <div className="login-root">


          {/* Animated Background */}
          <div className="box-root flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: 1 }}>
            <div className="loginbackground box-background--white padding-top--64">
              <div className="loginbackground-gridContainer">
                <div className="box-root flex-flex" style={{ gridArea: "top / start / 8 / end" }}>
                  <div className="box-root" style={{ backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)", flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
                  <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
                </div>
                <div className="box-root flex-flex" style={{ gridArea: "6 / start / auto / 2" }}>
                  <div className="box-root box-background--blue800" style={{ flexGrow: 1 }}></div>
                </div>
              </div>
            </div>


            {/* Project Title */}
            <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
              <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center" style={{ marginTop: "30px" }}>
                <h3><Link to={"/"} style={{ textDecoration: "none" }}>Courses Management</Link></h3>
              </div>
              <div className="formbg-outer">
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    {/* Register Title */}
                    <span className="padding-bottom--15">Register New Account</span>
                    <form onSubmit={registerSubmit}>


                      {/* Email */}
                      <div className="field padding-bottom--24">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          placeholder="Enter Your Email"
                          className={errors.email?.message || existingEmailError ? "border border-danger" : null}
                          {...register("email", {
                            required: "Email Is Required!",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Please Enter Correct Format",
                            },
                          })}
                        />
                        {errors.email?.message && (<Form.Text style={{display: 'block'}} className="text-danger">{errors.email?.message}</Form.Text>)}
                        {existingEmailError && (<Form.Text className="text-danger">{existingEmailError}</Form.Text>)}
                      </div>


                      {/* Name */}
                      <div className="field padding-bottom--24" style={{ marginTop: "20px" }}>
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          placeholder="Enter Your Name"
                          className={errors.name?.message ? "border border-danger" : null}
                          {...register("name", {
                            required: "Name Is Required!",
                            minLength: { value: 3, message: "Name Should Be More Than 2 Characters" },
                            maxLength: { value: 60, message: "Name Should Be Equal Or Less Than 60 Characters" }
                          })}
                        />
                      </div>
                      {errors.name?.message && (
                        <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
                      )}


                      {/* Age */}
                      <div className="field padding-bottom--24" style={{ marginTop: "20px" }}>
                        <label htmlFor="age">Age</label>
                        <input
                          type="number"
                          placeholder="Enter Your Age"
                          className={errors.age?.message ? "border border-danger" : null}
                          {...register("age", {
                            required: "Age Is Required",
                            min: { value: 18, message: "Age Must Be 18 Or Higher" },
                          })}
                        />
                      </div>
                      {errors.age?.message && (
                        <Form.Text className="text-danger">{errors.age?.message}</Form.Text>
                      )}


                      {/* Password */}
                      <div className="field padding-bottom--24" style={{ marginTop: "20px" }}>
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Enter Your Password"
                          className={errors.password?.message ? "border border-danger" : null}
                          {...register("password", {
                            required: "Password Is Required",
                            minLength: { value: 5, message: "Password Should Be More Than 5 Characters" },
                            maxLength: { value: 20, message: "Password Should Be Equal Or Less Than 20 Characters" },
                          })}
                        />
                      </div>
                      {errors.password?.message && (
                        <Form.Text className="text-danger">{errors.password?.message}</Form.Text>
                      )}


                      {/* Submit */}
                      <div className="field padding-bottom--24" style={{ marginTop: "20px" }}>
                        <input type="submit" value="REGISTER" />
                      </div>


                      {/* login */}
                      <div className="footer-link padding-top--24">
                        <span>Already have an account? <Link to={"/login"}>Login</Link></span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
