import React from "react";
import { Link } from "react-router-dom";
import Style from './Card.module.css';

export default function Card({id, image, name, continent}){

    return(
        <div className={Style.containerCard}>
            <div className={Style.card}>
                <Link to={`/detail/${id}`}>
                    <img src={image} alt={name}/>
                </Link>
                <h2>Name: {name}</h2>
                <h3>Continent: {continent}</h3>
            </div>
        </div>
    )
}