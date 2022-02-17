import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [User, setUser] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: ""
    });
    const navigate = useNavigate();
    const InputEvent = (event) => {
        //console.log(event);
        const { name, value } = event.target;
        // console.log(name, value);
        setUser((preVal) => {
            return { ...preVal, [name]: value };
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8093/api/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(User),
        })
            .then(response => response.json())
            .then((data) => {
                console.log('Success:', { data });
                localStorage.setItem("profile", JSON.stringify(data));
                //window.location.href = "/home";
                alert("Registered successfully!!");
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className='container auth'>
            <div className='card m-5'>
                <div className="card-body text-center"><h2>Register &nbsp;<i class="bi bi-person-plus"></i></h2></div>
                <div class="card-body">
                    <form className="row g-3" onSubmit={formSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="userEmail" className="form-label">Email</label>
                            <input type="email" required className="form-control" id="userEmail" name="userEmail" value={User.userEmail} onChange={InputEvent} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="userPassword" className="form-label">Password</label>
                            <input type="password" required className="form-control" id="userPassword" name="userPassword" value={User.userPassword} onChange={InputEvent} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="userName" className="form-label">Name</label>
                            <input type="text" required className="form-control" id="userName" name="userName" value={User.userName} onChange={InputEvent} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="userPhone" className="form-label">Phone</label>
                            <input type="number" required className="form-control" id="userPhone" name="userPhone" value={User.userPhone} onChange={InputEvent} />
                        </div>


                        {/* <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                    </label>
                </div>
            </div> */}
                        <div className="col-12 mt-2">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
