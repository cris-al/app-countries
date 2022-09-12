const axios = require('axios');
const { Country, Activity } = require('../db.js');

module.exports = {
    getCountries: async ()=>{
        // const api = await axios.get('https://restcountries.com/v3/all');
        // const info = api.data.map(el =>{
        //     const obj = {
        //         id: el.cca3,
        //         name: el.name.official,
        //         image: el.flags,
        //         continent: el.region,
        //         capital: el.capital,
        //         subregion: el.subregion,
        //         area: el.area,
        //         population: el.population,
        //         // suffixes: el.idd.suffixes
        //     }
        //     return obj;
        // });
        // info.forEach(el=>{
        //     Country.findOrCreate({
        //         where: {
        //             id: el.id,
        //             name: el.name,
        //             image: el.image.find(el=>el.includes('.png')),
        //             continent: el.continent,
        //             capital: el.capital?el.capital[0]:'undefined',
        //             subregion: el.subregion?el.subregion:'undefined',
        //             area: el.area,
        //             population: el.population,
        //             // suffixes: el.suffixes
        //         }
        //     })
        // });
        const countries = await Country.findAll({
            include: [{model: Activity}]
        });

        return countries;
    }
}