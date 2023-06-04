const mongoose = require('mongoose');
const Language = mongoose.model(process.env.LAGUAGE_MODEL);


module.exports.addOne = (req, res) =>{
    const newLanguage = {
        name: req.body.name,
        countries: req.body.countries,
        books: req.body.books
    };
    Language.create(newLanguage, function(err, language){
        if(err){
            res.status(500).send({
                success: false,
                message: `error while adding new language, Error: ${err}`
            });
        }
        else {
            res.status(200).send({
                success: true,
                response : language
            });
        }
    });
}



module.exports.update = (req, res) =>{
    const languageName = req.params.languageName;
    let {name, countries} = req.body;

    if(name === null) {
        name = languageName;
    }

    Language.findOneAndUpdate(
        { name: languageName }, 
        { name: name, $push: { countries: countries } },
        { new: true },
        function(err, language){
        if(err){
            res.status(500).send({
                success: false,
                message: `Error while updating language, Error: ${err}`
            });
        } else {
            res.status(200).send({
                success: true,
                response: language
            });
        }
    });
}


module.exports.getByName = (req, res) =>{
    const languageName = req.params.languageName;
    Language.findOne({name: languageName}).exec(function(err, language){
        if(err){
            res.status(500).send({
                success: false,
                message: `error while getting language ${languageName}, Error: ${err}`
            });
        }
        res.status(200).send({
            success: true,
            response: language
        });
    });
}


module.exports.getAll = (req, res) =>{
    Language.find().exec(function(err, languages){
        if(err){
            res.status(500).send({
                success: false,
                message: `error while getting list of languages, Error: ${err}`
            });
        }
        res.status(200).send({
            success: true,
            response: languages
        });
    });
}


module.exports.delete = (req, res) =>{
    const languageName = req.params.languageName;
    Language.deleteOne({name: languageName}).exec(function(err, acknowledged){
        if(err){
            res.status(500).send({
                success: false,
                response: `error while deleting language ${languageName}, Error: ${err}`
            });
        }
        res.status(200).send({
            success: true,
            message: acknowledged
        });
    });
}