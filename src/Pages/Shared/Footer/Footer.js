import React from "react";
import "./Footer.css";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const ContactUs = () => {
  return (
    <footer className="footer-section">
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="copyright-text ">
              <p className=" text-center">
                <div className="d-flex justify-content-center align-items-center mb-1 gap-2 ">
                  <FaFacebook />
                  <FaLinkedin />
                  <FaTwitter />
                  <FaYoutube />
                </div>
                <div>Copyright &copy; 2022, All Right Reserved</div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactUs;
