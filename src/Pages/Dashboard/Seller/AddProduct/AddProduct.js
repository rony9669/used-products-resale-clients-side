import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //!image host key
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  console.log(imageHostKey);
  //!date and time
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const time = current.toLocaleTimeString("en-US");
  const status = "available";

  //!add products
  const handleAddProduct = (event) => {
    event.preventDefault();
    const form = event.target;

    const productName = form.productName.value;
    const email = user.email;
    const salePrice = form.salePrice.value;
    const originalPrice = form.originalPrice.value;
    const usedTime = form.usedTime.value;
    const purchaseTime = form.purchaseTime.value;
    const condition = form.condition.value;
    const sellerName = form.sellerName.value;
    const contactNumber = form.number.value;
    const location = form.location.value;
    const name = form.group1.value;
    // console.log(
    //   productName,
    //   salePrice,
    //   originalPrice,
    //   usedTime,
    //   condition,
    //   sellerName,
    //   contactNumber,
    //   location,
    //   category,
    //   date,
    //   time
    // );
    const image = form.image.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData);
        if (imageData.success) {
          console.log(imageData.data.url);
          const product = {
            productName,
            email,
            salePrice,
            originalPrice,
            purchaseTime,
            usedTime,
            condition,
            sellerName,
            contactNumber,
            location,
            name,
            date,
            time,
            status,

            image: imageData.data.url,
          };
          console.log(product);

          //save doctor information to the database
          fetch("https://assignment-12-server-alpha.vercel.app/allbikes", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success("Product is added successfully");
              navigate("/dashboard/myproducts");
            });
        }
      });
  };
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <h2 className="text-primary text-center">Add A Product</h2>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="productName"
                type="text"
                placeholder="Enter Product Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Resale Price</Form.Label>
              <Form.Control
                name="salePrice"
                type="number"
                placeholder="Resale Price"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Original Price</Form.Label>
              <Form.Control
                name="originalPrice"
                type="number"
                placeholder="Original Price"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Year of Purchase</Form.Label>
              <Form.Control
                name="purchaseTime"
                type="number"
                placeholder="Year of Purchase"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Year of Use</Form.Label>
              <Form.Control
                name="usedTime"
                type="number"
                placeholder="Year of Use"
                required
              />
            </Form.Group>
            <Form.Label>product Condition</Form.Label>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Excellent"
                  name="condition"
                  value="Excellent"
                  type={type}
                  id={`inline-${type}-1`}
                  required
                />
                <Form.Check
                  inline
                  label="Good"
                  name="condition"
                  value="Good"
                  type={type}
                  id={`inline-${type}-2`}
                  required
                />
                <Form.Check
                  inline
                  label="Fair"
                  name="condition"
                  value="Fair"
                  type={type}
                  id={`inline-${type}-3`}
                  required
                />
              </div>
            ))}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Seller Name</Form.Label>
              <Form.Control
                name="sellerName"
                type="text"
                placeholder="Seller Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                name="number"
                type="number"
                placeholder="Contact Number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                type="text"
                placeholder="Location"
                required
              />
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload Product Image</Form.Label>
              <Form.Control name="image" type="file" size="sm" required />
            </Form.Group>

            <Form.Label>Please Select a product category</Form.Label>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yamaha"
                  name="group1"
                  value="Yamaha"
                  type={type}
                  id={`inline-${type}-1`}
                  required
                />
                <Form.Check
                  inline
                  label="Suzuki"
                  name="group1"
                  value="Suzuki"
                  type={type}
                  id={`inline-${type}-2`}
                  required
                />
                <Form.Check
                  inline
                  label="TVS"
                  name="group1"
                  value="TVS"
                  type={type}
                  id={`inline-${type}-3`}
                  required
                />
              </div>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
