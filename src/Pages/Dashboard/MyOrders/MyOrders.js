import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import useBuyer from "../../../Hooks/useBuyer";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);

  const baseURL = `https://assignment-12-server-alpha.vercel.app/bookings?email=${user?.email}`;

  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setBookings(response.data);
    });
  }, [baseURL]);
  // console.log(bookings);

  return (
    isBuyer && (
      <div>
        <h2 className="text-center">You have {bookings?.length} </h2>
        {bookings?.length > 0 && (
          <div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Image</th>
                  <th>Products Name</th>
                  <th>Price</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.length &&
                  bookings.map((booking, i) => (
                    <tr key={booking._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          src={booking.image}
                          className="rounded-3"
                          style={{ width: "100px" }}
                          alt="Avatar"
                        />
                      </td>
                      <td>{booking.productName}</td>
                      <td>{booking.salePrice}</td>

                      <td>
                        {booking.salePrice && !booking.paid && (
                          <Link to={`/dashboard/payment/${booking._id}`}>
                            <button className="btn btn-primary">Pay</button>
                          </Link>
                        )}
                        {booking.salePrice && booking.paid && (
                          <span className="text-success fw-bold">Paid</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    )
  );
};

export default MyOrders;
