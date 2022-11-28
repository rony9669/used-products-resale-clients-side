import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const baseURL = `https://assignment-12-server-alpha.vercel.app/wishlist?email=${user?.email}`;

  const [wishlists, setWishlists] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setWishlists(response.data);
    });
  }, [baseURL]);
  console.log(wishlists);

  return (
    <div>
      <h2 className="text-center">
        Your wishlist have {wishlists?.length} products{" "}
      </h2>
      {wishlists?.length > 0 && (
        <div>
          <Table striped bordered hover>
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
              {wishlists?.length &&
                wishlists.map((wishlist, i) => (
                  <tr key={wishlist._id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={wishlist.image}
                        className="rounded-3"
                        style={{ width: "100px" }}
                        alt="Avatar"
                      />
                    </td>
                    <td>{wishlist.productName}</td>
                    <td>{wishlist.salePrice}</td>

                    <td>
                      {wishlist.salePrice && !wishlist.paid && (
                        <Link to={`/dashboard/payments/${wishlist._id}`}>
                          <button className="btn btn-primary">Pay</button>
                        </Link>
                      )}
                      {wishlist.salePrice && wishlist.paid && (
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
  );
};

export default MyWishList;
