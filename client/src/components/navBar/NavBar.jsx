import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../logo.png';
import Style from './NavBar.module.css';

export default function NavBar(){

    return(
        <div className={Style.containerNavBar}>
            <Link to='/home'><img src={Logo} alt="logo" /></Link>
            <Link to='/home'><h3>HOME</h3></Link>
            <Link to='/create/activity'><h3>Create Activity</h3></Link>
        </div>
    )
}