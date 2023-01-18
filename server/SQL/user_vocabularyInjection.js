const db = require("../db");
const fs = require("fs");

const user_vocabulary = fs.readFileSync(__dirname + '/user_vocabulary.sql', 'utf-8')

try{
    db.none(user_vocabulary)
}catch(e){
    console.log(e.message)
}
