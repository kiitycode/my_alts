    // db/index.ts
    import Dexie, { type EntityTable } from 'dexie';
    import type { Todo } from '../types/todo';

    export class TodoDB extends Dexie {
    todos!: EntityTable<Todo & { userId?: string | number }, 'id'>;

    constructor() {
        super('TodoDB');
        // string primary key "id"; index "userId" for quick filtering
        this.version(1).stores({
        todos: 'id, userId',
        });
    }

    async upsert(todo: Todo) {
        await this.todos.put(todo);
    }

    async bulkUpsert(list: Todo[]) {
        if (!list?.length) return;
        await this.todos.bulkPut(list);
    }

    async listByUser(userId: string | number): Promise<Todo[]> {
        return this.todos.where('userId').equals(userId as any).toArray();
    }

    async remove(id: string) {
        await this.todos.delete(id);
    }

    async clearAll() {
        await this.todos.clear();
    }
    }

    export const db = new TodoDB();
