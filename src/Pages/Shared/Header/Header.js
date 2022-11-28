import React, { useContext } from "react";
import "./Header.css";
import { Button, Image, InputGroup, Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="https://www.pngall.com/wp-content/uploads/12/Bike-PNG-Clipart.png"
            width="85"
            height="30"
            className="d-inline-block align-top me-1  "
          />
          <div className="title-div">
            <p className="title">
              <span class="title-word one title-word-1">Bike </span>

              <span class="title-word title-word-2">Bazaar.com</span>
            </p>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className=" mx-auto d-flex justify-content-evenly align-items-center text-decoration-none ">
            <Link
              className="text-decoration-none me-2 mb-1 text-light btn btn-outline-danger"
              to="/home"
            >
              Home
            </Link>

            <Link
              className=" btn btn-outline-danger mb-1 text-decoration-none me-2 text-light "
              to="/blog"
            >
              Blog
            </Link>

            {user?.uid && (
              <Link
                className="text-decoration-none mb-1 me-2 text-light btn btn-outline-danger"
                to="/dashboard"
              >
                Dashboard
              </Link>
            )}
          </Nav>
          <Nav>
            <>
              {user?.uid ? (
                <>
                  <>
                    {user?.photoURL ? (
                      <Image
                        title={user?.displayName}
                        style={{ height: "40px", width: "40px" }}
                        className="me-4 mt-2 mb-2"
                        roundedCircle
                        src={user?.photoURL}
                      ></Image>
                    ) : (
                      <FaUser
                        title={user?.displayName}
                        className="text-info fs-2 me-4 mt-2 mb-2"
                      ></FaUser>
                    )}
                  </>

                  <Link className="btn btn-light m-2" onClick={handleLogOut}>
                    Log out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-info fw-bold m-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-outline-info fw-bold m-2"
                  >
                    Registration
                  </Link>
                </>
              )}
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
