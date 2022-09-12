const { Router } = require('express');
const {getCountries} = require('./utils.js');
const { Country, Activity} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', async (req, res)=>{
    const api = await getCountries();
    try {
        res.status(200).json(api);
    } catch (error) {
        console.log(error);
    }
});
router.get('/countries/search', async (req, res)=>{
    const name = req.query.name;
    const countries = await Country.findAll({
        include: [{model: Activity}]
    });
    
    try {
        if(name){
            const result = countries.filter(el => 
                el.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            
            if(result.length>0) res.json(result);
            else res.send({msg: 'Without results...'});
        }else{
            res.send({msg: 'name require...'})
        }
    } catch (error) {
        console.log(error);
    }

});
router.get('/countries/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        if(id){
            const api = await Country.findOne({
                                where: {id: id},
                                include: [{model: Activity}] });
            if(api) res.json(api);
            else res.send({msg: 'Not found...'});
        }else{
            res.json(api);
        }
    } catch (error) {
        console.log(error);
    }
});
router.post('/activities/create', async (req, res)=>{
    const {name, difficulty, duration, season, countries} = req.body;
    try {
        let activity = await Activity.create({name, difficulty, duration, season});
        activity.addCountries(countries);
        res.status(200).send({msg: 'Created...'});
    } catch (error) {
        console.log(error);
    }
});
router.get('/activities', async (req, res)=>{
    try {
        const activities = await Activity.findAll({
            include: [{
                model: Country
            }]
        });
        res.status(200).json(activities);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
