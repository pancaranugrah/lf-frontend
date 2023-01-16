import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  }, []);

  async function logIn() {
    let item = { email, password };
    console.warn(item);
    let result = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    console.warn("result", result);
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/");
  }
  return (
    <div>
      <Header />
      <br />
      <h1>Login</h1>
      <Form className="col-sm-6 offset-sm-3">
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" onClick={logIn}>
          Login
        </Button>
      </Form>

      {/* <br />
            <div className="col-sm-6 offset-sm-3">
                <input type="email" placeholder="Email" className="form-control" />
                <br />
                <input type="password" placeholder="Password" className="form-control" />
            </div> */}
    </div>
  );
}

export default Login;
