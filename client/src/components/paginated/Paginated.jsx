import React from "react";
import Style from './Paginated.module.css';

export default function Paginated(props){
    var pages = [];

    for (let i = 1; i <= Math.ceil(props.cantCountries/props.countriesPerPage); i++) {
        pages.push(i);
    }

    return(
        <div className={Style.containerPag}>
            <button onClick={()=>props.prevPage()}>prev</button>
            {pages.map(el => <button key={el} onClick={()=>props.paginated(el)}>{el}</button>)}
            <button onClick={()=>props.nextPage(pages.length)}>next</button>
        </div>
    )
}