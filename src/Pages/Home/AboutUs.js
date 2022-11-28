import React from "react";
import "./AboutUS.css";
import { AiOutlineSafety } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { TbMotorbike } from "react-icons/tb";

const AboutUs = () => {
  return (
    <div className="feat bg-gray pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="section-head col-sm-12">
            <h4>
              <span>Why Choose </span> Our Services?
            </h4>
            <p>
              We instantly helps you connect with popular and verified
              second hand motorcycle dealers who are known for providing
              customer centric services. Buying a bike from a verified dealer
              ensures smooth transition of the entire sale procedure, good after
              sales services, and purchase of certified bikes that are backed by
              warranty.
            </p>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div className="item">
              {" "}
              <span className="icon feature_box_col_four">
                <TbMotorbike className="delivery" />
              </span>
              <h6>TOP QUALITY</h6>
              <p>
              If you are buying a bike for joy trips in evening or just on weekends you may consider a luxury bike which may give you a high rev powerful engine  the mileage.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item">
              {" "}
              <span className="icon feature_box_col_five">
                <AiOutlineSafety className="delivery" />
              </span>
              <h6>SAFETY</h6>
              <p>
                A second-hand bike is not a bad choice but you should do a
                thorough mechanical check and paper-work as mentioned above
                before buying one. You can end up striking a very good deal for
                a second-hand bike and save yourself a lot of money.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item">
              {" "}
              <span className="icon feature_box_col_six">
                <TbTruckDelivery className="delivery" />
              </span>
              <h6>EASY DELIVERIES</h6>
              <p>
                Our logistic team is ready to offer a flexible delivery service
                while respecting the cold chain, in order to ensure the products
                arrive in optimal conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
