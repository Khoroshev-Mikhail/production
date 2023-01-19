const db = require("../db");
const fs = require("fs"); // import { readFileSync } from 'node:fs/promises';

const times = fs.readFileSync(__dirname + '/times.sql', 'utf-8')

try{
    db.none(times)
}catch(e){
    console.log(e)
}

