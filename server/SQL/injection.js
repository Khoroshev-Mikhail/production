const db = require("../db");
const fs = require("fs"); // import { readFileSync } from 'node:fs/promises';

const grammar = fs.readFileSync(__dirname + '/grammar.sql', 'utf-8')
const content_references = fs.readFileSync(__dirname + '/content_references.sql', 'utf-8')
const content = fs.readFileSync(__dirname + '/content.sql', 'utf-8')
const groups = fs.readFileSync(__dirname + '/groups.sql', 'utf-8')
const users = fs.readFileSync(__dirname + '/users.sql', 'utf-8')
const user_vocabulary = fs.readFileSync(__dirname + '/user_vocabulary.sql', 'utf-8')
const words = fs.readFileSync(__dirname + '/words.sql', 'utf-8')

try{
    db.none(grammar)
    console.log('GRAMMAR')
}catch(e){
    console.log('GRAMMAR')
    console.log(e.message)
}

try{
    db.none(words)
    console.log('WORDS')
}catch(e){
    console.log('WORDS')
    console.log(e.message)
}

try{
    db.none(content)
    console.log('CONTENT')
}catch(e){
    console.log('CONTENT')
    console.log(e.message)
}

try{
    db.none(groups)
    console.log('GROUPS')
}catch(e){
    console.log('GROUPS')
    console.log(e.message)
}

try{
    db.none(content_references)
    console.log('CONTENT_REFERENCES')
}catch(e){
    console.log('CONTENT_REFERENCES')
    console.log(e.message)
}


try{
    db.none(users)
    console.log('USERS')
}catch(e){
    console.log('USERS')
    console.log(e.message)
}

try{
    db.none(user_vocabulary)
    console.log('USER_VOCABULARY')
}catch(e){
    console.log('USER_VOCABULARY')
    console.log(e.message)
}
