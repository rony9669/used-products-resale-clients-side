import React, { useContext, useState } from "react";
import "./Register.css";
import { Button, Image } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import useTitle from "../../../Hooks/useTitle";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  // useTitle("Register");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        setError("");
        form.reset();
        handleUpdateUserProfile(name, photoURL);
        saveUser(name, email, role);

        toast.success(" SignUp successful !!! Go to login page for login.");
      })
      .catch((error) => {
        // console.error(e);
        setError(error.message);
      });
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };

    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => {
        setError(error.message);
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
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Sign Up</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control
                      name="photoURL"
                      type="text"
                      placeholder="Photo URL"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Form.Label></Form.Label>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Seller"
                        name="role"
                        value="Seller"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Buyer"
                        name="role"
                        value="Buyer"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>
                  ))}
                  <div>
                    <Button variant="primary" type="submit">
                      Sign Up
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
                  <Form.Text className="text-danger">{error}</Form.Text>
                </Form>
                <div className="text-center text-lg-start mt-3  mb-2">
                  <p className="small fw-bold mb-0 me-1">
                    Do you have an account?
                    <Link to="/login" className="ms-1 btn btn-outline-danger">
                      Login
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

export default Register;
