import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";

const AllSellers = () => {
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-alpha.vercel.app/sellers"
      );
      const data = await res.json();
      return data;
    },
  });

  const handleVerify = (id, email) => {
    fetch(`https://assignment-12-server-alpha.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetch(
            `https://assignment-12-server-alpha.vercel.app/users/update?email=${email}`,
            {
              method: "PUT",
              headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                toast.success("Verified successfully.");
                refetch();
              }
            });
        }
      });
  };

  const handleDeleteSeller = (id) => {
    fetch(`https://assignment-12-server-alpha.vercel.app/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Seller Deleted successfully");
        }
      });
  };

  return (
    <div>
      <h2 className="text-center">Sellers: {sellers?.length} </h2>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Verify </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.length &&
              sellers.map((seller, i) => (
                <tr key={seller._id}>
                  <td>{i + 1}</td>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>

                  <td>
                    {!seller?.status ? (
                      <button
                        onClick={() => handleVerify(seller._id, seller.email)}
                        className="btn  btn-primary"
                      >
                        Verify
                      </button>
                    ) : (
                      <p className="text-success fw-bold">Verified</p>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteSeller(seller._id)}
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
    </div>
  );
};

export default AllSellers;
