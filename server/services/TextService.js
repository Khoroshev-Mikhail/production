const db = require("../db");

class TextService {
    imgTypes = ['image/jpeg', 'image/png', 'image/jp2']
    mediaPath = __dirname + '/../public/texts'
    async getAll (){
        return await db.manyOrNone('SELECT * FROM texts WHERE is_global = true');
    }
    async getAllNoGlobal (){
        return await db.manyOrNone('SELECT * FROM texts WHERE is_global <> true');
    }
    async getOne (id){
        if(!id) {
            throw new Error('Не указан id текста.')
        }
        const data = await db.one('SELECT * FROM texts WHERE id = $1', [id]);
        return data

    }
    async add (title, title_rus, text_body, img){
        console.log(title, title_rus)
        if(!title || !title_rus || !text_body || !img) {
            throw new Error('Получены не все необходимые параметры текста.')
        }
        const { id } = await db.one('INSERT INTO texts(title, title_rus, text_body) VALUES ($1, $2, $3) RETURNING id', [title, title_rus, text_body])
        await this.addImg(id, img)
        return await db.one('SELECT * FROM texts WHERE id = $1', [id])
    }
    async addImg (id, img){
        if(! id ){
            throw new Error('Не указан id слова.')
        }
        if(! img ){
            throw new Error('На сервер не было загружено изображение.')
        }
        if(! this.imgTypes.includes(img.mimetype) ){
            throw new Error('Не подходящий формат изображения.')
        }
        const imgFileName = 'text_' + id + img.name.match(/\.[\w\d]+$/i)[0]
        const imgUploadPath = this.mediaPath + '/img/' + imgFileName;
        await img.mv(imgUploadPath, function(err) {
            if (err) {
                throw new Error('Ошибка при загрузке изображения.')
            }
        });
        await db.none('UPDATE texts SET img = $2 WHERE id = $1', [id, imgFileName])
        return await db.one('SELECT * FROM texts WHERE id = $1', [id])
    }
    async update (title, img, text_body, id){
        if(!title || !img || !text_body || !id) {
            throw new Error('Получены не все параметры текста.')
        }
        await db.none('UPDATE texts SET title = $1, img = $2, text_body = $3 WHERE id = $4', [title, img, text_body, id]);
        return await db.one('SELECT * FROM texts WHERE id = $1', [id])
    }
    async updateWithoutImg (title, text_body, id){
        if(!title || !text_body || !id) {
            throw new Error('Получены не все параметры текста.')
        }
        await db.none('UPDATE texts SET title = $1, text_body = $2 WHERE id = $3', [title, text_body, id]);
        return await db.one('SELECT * FROM texts WHERE id = $1', [id])
    }
    async delete (id){
        if(!id) {
            throw new Error('Не указан id текста.')
        }
        await db.none('DELETE FROM texts WHERE id = $1', [id]);
        return await db.none('SELECT * FROM texts WHERE id = $1', [id]);
    }
    async getAllTitles (){
        const data = await db.manyOrNone('SELECT id, title, img FROM texts WHERE is_global = true AND visible = true');
        return data
    }
    async getAllNoGlobalTitles (){
        const data = await db.manyOrNone('SELECT id, title, img FROM texts WHERE is_global <> true');
        return data
    }
    async getRefGroupId (id){
        const data = await db.oneOrNone('SELECT id_group FROM content_references WHERE id_text = $1', [id])
        return data
    }
};

module.exports = new TextService();