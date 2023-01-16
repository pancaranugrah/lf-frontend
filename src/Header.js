import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    navigate("/login");
  }
  console.warn(user);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>LifeTech</Navbar.Brand>
          {localStorage.getItem("user-info") ? (
            <>
              <Nav className="me-auto navbar_wrapper">
                <Link className="navbar_link" to="/">
                  Products
                </Link>
                <Link className="navbar_link" to="/add">
                  Add Products
                </Link>
              </Nav>
              <Nav>
                <NavDropdown title={user && user.name}>
                  <NavDropdown.ItemText onClick={logOut}>
                    Logout
                  </NavDropdown.ItemText>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="d-flex navbar_wrapper">
                <Link className="navbar_link" to="/login">
                  Login
                </Link>
                <Link className="navbar_link" to="/register">
                  Register
                </Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
