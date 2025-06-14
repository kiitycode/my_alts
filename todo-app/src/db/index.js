import Dexie from 'dexie';

export const db = new Dexie('TodoDatabase');

db.version(1).stores({
  todos: '++id, userId, title, completed'
});
