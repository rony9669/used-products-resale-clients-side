import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import useBuyer from "../Hooks/useBuyer";
import useOwner from "../Hooks/useOwner.js";
import useSeller from "../Hooks/useSeller";
import Header from "../Pages/Shared/Header/Header";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useOwner(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  // console.log(isAdmin);
  console.log(isBuyer);

  // useEffect(() => {
  // console.log(isSeller);
  // }, [isSeller]);
  // useEffect(() => {
  //   console.log(isBuyer);
  // }, [isBuyer]);
  return (
    <div>
      <Header></Header>
      <Container>
        <Row className="mt-3">
          <div className="">
            <div>
              <ul>
                {isBuyer && (
                  <>
                    {" "}
                    <li>
                      <Link
                        className="btn btn-outline-info fw-bold"
                        to="/dashboard"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn btn-outline-info  fw-bold mt-2"
                        to="/dashboard/wishlist"
                      >
                        My Wishlist
                      </Link>
                    </li>
                  </>
                )}
                {isSeller && (
                  <>
                    {" "}
                    <li>
                      <Link
                        className="btn btn-outline-info fw-bold"
                        to="/dashboard/myproducts"
                      >
                        My Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn btn-outline-info  fw-bold mt-2"
                        to="/dashboard/addproducts"
                      >
                        Add a Product
                      </Link>
                    </li>{" "}
                  </>
                )}
                {isAdmin && (
                  <>
                    {" "}
                    <li>
                      <Link
                        className="btn btn-outline-info fw-bold"
                        to="/dashboard/allsellers"
                      >
                        All Sellers
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn btn-outline-info  fw-bold mt-2"
                        to="/dashboard/allusers"
                      >
                        All Buyers
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <Outlet></Outlet>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DashBoardLayout;
