import React ,{ useState, useEffect }from "react";
import Style from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {filterContinent, filterCountriesActivity, getActivities, getCountries,
        orderByName, orderByPopulation } from "../../redux/actions";
import Card from "../card/Card";
import SearchBar from "../searchBar/SearchBar";
import Paginated from "../paginated/Paginated";
import NavBar from "../navBar/NavBar";

export default function Home(){
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('');
    const [loading, setLoading] = useState(false);
    const countriesPerPage = 10;
    const index2 = page * countriesPerPage;
    const index1 = index2 - countriesPerPage;
    const countriesInPage = countries.msg?countries.msg:countries.slice(index1, index2);
    
    useEffect(()=>{
        if(countries.length<1) dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);
    function handleOrderName(e){
        setOrder('Ordered '+e.target.value);
        dispatch(orderByName(e.target.value));
        setPage(1);
    }
    function handleOrderPopulation(e){
        setOrder('Order '+e.target.value);
        dispatch(orderByPopulation(e.target.value));
        setPage(1);
    }
    function handleFilterContinent(e){
        dispatch(filterContinent(e.target.value));
        setOrder('Order '+e.target.value);
        setPage(1);
    }
    function handleFilterCountriesActivity(e){
        dispatch(filterCountriesActivity(e.target.value));
        setOrder('Ordered '+e.target.value);
        setPage(1);
    }
    function handleReloadCountries(e){
        setLoading(true);
        e.preventDefault();
        dispatch(getCountries());
        setLoading(false);
    }
    function paginated(num){
        setPage(num);
    }
    function prevPage(){
        if(page>1) setPage(page-1);
    }
    function nextPage(max){
        if(page<max) setPage(page+1);
    }
    return(
        <div className={Style.containerHome}>
            <NavBar/>
            <h1>HOME</h1>
            <button onClick={handleReloadCountries} className={Style.btnRC}>
                {loading?'loading..':'Reload Countries'}</button>
            <SearchBar setPage={setPage}/>
            <select onChange={handleOrderName}>
                <option value='all'>Alphabetical Order</option>
                <option value='asc'>A to Z</option>
                <option value='desc'>Z to A</option>
            </select>
            <select onChange={handleOrderPopulation}>
                <option value='all'>Population</option>
                <option value='higher'>Higher Population</option>
                <option value='lower'>Lower Population</option>
            </select>
            <select onChange={handleFilterContinent}>
                <option value='All'>All Continent</option>
                <option value='Africa'>Africa</option>
                <option value='Americas'>Americas</option>
                <option value='Asia'>Asia</option>
                <option value='Oceania'>Oceania</option>
                <option value='Europe'>Europe</option>
                <option value='Antarctic'>Antarctic</option>
            </select>
            <select onChange={handleFilterCountriesActivity}>
                <option value='all'>All Tourist Activity</option>
                {activities?.map(el =>
                    <option key={el.id} value={el.name}>{el.name}</option>)
                }
            </select>
            
            {typeof countriesInPage === 'string'? <p>{countriesInPage}</p>:
                  countriesInPage.length>0?
                    <>
                        <Paginated cantCountries={countries.length}
                                countriesPerPage={countriesPerPage}
                                paginated={paginated}
                                prevPage={prevPage}
                                nextPage={nextPage}/>
                        <div className={Style.cards}>{countriesInPage?.map(el => 
                            <Card key={el.id}
                                id={el.id}
                                image={el.image}
                                name={el.name}
                                continent={el.continent}/>
                        )}</div>
                    </>:
                  <h3>Loading...</h3>}
        </div>
    )
}