import React from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Candidates() {

    //const [values, setValues] = useState([])

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

            <div>
                <h3>Candidates Applied</h3>
            </div>


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">View Profile</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </>
    )
}

export default Candidates;