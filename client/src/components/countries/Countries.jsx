import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import Style from './Countries.module.css';

export default function Activity({count, deleteCount}){
    const countries = useSelector(state => state.countries);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountries());
    }, [dispatch]);
    return(
        <div className={Style.countries}>
            {countries.length>0?
                count.map((el1,index) =>{
                    const c = countries.find(el2 => el2.id===el1)
                    return <div className={Style.row} key={index}>
                             <p>{c.name}</p>
                             <button onClick={()=>deleteCount(c.id)}>x</button>
                           </div>
                }
                ):
                false}
        </div>
    )
}