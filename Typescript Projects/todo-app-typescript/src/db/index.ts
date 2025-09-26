import Dexie, { Table } from "dexie";
import type { Task } from "../types/tasks";

export class TodoDexie extends Dexie {
  todos!: Table<Task, number>;
  constructor() {
    super("TodoDatabase");
    this.version(1).stores({
      todos: "++id, userId, title, completed",
    });
  }
}

export const db = new TodoDexie();
