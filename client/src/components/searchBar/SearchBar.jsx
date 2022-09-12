import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesName } from "../../redux/actions";
import Style from './SearchBar.module.css';

export default function SearchBar({setPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e){
        setName(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(name!=='') {
            dispatch(getCountriesName(name));
            setName('');
        }else alert('Enter the name to search..');
        setPage(1);
    }
    return(
        <div className={Style.containerSB}>
            <input value={name} placeholder="Search..." type="text" onChange={handleChange}/>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}