import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-alpha.vercel.app/buyers"
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteBuyer = (id) => {
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
          toast.success("Buyer Deleted successfully");
        }
      });
  };
  return (
    <div>
      <h2 className="text-center">Buyers: {buyers?.length} </h2>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>Email</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {buyers?.length &&
              buyers.map((buyer, i) => (
                <tr key={buyer._id}>
                  <td>{i + 1}</td>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>

                  <td>
                    <button
                      onClick={() => handleDeleteBuyer(buyer._id)}
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

export default AllUsers;
