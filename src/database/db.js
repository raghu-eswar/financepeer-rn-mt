import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('main_db', '1.0', '', 1);
const init = () => {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS Notes(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER NOT NULL, title TEXT, body TEXT)',
      [],
    );
  });
};

const addNote = async note => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO Notes (userId, title, body) VALUES (:userId, :title, :body)',
        [note.userId, note.title, note.body],
        (tx, res) => resolve(res),
        (tx, error) => reject(error),
      );
    });
  });
};

const addNotes = async notes => {
  return new Promise((resolve, reject) => {
    const results = [];
    db.transaction(
      txn => {
        notes.forEach(note => {
          txn.executeSql(
            'INSERT INTO Notes (userId, title, body) VALUES (:userId, :title, :body)',
            [note.userId, note.title, note.body],
            (tx, res) => results.push(res),
            (tx, error) => results.push(error),
          );
        });
      },
      () => reject(results),
      () => resolve(results),
    );
  });
};

const getNotes = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM `Notes`',
        [],
        (tx, res) => resolve(res.rows._array),
        (tx, error) => reject(error),
      );
    });
  });
};

export const DB = {
  init,
  addNote,
  addNotes,
  getNotes,
};
