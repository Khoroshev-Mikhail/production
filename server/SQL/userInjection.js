const db = require("../db");
const fs = require("fs"); // import { readFileSync } from 'node:fs/promises';

const users = fs.readFileSync(__dirname + '/users.sql', 'utf-8')

try{
    db.none(users)
}catch(e){
    console.log(e.message)
}

