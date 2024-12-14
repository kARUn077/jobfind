import React from "react";
import { useState } from "react";
import axios from "axios";
import { Nav } from "./Nav";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function CreateJob() {

    const [values, setValues] = useState([])

    const [role, setRole] = useState([])
    const [eligibility, setEligibility] = useState([])
    const [skills, setSkills] = useState([])
    const [lastdate, setLastDate] = useState([])
    const [location, setLocation] = useState([])
    const [salary, setSalary] = useState([])
    const [aboutus, setAboutUs] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:4502/api/jobCreate',
                { 
                    role:role,
                    eligibility:eligibility,
                    skills:skills,
                    lastdate:lastdate,
                    location:location,
                    salary:salary,
                    aboutus:aboutus
                }
            );
            console.log(response.data);
            if(response.data.message==="job created"){
                toast.success("Job Created Successfully");
            }
            else{
                toast.error("Some Error Occured");
            }
        }
        catch(error){
            console.log(error);
        }
    }


    /*const filterSort = pdf == null ? "" : pdf.filter(value =>  value.type === "pdf" )
    .sort((a,b) => a.date < b.date ? 1 : -1)
    { 
                            pdf === null ? "" : filterSort.map((data) => {
                                return <tr>
                                    <td>*</td>
                                    <td>{data.title}</td>
                                    <td>{data.date}</td>
                                    <td><button className="btn btn-outline-success" onClick={() => showPdf(data.pdf)}>Click here</button></td>
                                </tr>
                            })
                        }*/

    return (
        <>
            <Nav />
            <div>
                <h4>Jobs Created
                <button type="button" class="btn btn-outline-primary" style={{ float: "right" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create a Job
                </button>
                </h4>
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Job Details</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="row g-3" >
                                        <div class="col-md-6">
                                            <label class="form-label">Role</label>
                                            <input type="text" class="form-control" onChange={(e) => setRole(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Eligibility</label>
                                            <input type="text"  class="form-control" placeholder="Educational Qualification" onChange={(e) => setEligibility(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputSkills" class="form-label">Skills Needed</label>
                                            <input type="text" class="form-control" id="inputSkills" onChange={(e) => setSkills(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label  class="form-label">Last Date to Apply</label>
                                            <input type="date" class="form-control"  onChange={(e) => setLastDate(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Location</label>
                                            <input type="text" class="form-control" onChange={(e) => setLocation(e.target.value)} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Salary (in Rupees)</label>
                                            <input type="number" class="form-control" onChange={(e) => setSalary(e.target.value)} />
                                        </div>
                                        <div class="form-floating">
                                            <textarea class="form-control" placeholder="Please give some job descriptions" id="floatingTextarea2" style={{ height: "100px" }} onChange={(e) => setAboutUs(e.target.value)}></textarea>
                                            <label for="floatingTextarea">Brief Intro about Job</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" onClick={handleSubmit} >Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Role Offered</th>
                        <th scope="col">Eligibitiy</th>
                        <th scope="col">Skills Needed</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Candidates</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <ToastContainer />
        </>
    )
}

export default CreateJob;