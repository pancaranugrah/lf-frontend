// import logo from './logo.svg';
import "./App.css";
// import { Button } from 'react-bootstrap';
// import Header from './Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import { useParams } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Protected from "./Protected";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts";
import ProductsList from "./ProductsList";
import Wikipedia from "./Wikipedia";
import Api from "./Api";
import Home from "./Home";
import ShowProducts from "./ShowProducts";
import UserList from "./UserList";

function App() {
  function ProfilePage() {
    // Get the userId param from the URL.
    let { id } = useParams();
    // ...
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/add" element={<Protected Cmp={AddProducts} />}></Route>
          <Route
            path="/update/:id"
            element={<Protected Cmp={UpdateProducts} />}
          ></Route>
          <Route path="/" element={<Protected Cmp={ShowProducts} />}></Route>
          <Route
            path="/wikipedia"
            element={<Protected Cmp={Wikipedia} />}
          ></Route>
          <Route path="/api" element={<Protected Cmp={Api} />}></Route>
          <Route path="/home" element={<Protected Cmp={Home} />}></Route>
          <Route
            path="/userlist"
            element={<Protected Cmp={UserList} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
