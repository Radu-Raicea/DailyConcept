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
    db.each('SELECT name FROM concepts', (err, row) => {
      if (err) reject(err);
      else rows.push(row.name);
    }, (err, numRows) => {
      if (err) reject(err);
      else if (numRows === 0) reject(new Error('There are no concepts in the database.'));
      else resolve(rows);
    });
  });
};

export let getConcept = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.get('SELECT name FROM concepts ORDER BY RANDOM()', (err, row) => {
      if (err) reject(err);
      else if (row) resolve(row.name);
      else reject(new Error('There are no concepts in the database.'));
    });
  });
};
