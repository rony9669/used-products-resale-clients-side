import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ViewAllProduct from "../ViewAllProducts/ViewAllProduct";
import ViewAllProductsModal from "../ViewAllProducts/ViewAllProductsModal";

const AdvertiseProduct = () => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { data: products = [] } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-alpha.vercel.app/allbikes"
      );
      const data = await res.json();
      return data;
    },
  });
  //   console.log(products);

  return (
    <div className="mt-5 mb-3">
      {products?.length > 0 && (
        <h3 className="text-center text-danger mb-2">Product </h3>
      )}

      <div className="card-grid">
        {products?.length > 0 &&
          products.map(
            (product) =>
              !product.paid && (
                <ViewAllProduct
                  key={product._id}
                  product={product}
                  setProduct={setProduct}
                  handleShow={handleShow}
                ></ViewAllProduct>
              )
          )}
      </div>
      {product && (
        <ViewAllProductsModal
          handleClose={handleClose}
          show={show}
          product={product}
        ></ViewAllProductsModal>
      )}
    </div>
  );
};

export default AdvertiseProduct;
