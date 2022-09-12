import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCount, createActivity, getCountries } from "../../redux/actions";
import Countries from '../countries/Countries';
import NavBar from "../navBar/NavBar";
import Style from './CreateActivity.module.css';

function validate(activity){
    const error = {};
    if(!activity.name) error.name = 'name is require';
    else if(!/^([a-z]+[\s]*)+$/.test(activity.name)) error.name = 'name is invalid';
    if(!activity.duration) error.duration = 'duration is require';
    if(activity.duration<1) error.duration = 'duration can´t be less than 1 day';
    if(activity.duration>15) error.duration = 'duration can´t be greater than 15 days';
    if(!activity.difficulty) error.difficulty = 'difficulty is require';
    if(!activity.season) error.season = 'season is require';
    if(activity.countries.length<1) error.countries = 'you must select at least one country';
    if(!activity.countries) error.countries = 'you must select at least one country';
    return error;
}

export default function CreateActivity(){
    const dispatch = useDispatch();
    const countries = useSelector(state=>state.countriesCopy);
    const [activity, setActivity] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    });
    const [errors, setErrors] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: ''
    });

    useEffect(()=>{
        dispatch(getCountries());
        return dispatch(clearCount());
    },[dispatch]);
    function handleChange(e){
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...activity,
                [e.target.name]: e.target.value
            })
        )
    }
    function handleSelectDifficulty(e){
        setActivity({
            ...activity,
            difficulty: e.target.value
        })
        setErrors(
            validate({
                ...activity,
                difficulty: e.target.value
            }))
    }
    function handleSelectSeason(e){
        setActivity({
            ...activity,
            season: e.target.value
        })
        setErrors(
            validate({
                ...activity,
                season: e.target.value
            })
        )
    }
    function handleSelectCountries(e){
        setActivity({
            ...activity,
            countries: [...new Set([...activity.countries, e.target.value])]
        })
        setErrors(
            validate({
                ...activity,
                countries: [...activity.countries, e.target.value]
            })
        )
    }
    function deleteCount(id){
        setActivity({
            ...activity,
            countries: [...activity.countries.filter(el=>el!==id)]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        if(activity.name !== ''){
            if(!activity.countries.length<1){
                if(!errors.name){
                    if(!errors.difficulty){
                        if(!errors.duration){
                            if(!errors.season){
                                if(!errors.countries){
                                    dispatch(createActivity(activity));
                                    setActivity({
                                        name: '',
                                        difficulty: '',
                                        duration: '',
                                        season: '',
                                        countries: []
                                    })
                                    alert('Successfully Created...');
                                }else alert('Error..');
                            }else alert('Error...');
                        }else alert('Error...');
                    }else alert('Error...');
                }else alert('Error...');
            }else alert('You must select at least 1 country')
        }else alert('Error...');
    }
    return(
        <>
        <NavBar/>
        <div className={Style.containerCA}>
            <h1>Create Activity</h1>
            <form onSubmit={handleSubmit} className={Style.form}>
                <div className={Style.divName}>
                    <label>Name: </label>
                    <input type="text" name='name' value={activity.name}
                    onChange={handleChange}/>
                </div>
                    {errors.name?<small>{errors.name}</small>:false}
                <div className={Style.divDifficulty}>
                    <label>Difficulty: </label>
                    <select onChange={handleSelectDifficulty} value={activity.difficulty}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                    {errors.difficulty?<small>{errors.difficulty}</small>:false}
                <div className={Style.divDuration}>
                    <label>Duration (days): </label>
                    <input type="number" name='duration' value={activity.duration}
                    onChange={handleChange}/>
                </div>
                    {errors.duration?<small>{errors.duration}</small>:false}
                <div className={Style.divSeason}>
                    <label>Season: </label>
                    <select onChange={handleSelectSeason} value={activity.season}>
                        <option>Summer</option>
                        <option>Spring</option>
                        <option>Autumn</option>
                        <option>Winter</option>
                    </select>
                </div>
                    {errors.season?<small>{errors.season}</small>:false}
                <div className={Style.divCountries}>
                    <label>Countries: </label>
                    <select onChange={handleSelectCountries} value={activity.countries}>
                        {countries.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                    </select>
                </div>
                    {errors.countries?<small>{errors.countries}</small>:false}
                <button type="submit">Create</button>
            </form>
                <Countries count={activity.countries}
                           deleteCount={deleteCount}/>
        </div>
        </>
    )
}