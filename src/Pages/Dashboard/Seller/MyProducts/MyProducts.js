import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  // const { email } = user;
  const url = `https://assignment-12-server-alpha.vercel.app/allbikes/myproduct?email=${user?.email}`;
  //!useQuery-1
  const {
    data: myProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  //!advertise
  const handleAdvertisement = (id) => {
    fetch(`https://assignment-12-server-alpha.vercel.app/allbikes/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Advertise successfully.");
          refetch();
        }
      });
  };

  //!handle delete
  const handleDeleteProduct = (id) => {
    fetch(`https://assignment-12-server-alpha.vercel.app/allbikes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Product Deleted successfully");
        }
      });
  };

  return (
    <div>
      <h2 className="text-center mt-1 ">
        You Added {myProducts?.length} Products
      </h2>
      {myProducts?.length > 0 && (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>NO.</th>
                <th>Products Name</th>
                <th>Price</th>
                <th>Product Status</th>
                <th>Advertisement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myProducts &&
                myProducts.map((product, i) => (
                  <tr key={product._id}>
                    <td>{i + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.salePrice}</td>
                    <td>{product.status}</td>
                    <td>
                      {product?.status === "available" ? (
                        <>
                          {product?.advertise !== "on" ? (
                            <button
                              onClick={() => handleAdvertisement(product._id)}
                              className="btn btn-sm btn-primary"
                            >
                              On
                            </button>
                          ) : (
                            <p>Advertised</p>
                          )}
                        </>
                      ) : (
                        <p>N/A</p>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
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

export default MyProducts;
