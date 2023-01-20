const TextService = require('../services/TextService')
const Content_ReferencesService = require('../services/Content_ReferencesService')

class TextController {
    async getAll (_, res){
        try {
            const data = await TextService.getAll()
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async getAllNoGlobal (_, res){
        try {
            const data = await TextService.getAllNoGlobal()
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async getOne (req, res){
        try {
            const data = await TextService.getOne(req.params.id)
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async add (req, res){
        try {
            const data = await TextService.add(req.body.title, req.body.title_rus, req.body.text_body, req.files.img)
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async update (req, res){
        try {
            const data = await TextService.update(req.body.title, req.body.img, req.body.text_body, req.body.id)
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async updateWithoutImg (req, res){
        try {
            const data = await TextService.updateWithoutImg(req.body.title, req.body.text_body, req.body.id)
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async delete (req, res){
        try {
            await TextService.delete(req.body.id)
            return res.sendStatus(204)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async getAllTitles (_, res){
        try {
            const data = await TextService.getAllTitles()
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async getAllNoGlobalTitles (_, res){
        try {
            const data = await TextService.getAllNoGlobalTitles()
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async getReferences (req, res){
        try {
            const data = await Content_ReferencesService.getReferences(req.params.id, 'id_text');
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    async getRefGroupId (req, res){
        try {
            const data = await Content_ReferencesService.getRefGroupId(req.params.id, 'id_text');
            return res.status(200).send(data)
        } 
        catch(e) {
            return res.status(500).send(e.message)
        }
    }
    
}

module.exports = new TextController();