import React from "react";
import { ImLocation, ImEnvelop } from "react-icons/im";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const Footer = () => {
    return (
        <>
            <div class="text-center" style={{color:"white",backgroundColor:"rgba(20, 20, 20, 0.872)"}} >
                <div class="row">
                    <div class="col">
                        <h4>Stay Connected to us</h4>
                    </div>
                    <div class="col">
                    </div>
                    <div class="col-4 " style={{ textAlign: "left" }} >
                        <p><ImEnvelop /> yash.20222068@mnnit.ac.in</p>
                        <p><ImLocation /> National Institute of Technology Allahabad</p>
                    </div>
                </div>
            </div>
        </>
    )
};