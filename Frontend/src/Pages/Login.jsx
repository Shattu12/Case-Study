import React, { useState } from 'react'

const Login = () => {
    const [User, setUser] = useState({
        userEmail: "",
        userPassword: ""
    });

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
        fetch('http://localhost:8093/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(User),
        })
            .then(response => response.status == 200 ? response.json() : response)
            .then(data => {
                //console.log(data.json());
                if (data.status == "400") {
                    //console.log('Success:', { data });
                    setUser({
                        userEmail: "",
                        userPassword: ""
                    });
                    alert("Email or Password is incorrect");
                } else {
                    console.log({ data });
                    localStorage.setItem("profile", JSON.stringify(data));
                    window.location.href = "/home";
                }
                //localStorage.setItem("profile", JSON.stringify(data));
                //window.location.href = "/home";
            })
            .catch((error) => {
                console.error('Error:', { error });
            });
    }
    return (
        <div className='container auth'>
            <div className='card m-5'>
                <div className="card-body text-center"><h2>Login &nbsp;<i class="bi bi-unlock"></i></h2></div>
                <div className="card-body">
                    <form onSubmit={formSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="userEmail" name='userEmail' required value={User.userEmail} onChange={InputEvent} />
                            <label for="userEmail">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="userPassword" name='userPassword' required value={User.userPassword} onChange={InputEvent} />
                            <label for="userPassword">Password</label>
                        </div>
                        <div className="col-12 mt-2">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
