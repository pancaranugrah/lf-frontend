import Header from "./Header";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function UpdateProducts(props) {
  // console.warn("props", props);
  // const tai = props;
  // console.warn("props", tai);
  // console.warn("props", props.match.params.id);
  // console.log(location, "useLocation Hook");
  // const data = location.state?.data;

  const location = useLocation();
  const params = useParams();
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [fileold, setFileOld] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  console.log("props", params.id);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    const list = async () => {
      let result = await fetch("http://127.0.0.1:8000/api/getpro/" + params.id);
      result = await result.json();
      setData(result);
      setName(result.name);
      setPrice(result.price);
      setDescription(result.description);
      setFile(result.file);
      setFileOld(result.fileold);
    };
    list();
  }, []);

  async function editProduct(id) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("fileold", fileold);
    formData.append("price", price);
    formData.append("description", description);
    let result = await fetch(
      "http://127.0.0.1:8000/api/updatepro/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    alert("Product has been update!");
    navigate("/");
  }

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        {/* <h1>{params.id}</h1> */}
        <h1>Update Product</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              defaultValue={data.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              defaultValue={data.file_path}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              src={"http://127.0.0.1:8000/" + data.file_path}
              style={{ width: 100 }}
            />
            <input
              type="hidden"
              defaultValue={data.file_path}
              onChange={(e) => setFileOld(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              defaultValue={data.price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              defaultValue={data.description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: "100px" }}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => editProduct(data.id)}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProducts;
