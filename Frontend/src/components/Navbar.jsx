import React from 'react'
import { } from 'react-router-dom'

const Navbar = ({ user, setUser }) => {


    const Logout = () => {
        localStorage.removeItem("profile")
        setUser("");
        window.location.href = "/Login";
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand text-danger" href="/home"><b><i>H&M</i></b></a>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Customer Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">News Letter</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/products">All Products</a>
                        </li>
                        {user && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/AddProduct">Add Product</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Cart"><i class="bi bi-cart4"></i>&nbsp; My Cart</a>
                                </li>
                            </>
                        )}

                    </ul>

                    {user ? (
                        <div class="nav-item dropdown">
                            <button class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-person-circle"></i>&nbsp; {user.userName}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" onClick={Logout}><i class="bi bi-file-lock2-fill"></i>&nbsp; Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                        <form className="d-flex">
                            <a className="btn btn-outline-success mx-1" href='/Login'><i class="bi bi-unlock"></i>&nbsp; Login</a>
                            <a className="btn btn-outline-info mx-1" href='/Register'><i class="bi bi-person-plus"></i>&nbsp; Register</a>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
