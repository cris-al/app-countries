import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_NAME = 'GET_COUNTRIES_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_COUNT_ACT = 'FILTER_COUNT_ACT';
export const CLEAR_DET = 'CLEAR_DET';
export const CLEAR_COUNT = 'CLEAR_COUNT';

export const getCountries = () => {
    return async function(dispatch){
        const api = await axios.get('http://localhost:3001/countries');
        
        return dispatch({
            type: GET_COUNTRIES,
            payload: api.data
        })
    }
}
export const getCountriesName = (name) => {
    return async function(dispatch){
        return fetch('http://localhost:3001/countries/search?name='+name)
                .then(res => res.json())
                .then(json => dispatch({
                    type: GET_COUNTRIES_NAME,
                    payload: json
                }))
    }
}
export const getDetail = (id) => {
    return async function(dispatch){
        var api = await axios.get('http://localhost:3001/countries/'+id);
        return dispatch({
            type: GET_DETAIL,
            payload: api.data
        })
    }
}
export const createActivity = (payload) => {
    return async function(dispatch){
        var response = await axios.post('http://localhost:3001/activities/create',payload);
        return response;
    }
}
export const getActivities = () => {
    return async function(dispatch){
        return fetch('http://localhost:3001/activities')
                .then(res => res.json())
                .then(json => dispatch({
                    type: GET_ACTIVITIES,
                    payload: json
                }))
    }
}
export const orderByName = (payload) => {
    return{
        type: ORDER_BY_NAME,
        payload
    }
}
export const orderByPopulation = (payload) => {
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}
export const filterContinent = (payload) => {
    return{
        type: FILTER_CONTINENT,
        payload
    }
}
export const filterCountriesActivity = (payload) => {
    return{
        type: FILTER_COUNT_ACT,
        payload
    }
}
export const clearDet = () => {
    return{
        type: CLEAR_DET
    }
}
export const clearCount = () => {
    return{
        type: CLEAR_COUNT
    }
}