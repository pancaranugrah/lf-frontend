import Header from "./Header";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Search() {
  const [data, setData] = useState([]);

  async function search(key) {
    console.warn(key);
    let result = await fetch("http://127.0.0.1:8000/api/search/" + key, {
      method: "GET",
    });
    result = await result.json();
    setData(result);
  }
  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>wikipedia</h1>
        <Form.Control
          type="text"
          // value={email}
          onChange={(e) => search(e.target.value)}
          placeholder="Type here to Search Products"
        />
        <hr />
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Search;
