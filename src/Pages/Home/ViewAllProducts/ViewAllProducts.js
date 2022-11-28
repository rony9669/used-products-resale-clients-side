import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import ViewAllProduct from "./ViewAllProduct";

// import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import ViewAllProductsModal from "./ViewAllProductsModal";

const ViewAllProducts = () => {
  const products = useLoaderData();
  // const { user } = useContext(AuthContext);
  // console.log(user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [product, setProduct] = useState(null);

  return (
    <Container className="mt-3 mb-5">
      <Row>
        <div className="card-grid">
          {products.map((product) => (
            <ViewAllProduct
              key={product._id}
              product={product}
              setProduct={setProduct}
              handleShow={handleShow}
            ></ViewAllProduct>
          ))}
        </div>
        {product && (
          <ViewAllProductsModal
            handleClose={handleClose}
            show={show}
            product={product}
          ></ViewAllProductsModal>
        )}
      </Row>
    </Container>
  );
};

export default ViewAllProducts;
