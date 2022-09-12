import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDet, getDetail } from "../../redux/actions";
import Style from './Detail.module.css';
import NavBar from "../navBar/NavBar";

export default function Detail(props){
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
    useEffect(()=>{
        dispatch(getDetail(id))
        return ()=>dispatch(clearDet());
    }, [dispatch, id]);

    return(
        <>
        <NavBar/>
        <div className={Style.containerDetail}>
            <div className={Style.divImg}>
                <img src={detail.image} alt={detail.name} />
            </div>
            <div className={Style.details}>   
                <h3>{detail.name}</h3>
                <p><strong>Code:  </strong>{detail.id}</p>
                <p><strong>Continent:  </strong>{detail.continent}</p>
                <p><strong>Capital:  </strong>{detail.capital}</p>
                <p><strong>Subregion:  </strong>{detail.subregion}</p>
                <p><strong>Area:  </strong> {detail.area} Km2</p>
                <p><strong>Population:  </strong>{detail.population}</p>
                <>{detail.activities?
                <>
                    <h3>Tourist Activity: </h3>
                    <table className={Style.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Difficulty</th>
                                <th>Duration</th>
                                <th>Season</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.activities?.map(el=>
                                <tr>
                                    <td>{el.name}</td>
                                    <td>{el.difficulty}</td>
                                    <td>{el.duration} days</td>
                                    <td>{el.season}</td>
                                </tr>)}
                        </tbody>
                    </table>
                
                </>:false}</>
            </div>
        </div>
        </>
    )
}