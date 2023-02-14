const db = require("../db");
const fs = require("fs"); // import { readFileSync } from 'node:fs/promises';

async function injection(){
    try{
        // const grammar = fs.readFileSync(__dirname + '/grammar.sql', 'utf-8')
        const content_references = fs.readFileSync(__dirname + '/content_references.sql', 'utf-8')
        const content = fs.readFileSync(__dirname + '/content.sql', 'utf-8')
        const groups = fs.readFileSync(__dirname + '/groups.sql', 'utf-8')
        const users = fs.readFileSync(__dirname + '/users.sql', 'utf-8')
        const user_vocabulary = fs.readFileSync(__dirname + '/user_vocabulary.sql', 'utf-8')
        const words = fs.readFileSync(__dirname + '/words.sql', 'utf-8')

        // await db.none(grammar)
        await db.none(words)
        await db.none(content)
        await db.none(groups)
        await db.none(content_references)
        await db.none(users)
        await db.none(user_vocabulary)

    }catch(e){
        console.log(e.message)
    }
}
injection()
