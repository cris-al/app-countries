import {CLEAR_COUNT, FILTER_CONTINENT, FILTER_COUNT_ACT, GET_ACTIVITIES, GET_COUNTRIES,
        GET_COUNTRIES_NAME, GET_DETAIL, ORDER_BY_NAME,
        ORDER_BY_POPULATION, CLEAR_DET} from './actions';

const initialState = {
    countries: [],
    countriesCopy: [],
    detail: [],
    activities: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                countriesCopy: action.payload
            }
        case GET_COUNTRIES_NAME:
            return{
                ...state,
                countries: action.payload
            }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case CLEAR_DET:
            return{
                ...state,
                detail: []
            }
        case CLEAR_COUNT:
            return{
                ...state,
                countries: []
            }
        case 'CREATE_ACTIVITY':
            return{
                ...state
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        case ORDER_BY_NAME:
            let orderN = action.payload === 'all'? state.countriesCopy:
            action.payload === 'asc'?
            state.countries.sort(function(a, b){
                if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
                return 0;
            }):
            state.countries.sort(function(a, b){
                if(a.name.toLowerCase()>b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase()<b.name.toLowerCase()) return 1;
                return 0;
            })

            return{
                ...state,
                countries: orderN
            }
        case ORDER_BY_POPULATION:
            let orderP = action.payload === 'all'? state.countriesCopy:
            action.payload === 'higher'?
            state.countries.sort(function(a, b){
                if(a.population>b.population) return -1;
                if(a.population<b.population) return 1;
                return 0;
            }):
            state.countries.sort(function(a, b){
                if(a.population>b.population) return 1;
                if(a.population<b.population) return -1;
                return 0;
            })
            return{
                ...state,
                countries: orderP
            }
        case FILTER_CONTINENT:
            let filCont = action.payload === 'All'? state.countriesCopy:
            action.payload === 'Africa'?
                state.countriesCopy.filter(el => el.continent === 'Africa'):
            action.payload === 'Americas'?
                state.countriesCopy.filter(el => el.continent === 'Americas'):
            action.payload === 'Asia'?
                state.countriesCopy.filter(el => el.continent === 'Asia'):
            action.payload === 'Oceania'?
                state.countriesCopy.filter(el => el.continent === 'Oceania'):
            action.payload === 'Europe'?
                state.countriesCopy.filter(el => el.continent === 'Europe'):
                state.countriesCopy.filter(el => el.continent === 'Antarctic')

            return{
                ...state,
                countries: filCont
            }
        case FILTER_COUNT_ACT:
            let filtAct = action.payload==='all'?
            state.countriesCopy.filter(el =>{
                let activities = el.activities;
                if(activities.length>0) return el;
            }):
            state.countriesCopy.filter(el => {
                let activities = el.activities;
                if(activities.length>0){
                    for (let i = 0; i < activities.length; i++) {
                        if(activities[i].name === action.payload) return el;
                    }
                }
            });
            return{
                ...state,
                countries: filtAct
            }
        // case 'FILTER_SUFFIXES':
        //     const suffixies = action.payload==='suffixies'?
        //     state.countries.filter(el => {
        //         if(el.suffixies>50) return el;
        //     }):
            
        //     return{
        //         ...state,
        //         countries: suffixies
        //     }
        default:
            return state
    }
}