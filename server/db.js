const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('./temp.db');

const createTableIfNotExists = () => new Promise((resolve, reject) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS forms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        email TEXT UNIQUE,
        eventDate INTEGER,
        createdAt INTEGER
      )`,
    (res, err) => {
      if (err) {
        return reject('Problem with forms table creation');
      }
      resolve('forms table created');
    }
  );
});


createTableIfNotExists();

const saveForm = (form) =>
new Promise((resolve, reject) => {
    const { firstName, lastName, email, eventDate } = form;
    const res = db.run(`INSERT INTO forms
    (firstName, lastName, email, eventDate, createdAt)
    VALUES
    (?,?,?,?,?)
    `,
    [
      firstName,
      lastName,
      email,
      eventDate,
      Date.now()
    ], (res, err) => {
      console.log(res);
      if (res !== null) return reject(res);
      if (err) return reject(err);
      resolve("Zapisano w bazie", res);
    });
  });

const getForms = () =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject('timeout');
    }, 10000);

    db.all('SELECT * FROM forms', function (err, rows) {
      if (err) return reject(err);
      clearInterval(timeoutId);
      resolve(rows);
    });
  });

module.exports = {
  saveForm,
  getForms,
};
