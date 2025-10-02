    // types/todo.ts
    export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
    export type TodoPriority = 'Low' | 'Medium' | 'High';

    export type Todo = {
    id: string;                          // string UUID (server or temp-*)
    name: string;
    description?: string;
    status: TodoStatus;
    priority: TodoPriority;
    createdAt: string;
    updatedAt: string;
    userId?: string | number;
    owner?: string | number;
    user_id?: string | number;
    isTemp?: boolean;
    };
