import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Nav } from "./Nav";
import { Footer } from "../../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Candidates() {

    const location = useLocation()
    const role = location.state.role;

    const [values, setValues] = useState([])

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.post('http://localhost:4502/api/fetchCandidates',
                    {
                        role:role,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                );
                console.log(response.data);
                setValues(response.data.message);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAdminData();
    }, [])
    /*const filterSort = pdf == null ? "" : pdf.filter(value =>  value.type === "pdf" )
    .sort((a,b) => a.date < b.date ? 1 : -1)
    */

    const showPdf = () => {

    }

    return (
        <>
            <Nav />
            <div>
                <h3>Candidates Applied</h3>
            </div>


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Document</th>
                        <th scope="col">View Profile</th>
                        <th scope="col">Accept</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values === null ? "" : values.map((value) => {
                            return <tr>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td><a href={value.pdfUrl}>{value.document}</a></td>
                                <td><button className="btn btn-outline-success" onClick={() => showPdf()}>Click here</button></td>
                                <td><button className="btn btn-outline-success">Click here</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default Candidates;