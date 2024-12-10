import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { Profile } from "../SvgImage/Profile";

function DashBoard() {

    const [values, setValues] = useState([])
    const [name, setName] = useState([])
    const [gender, setGender] = useState([])
    const [email, setEmail] = useState([])
    const [mobile, setMobile] = useState([])
    const [qualification, setQualification] = useState([])
    const [city, setCity] = useState([])
    const [state, setState] = useState([])

    useEffect(()=>{
        try{
            const response = axios.post('http://localhost:4000/api/dashBoardUser',
                {   
                    name:name,
                    gender:gender,
                    email:email,
                    mobile:mobile,
                    qualification:qualification,
                    city:city,
                    state:state
                });
            setValues(response.data);
        }
        catch(error){
            console.log(error);
        }
    }, [])

    return (
        <>
            <Navbar />
            <h3>DashBoard</h3>
            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            <Profile />
                        </div>
                    </div>
                    <div class="col">
                        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#updateModal">
                                Update
                            </button>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <td>{values==null ? "" : values.name}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="col">Gender</th>
                                        <td>{values==null ? "" : values.gender}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <td>{values==null ? "" : values.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Mobile No.</th>
                                        <td>{values==null ? "" : values.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Qualification</th>
                                        <td>{values==null ? "" : values.qualification}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">HomeTown</th>
                                        <td>{values==null ? "" : values.homeTown}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title fs-5" id="exampleModalLabel">Update Profile</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputName" class="form-label">Name</label>
                                    <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} id="inputName" placeholder="Enter your Name"/>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputGender" class="form-label">Gender</label>
                                    <select id="inputGender" onChange={(e) => setGender(e.target.value)} class="form-select">
                                        <option selected>Choose...</option>
                                        <option onChange={(e) => setGender(e.target.value)} >Male</option>
                                        <option onChange={(e) => setGender(e.target.value)}>Female</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} id="inputEmail" placeholder="Enter your Email" />
                                </div>
                                <div class="col-6">
                                    <label for="inputMobile" class="form-label">Mobile No.</label>
                                    <input type="number" class="form-control" onChange={(e) => setMobile(e.target.value)} id="inputMobile" placeholder="Enter Mobile Number" />
                                </div>
                                <div class="col-md-12">
                                    <label for="qualification" class="form-label" >Highest Qualification</label>
                                    <select class="form-select" onChange={(e) => setQualification(e.target.value)}>
                                        <option selected >Choose...</option>
                                        <option onChange={(e) => setQualification(e.target.value)}>High School X</option>
                                        <option onChange={(e) => setQualification(e.target.value)}>Inter Mediate XII</option>
                                        <option onChange={(e) => setQualification(e.target.value)}>Bachelor's of Technology</option>
                                        <option onChange={(e) => setQualification(e.target.value)}>Bachelor's of Science</option>
                                        <option onChange={(e) => setQualification(e.target.value)}>Final Year of Graduation</option>
                                        <option onChange={(e) => setQualification(e.target.value)}>Other's</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputState" class="form-label">State</label>
                                    <select id="inputState" onChange={(e) => setState(e.target.value)} class="form-select">
                                        <option selected>Choose...</option>
                                        <option onChange={(e) => setState(e.target.value)}>Uttar Pradesh</option>
                                        <option onChange={(e) => setState(e.target.value)} >Madhya Pradesh</option>
                                        <option onChange={(e) => setState(e.target.value)}>New Delhi</option>
                                        <option onChange={(e) => setState(e.target.value)}>Maharastra</option>
                                        <option onChange={(e) => setState(e.target.value)} >Haryana</option>
                                        <option onChange={(e) => setState(e.target.value)} >Rajasthan</option>
                                        <option onChange={(e) => setState(e.target.value)}>Gujrat</option>
                                        <option onChange={(e) => setState(e.target.value)} >Uttarakhand</option>
                                        <option onChange={(e) => setState(e.target.value)}>Other's</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCity" class="form-label">City</label>
                                    <input type="text" class="form-control" onChange={(e) => setCity(e.target.value)} id="inputCity" placeholder="Enter your City" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DashBoard;