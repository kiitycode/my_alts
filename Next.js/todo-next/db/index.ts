    import Dexie from "dexie";
    import type { Todo } from "../types/todo";

    export class TodoDB extends Dexie {
    todos!: Dexie.Table<Todo & { userId: string | number }, number>;
    constructor() {
        super("TodoDB");
        this.version(1).stores({
        todos: "++id, userId",
        });
    }
    }

    export const db = new TodoDB();
