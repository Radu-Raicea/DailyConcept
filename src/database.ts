import * as sqlite3 from 'sqlite3'
let sqlite = sqlite3.verbose()
let db = new sqlite.Database('./database.db');

export let createTable = (): void => db.run('CREATE TABLE if not exists concepts(name text)');

export let addConcept = (concept: string): void => db.run(`INSERT INTO concepts(name) VALUES (${concept})`);

export let getConcept = () => 'concept';
