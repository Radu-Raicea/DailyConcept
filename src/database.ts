import * as sqlite3 from 'sqlite3'
let sqlite = sqlite3.verbose()
let db = new sqlite.Database('./database.db');

export let createTable = (): void => db.run('CREATE TABLE if not exists concepts(name text)');

export let addConcept = (concept: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO concepts(name) VALUES ('${concept}')`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export let removeConcept = (concept: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM concepts WHERE name='${concept}'`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export let listConcepts = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    let rows: string[] = [];
    db.each(`SELECT rowid AS id, name AS concept FROM concepts`, (err, row) => {
      if (err) reject(err);
      else rows.push(row.concept);
    }, (err, numRows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export let getConcept = () => 'concept';
