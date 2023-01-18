const db = require("../db");
const fs = require("fs"); // import { readFileSync } from 'node:fs/promises';

const grammar = fs.readFileSync(__dirname + '/grammar.sql', 'utf-8')
const content_references = fs.readFileSync(__dirname + '/content_references.sql', 'utf-8')
const content = fs.readFileSync(__dirname + '/content.sql', 'utf-8')
const groups = fs.readFileSync(__dirname + '/groups.sql', 'utf-8')
const users = fs.readFileSync(__dirname + '/users.sql', 'utf-8')
const user_vocabulary = fs.readFileSync(__dirname + '/user_vocabulary.sql', 'utf-8')
const words = fs.readFileSync(__dirname + '/words.sql', 'utf-8')

db.none(grammar)
db.none(content_references)
db.none(content)
db.none(groups)
db.none(users)
db.none(user_vocabulary)
db.none(words)