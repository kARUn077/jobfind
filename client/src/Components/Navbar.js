import React from "react";
import { Link }  from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const Navbar = () => {


    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Services</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="../User/dashBoard">DashBoard</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="../User/notification">Notification</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="../User/pastApplication">Past Application</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="../User/register">Machine Learning Part</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link class="nav-link" to="../User/register">Update</Link></li>
                                <li><Link class="nav-link" to="../User/register">Register</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div>
                        <button type="button" class="btn btn-outline-danger">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
};