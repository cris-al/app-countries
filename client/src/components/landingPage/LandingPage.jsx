import React from "react";
import { Link } from "react-router-dom";
import Style from './LandingPage.module.css';

export default function LandingPage(){
    
    return(
        <div className={Style.containerLP}>
            <h1>Welcome To The COUNTRIES API</h1>
            <Link to='/home'>
                <button>HOME</button>
            </Link>
        </div>
    )
}