export type ID = string | number;

export type Status = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: ID;
  name: string;
  status: Status;
  priority: Priority;
  description?: string;
  userId?: ID;
  owner?: ID;
  user_id?: ID;
  createdAt?: string;
  updatedAt?: string;
}

export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt"> & {
  name: string;
  status: Status;
  priority: Priority;
};

export type UpdateTask = Partial<Pick<Task, "name" | "status" | "priority" | "description" | "userId">> & {
  id: ID;
};
