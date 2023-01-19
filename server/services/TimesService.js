import db from "../db";

class TimesService {
    async getAll (){
        return await db.manyOrNone('SELECT * FROM times');
    }
    async getOne (id){
        return await db.one('SELECT * FROM times WHERE id = $1', [id]);
    }
};

module.exports = new TimesService();