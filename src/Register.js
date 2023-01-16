// import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register(){
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    },[]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function register(){
        let item={name,email,password}
        console.warn(item);
        let result = await fetch("http://127.0.0.1:8000/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "content-type":'application/json',
                "accept":"application/json"
            },
        });
        result = await result.json();
        console.warn("result", result);
        localStorage.setItem("user-info",JSON.stringify(result));
        navigate("/add");
    }

    return(
        <div>
        <Header />
        <br />
        <div className="col-sm-6 offset-sm-3">
            <h1>Halaman Register</h1>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="text" 
                    placeholder="Enter name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                     />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                     />
                </Form.Group>
                <Button variant="primary" onClick={register}>
                    Login
                </Button>
            </Form>

            <marquee><h1>ANjing luuuuuuuuu</h1></marquee>
            {/* <input 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                className="form-control" 
                placeholder="Name"
            /><br />
            <input 
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                className="form-control" 
                placeholder="Email"
                /><br />
            <input 
                type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                className="form-control" 
                placeholder="Password"
            /><br />
            <button 
                onClick={register} 
                className='btn btn-primary'>
                    Register
            </button> */}


        </div>
        </div>
    )
}

export default Register