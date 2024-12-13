import React from "react";
import { Navbar } from "../Components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Notification() {

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
            <Navbar />
            <h3>Notification</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name of the Firm</th>
                        <th scope="col">Location</th>
                        <th scope="col">Eligibitiy</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Apply Now</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </>
    )
}

export default Notification;