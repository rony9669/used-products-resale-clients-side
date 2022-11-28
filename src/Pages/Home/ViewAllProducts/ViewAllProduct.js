import React, { useContext } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const ViewAllProduct = ({ product, handleShow, setProduct }) => {
  const { user } = useContext(AuthContext);
  const handleLoginToast = () => {
    toast.error("Please Login for Booking");
  };

  const handleWishlist = () => {
    const productName = product.productName;
    const email = user?.email;
    const salePrice = product.salePrice;
    const image = product.image;
    const productId = product._id;
    // console.log(productName, email, salePrice);
    const wishlist = {
      productName,
      email,
      salePrice,
      image,
      productId,
    };
    fetch("https://assignment-12-server-alpha.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishlist),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          // setTreatment(null);
          toast.success("Added to wishlist");
          // refetch();
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    !product.paid && (
      <Card>
        <PhotoProvider>
          <PhotoView src={product.image}>
            <Card.Img
              variant="top"
              style={{ height: 200 }}
              src={product.image}
            />
          </PhotoView>
        </PhotoProvider>

        <Card.Body>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>
            <p>Location: {product.location} </p>
            <p>Resale Price: {product.salePrice} Taka</p>
            <p>Original Price: {product.originalPrice} Taka </p>
            <p>Condition: {product.condition} </p>
            <p>Years of Use: {product.usedTime} </p>
            <p>Years of Buy: {product.purchaseTime} </p>
            <p>
              Upload Time: {product.date} {product.time}
            </p>
            {product?.verification ? (
              <p>
                Sellers: {product.sellerName}{" "}
                <span className="text-info fs-5">
                  <FaCheckCircle />
                </span>{" "}
              </p>
            ) : (
              <p>Sellers: {product.sellerName} </p>
            )}
            <p>Contact Number: {product.contactNumber} </p>
          </Card.Text>

          {user?.uid ? (
            <>
              <div className="d-flex justify-content-between">
                <Link onClick={handleShow}>
                  <Button
                    onClick={() => setProduct(product)}
                    variant="outline-info"
                  >
                    Book Now
                  </Button>
                </Link>

                <Link>
                  <Button onClick={handleWishlist} variant="outline-danger">
                    Add to Wishlist
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Link onClick={handleLoginToast}>
              <Button variant="outline-info">Book Now</Button>
            </Link>
          )}
        </Card.Body>
      </Card>
    )
  );
};

export default ViewAllProduct;
