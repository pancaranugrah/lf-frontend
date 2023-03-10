import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductsList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const list = () => {
      getData();
    };
    list();
  }, []);
  console.warn("result", data);

  async function deleteOperation(id) {
    if (
      window.confirm(
        "Are you sure you want to delete product with id " + id + "?"
      )
    ) {
      let result = await fetch("http://127.0.0.1:8000/api/del/" + id, {
        method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      getData();
      alert("Product has been deleted!");
    } else {
      getData();
    }
  }

  async function getData() {
    let result = await fetch("http://127.0.0.1:8000/api/listpro");
    result = await result.json();
    setData(result);
  }

  async function search(key) {
    if (key == "") {
      getData();
    } else {
      console.log(key);
      let result = await fetch(
        "http://127.0.0.1:8000/api/searchuser/" + key,
        {
          method: "GET",
        },
        []
      );
      result = await result.json();
      setData(result);
    }
  }

  // async function updateOperation(id) {
  //   if (data.map((item) => item.id) == id) {
  //     let idpro = id;
  //     console.warn(idpro);
  //   }
  //   navigate("/update/" + id);
  // }

  return (
    <div>
      <Header />
      <h1>Products List</h1>
      <div className="container">
        <Form.Control
          type="text"
          // value={email}
          onChange={(e) => search(e.target.value)}
          placeholder="Type here to Search Products"
        />
        <hr />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{ width: 100 }}
                    src={"http://127.0.0.1:8000/" + item.file_path}
                  ></img>
                </td>
                <td>
                  <span
                    className="btnDelete"
                    onClick={() => deleteOperation(item.id)}
                  >
                    Delete
                  </span>
                  <Link to={"update/" + item.id} state={{}}>
                    <span className="btnUpdate">Update</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="row">
          {data.map((item) => (
            <div className="col-3">
              <CardProducts
                id={item.id}
                title={item.name}
                price={item.price}
                description={item.description}
                image={item.file_path}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function CardProducts(props) {
    return (
      <>
        {["Dark"].map((Variant) => (
          <Card
            bg={Variant.toLowerCase()}
            key={Variant}
            text={Variant.toLowerCase() === "light" ? "dark" : "white"}
            className="mb-2"
          >
            <Card.Header>Price : Rp.{props.price}</Card.Header>
            <Card.Img
              variant="top"
              src={"http://127.0.0.1:8000/" + props.image}
              style={{ height: "auto" }}
            />
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>{props.description}</Card.Text>
              <span
                className="btnDelete"
                onClick={() => deleteOperation(props.id)}
              >
                Delete
              </span>
              <Link to={"update/" + props.id} state={{}}>
                <span className="btnUpdate">Update</span>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
}

export default ProductsList;
