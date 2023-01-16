import Header from "./Header";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Wikipedia() {
  const [data, setData] = useState([]);

  async function search(key) {
    console.warn(key);
    let result = await fetch(
      "https://id.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" +
        key,
      {
        method: "GET",
      }
    );
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
          placeholder="Search on Wikipedia Indonesia"
        />
        <hr />
      </div>
    </div>
  );
}

export default Wikipedia;
