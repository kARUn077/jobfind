import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Notification() {

    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [message, setMessage] = useState([])

    const handleSubmit = async () => {

        try {
            const response = await axios.get('http://localhost:4502/api/fetchNotification',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            setData(response.data.data);
            setMessage(response.data.message);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, []);

    const merge = [];
    const combine = () => {
        for (let i = 0; i < data.length; i++) {
            merge.push({
                admin: data[i],
                job: message[i],
            });
        }
    }
    combine();

    const showApplication = (ferm, role) => {
        navigate("../User/applicationWindow", { state: { ferm: ferm, role: role } })
    }

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
                        <th scope="col">Last Date to Apply</th>
                        <th scope="col">Apply For Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        merge === null ? "" : merge.map((value) => {
                            return <tr>
                                <td>{value.admin.ferm}</td>
                                <td>
                                    {
                                        value.admin.adminDetails.map((item, index) => {
                                            return <tr>
                                                <td key={index} >{item.city + ", " + item.state}</td>
                                            </tr>
                                        })
                                    }
                                </td>
                                <td>
                                    {
                                        value.job.map((item, index) => {
                                            return <tr>
                                                <td>{item.eligibility}<hr/></td>
                                            </tr>
                                        })
                                    }
                                </td>
                                <td>
                                    {
                                        value.job.map((item, index) => {
                                            return <tr>
                                                <td key={index} >{moment(item.lastDate).format('Do MMM YY, h:mm a')}<hr/></td>
                                            </tr>
                                        })
                                    }
                                </td>
                                <td>
                                    {
                                        value.job.map((item, index) => {
                                            return <tr>
                                                <td key={index}><button className="btn btn-outline-success" onClick={() => showApplication(value.admin.ferm,item.role)}>{item.role}</button></td>
                                            </tr>
                                        })
                                    }
                                </td>
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

export default Notification;