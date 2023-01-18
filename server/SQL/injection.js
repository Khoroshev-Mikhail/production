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
}catch(e){
    console.log('GRAMMAR')
    console.log(e.message)
}

try{
    db.none(content)
}catch(e){
    console.log('CONTENT')
    console.log(e.message)
}

try{
    db.none(content_references)
}catch(e){
    console.log('CONTENT_REFERENCES')
    console.log(e.message)
}


try{
    db.none(groups)
}catch(e){
    console.log('GROUPS')
    console.log(e.message)
}

try{
    db.none(users)
}catch(e){
    console.log('USERS')
    console.log(e.message)
}

try{
    db.none(user_vocabulary)
}catch(e){
    console.log('USER_VOCABULARY')
    console.log(e.message)
}

try{
    db.none(words)
}catch(e){
    console.log('WORDS')
    console.log(e.message)
}