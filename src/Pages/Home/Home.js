import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "./Home.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Footer from "../Shared/Footer/Footer";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { PhotoProvider, PhotoView } from "react-photo-view";
import useTitle from "../../Hooks/useTitle";
import CarouselHome from "./CarouselHome";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import AdvertiseProduct from "./AdvertiseProduct/AdvertiseProduct";

const Home = () => {
  // const services = useLoaderData();
  const [categories, setCategories] = useState([]);
  // useTitle("Home");
  useEffect(() => {
    fetch("https://assignment-12-server-alpha.vercel.app/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <Container className="mt-2">
      <Row>
        <CarouselHome></CarouselHome>

        <h2 className="text-danger text-center  mt-5 mb-3">Our Products</h2>
        <div className="card-grid">
          {categories.map((category) => (
            <Card key={category._id}>
              <PhotoProvider>
                <PhotoView src={category.img}>
                  <Card.Img
                    variant="top"
                    style={{ height: 200 }}
                    src={category.img}
                  />
                </PhotoView>
              </PhotoProvider>

              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>
                  {category.description.length > 100
                    ? category.description.slice(1, 100) + "..."
                    : category.description}
                </Card.Text>
                <Link
                  className="text-center"
                  to={`/categoryDetails/${category.name}`}
                >
                  <Button variant="outline-info">View All Products</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div>
          <AdvertiseProduct></AdvertiseProduct>
        </div>

        <div className="mt-0">
          <AboutUs></AboutUs>
        </div>

        <div>
          <ContactUs></ContactUs>
        </div>

        <Footer></Footer>
      </Row>
    </Container>
  );
};

export default Home;
