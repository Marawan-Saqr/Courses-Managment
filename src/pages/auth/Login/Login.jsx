import "./Login.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Login = () => {
  // Component States
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(undefined);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  // Get All Users Function Before Login
  const getAllUsers = async () => {
    await axios
      .get("https://veil-flicker-piano.glitch.me/users")
      .then((response) => setUsers(response.data));
  };

  // Login Function
  const loginSubmit = handleSubmit((data) => {
    const selectUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (!selectUser) {
      setMessage(true);
    } else {
      navigate("/system");
      localStorage.setItem("user-data", JSON.stringify(selectUser));
    }
  });

  // useEffect
  useEffect(() => {
    getAllUsers();
  }, []);

  // User Interface
  return (
    <section className="login">
      {message && (
        <div
          style={{ position: "relative", zIndex: "4000" }}
          className="alert alert-danger"
        >
          Incorrect Email Or Password
        </div>
      )}

      <div className="container">
        <div className="login-root">
          {/* Animated Background */}
          <div
            className="box-root flex-flex flex-direction--column"
            style={{ minHeight: "100vh", flexGrow: 1 }}
          >
            <div className="loginbackground box-background--white padding-top--64">
              <div className="loginbackground-gridContainer">
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "top / start / 8 / end" }}
                >
                  <div
                    className="box-root"
                    style={{
                      backgroundImage:
                        "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                      flexGrow: 1,
                    }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "4 / 2 / auto / 5" }}
                >
                  <div
                    className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "6 / start / auto / 2" }}
                >
                  <div
                    className="box-root box-background--blue800"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "7 / start / auto / 4" }}
                >
                  <div
                    className="box-root box-background--blue animationLeftRight"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "8 / 4 / auto / 6" }}
                >
                  <div
                    className="box-root box-background--gray100 animationLeftRight tans3s"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "2 / 15 / auto / end" }}
                >
                  <div
                    className="box-root box-background--cyan200 animationRightLeft tans4s"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "3 / 14 / auto / end" }}
                >
                  <div
                    className="box-root box-background--blue animationRightLeft"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "4 / 17 / auto / 20" }}
                >
                  <div
                    className="box-root box-background--gray100 animationRightLeft tans4s"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
                <div
                  className="box-root flex-flex"
                  style={{ gridArea: "5 / 14 / auto / 17" }}
                >
                  <div
                    className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                    style={{ flexGrow: 1 }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Project Title */}
            <div
              className="box-root padding-top--24 flex-flex flex-direction--column"
              style={{ flexGrow: 1, zIndex: 9 }}
            >
              <div
                className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center"
                style={{ marginTop: "30px" }}
              >
                <h3>
                  <Link to={"/"} style={{ textDecoration: "none" }}>
                    Welcome To Courses Management
                  </Link>
                </h3>
              </div>
              <div className="formbg-outer">
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    {/* Login Title */}
                    <span className="padding-bottom--15">
                      Login to your account
                    </span>
                    <form onSubmit={loginSubmit}>
                      {/* Email */}
                      <div className="field padding-bottom--24">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          placeholder="Enter Your Email"
                          className={
                            errors.email?.message
                              ? "border border-danger"
                              : null
                          }
                          {...register("email", {
                            required: "Email Is Required!",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Please Enter Correct Format",
                            },
                          })}
                        />
                      </div>
                      <div style={{ marginTop: "-9px" }}>
                        {errors.email?.message && (
                          <Form.Text className="text-danger">
                            {errors.email?.message}
                          </Form.Text>
                        )}
                      </div>

                      {/* Password */}
                      <div
                        className="field padding-bottom--24"
                        style={{ marginTop: "20px" }}
                      >
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Enter Your Password"
                          className={
                            errors.password?.message
                              ? "border border-danger"
                              : null
                          }
                          {...register("password", {
                            required: "Password Is Required",
                            minLength: {
                              value: 5,
                              message:
                                "Password Should Be More Than 5 Characters",
                            },
                            maxLength: {
                              value: 20,
                              message:
                                "Password Should Be Equal Or Less Than 20 Characters",
                            },
                          })}
                        />
                      </div>
                      <div style={{ marginTop: "-9px" }}>
                        {errors.password?.message && (
                          <Form.Text className="text-danger">
                            {errors.password?.message}
                          </Form.Text>
                        )}
                      </div>

                      {/* Submit */}
                      <div
                        className="field padding-bottom--24"
                        style={{ marginTop: "20px" }}
                      >
                        <input type="submit" value="LOGIN" />
                      </div>

                      {/* Sign Up */}
                      <div className="footer-link padding-top--24">
                        <span>
                          Don't have an account?{" "}
                          <Link to={"/register"}>Sign up</Link>
                        </span>
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

export default Login;
