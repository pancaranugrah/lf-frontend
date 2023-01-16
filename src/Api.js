import Header from "./Header";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Api() {
  const url = "https://fakestoreapi.com/products";
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = async () => {
    const respon = await fetch(url);
    const dataProduct = await respon.json();
    setProduct(dataProduct);
    // console.log(dataProduct);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <h1>Api</h1>
          {product.map((pro) => (
            <div className="col-3">
              <CardProducts
                key={pro.id}
                title={pro.title}
                price={pro.price}
                description={pro.description}
                image={pro.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function CardProducts(props) {
    return (
      <Card>
        <Card.Img variant="top" src={props.image} style={{ height: "auto" }} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Price : ${props.price}
          </Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Api;
