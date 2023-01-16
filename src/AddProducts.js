import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddProducts() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function addProduct() {
    console.warn(name, file, price, description);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("price", price);
    formData.append("description", description);
    let result = await fetch("http://127.0.0.1:8000/api/addpro", {
      method: "POST",
      body: formData,
    });
    alert("Product added!");
    navigate("/");
  }

  return (
    <div>
      <Header />
      <h1>Add Products</h1>
      <Form className="col-sm-6 offset-sm-3">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            // value={email}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name Product"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            // value={file}
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="File"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            // value={password}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ height: "100px" }}
          />
        </Form.Group>
        <Button variant="primary" onClick={addProduct}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddProducts;
