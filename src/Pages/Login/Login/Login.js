import React, { useContext, useState } from "react";
import "./Login.css";
import { Button, Image } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useTitle from "../../../Hooks/useTitle";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn, setLoading, providerLogin, setUser } =
    useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // useTitle("Login");

  const from = location.state?.from?.pathname || "/";

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const role = "Buyer";
        const currentUser = {
          email: user.email,
        };

        //! get jwt token
        fetch("https://assignment-12-server-alpha.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            // local storage is the easiest but not the best place to store jwt token
            localStorage.setItem("bike-token", data.token);
            toast.success("Login Successful!");
            setUser(user);
            saveUser(name, email, role);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;

        const currentUser = {
          email: user.email,
        };

        // get jwt token
        fetch("https://assignment-12-server-alpha.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            // local storage is the easiest but not the best place to store jwt token
            localStorage.setItem("bike-token", data.token);
            toast.success("Login Successful!");
            setUser(user);
            form.reset();
            setError("");
            navigate(from, { replace: true });
          });

        // form.reset();
        // setError("");
        // // navigate(from, { replace: true });
        // if (user) {
        //   toast.success("Login Successful!");
        //   setUser(user);
        //   navigate(from, { replace: true });
        // }
      })
      .catch((error) => {
        // console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveUser = (name, email, role) => {
    const user = { name, email, role };
    fetch("https://assignment-12-server-alpha.vercel.app/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  return (
    <div>
      <div className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <Button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="btn  btn-floating mx-1"
                  >
                    <FaGoogle />
                  </Button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <Form onSubmit={handleSubmitLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <div>
                    <Button
                      // to={handleSubmitLogin}
                      className="mx-auto"
                      variant="primary"
                      type="submit"
                    >
                      Login
                    </Button>
                    <ToastContainer
                      position="top-center"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                  </div>
                  <br />

                  <Form.Text className="text-danger">{error}</Form.Text>
                </Form>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="ms-1 btn btn-outline-success"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
