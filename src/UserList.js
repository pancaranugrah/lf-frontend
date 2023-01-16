import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function UserList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const list = () => {
      getData();
    };
    list();
  }, []);
  console.warn("result", data);

  async function getData() {
    let result = await fetch("http://127.0.0.1:8000/api/userlist");
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

  return (
    <div>
      <Header />
      <h1>User List</h1>
      <div className="container">
        <Form.Control
          type="text"
          onChange={(e) => search(e.target.value)}
          placeholder="Type here to Search User"
        />
        <hr />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserList;
