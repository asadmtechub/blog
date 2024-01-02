const db = require('../config/db');

const save = (title, url, description) => {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO blog (title,image,description) VALUES  ($1,$2,$3)';

    db.query(query, [title, url, description], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const update = (title, description, id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE  blog SET title=$1,description=$2 WHERE id=$3';

    db.query(query, [title, description, id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const get = (id = false, search) => {
  return new Promise((resolve, reject) => {
    if (id) {
      const query = 'SELECT * FROM blog WHERE  id=$1 ';

      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    } else {
      const query = 'SELECT * FROM blog WHERE title LIKE $1  ORDER BY id DESC';

      db.query(query, [search], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }
  });
};

const blogDelete = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM blog WHERE  id=$1';

    db.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  save,
  update,
  get,
  blogDelete,
};
