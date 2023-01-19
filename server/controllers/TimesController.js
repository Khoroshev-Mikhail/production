const TimesService = require("../services/TimesService.js");

class TimeController {
    async getAll (req, res){
        try {
            const data = await TimesService.getAll()
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async getOne (req, res){
        try {
            const data = await TimesService.getOne(req.params.id)
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
}

module.exports = new TimeController();