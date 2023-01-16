import Header from "./Header";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Wikipedia() {
  const url =
    "https://id.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=raffi";
  const [search, setSearch] = useState([]);

  useEffect(() => {
    retrieveSearch();
  }, []);
  const retrieveSearch = async () => {
    try {
      const data = await fetch(url);
      // console.log(data, "<<== response search");
      const wiki = await data.json();
      setSearch(wiki);
    } catch (error) {
      console.log(error, "<== error retrieve search");
    }
  };
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <h1>wikipedia</h1>
          {/* <Form.Control
          type="text"
          // value={email}
          onChange={(e) => search(e.target.value)}
          placeholder="Search on Wikipedia Indonesia"
        /> */}
          <hr />
          {search.map((sea) => (
            <div className="col-3">
              <CardProducts title={sea.title} snippet={sea.snippet} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function CardProducts(props) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.snippet}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Wikipedia;
