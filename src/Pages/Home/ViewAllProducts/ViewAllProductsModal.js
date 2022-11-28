import React, { useContext } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const ViewAllProductsModal = ({ handleClose, show, product }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { email, displayName } = user;
  const { productName, salePrice, image, _id } = product;

  //!handle booking
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productName.value;
    const email = form.email.value;
    const contactNumber = form.number.value;
    const meetingLocation = form.location.value;
    const producId = _id;
    // console.log(productName, email, contactNumber, meetingLocation);
    const booking = {
      productName,
      email,
      contactNumber,
      meetingLocation,
      image,
      salePrice,
      producId,
    };
    fetch("https://assignment-12-server-alpha.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          // setTreatment(null);
          toast.success("Booking confirmed");
          // refetch();
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <Container>
      <Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div>
              <Form onSubmit={handleBooking}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    name="productName"
                    type="text"
                    value={productName}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    name="salePrice"
                    type="number"
                    value={salePrice}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={displayName}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Year Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={email}
                    readOnly
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
                  <Form.Label>Meeting Location</Form.Label>
                  <Form.Control
                    name="location"
                    type="text"
                    placeholder="Location"
                    required
                  />
                </Form.Group>

                <Button variant="primary" className="me-2" type="submit">
                  Submit
                </Button>
                <Button onClick={handleClose} variant="secondary">
                  Close
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
};

export default ViewAllProductsModal;
