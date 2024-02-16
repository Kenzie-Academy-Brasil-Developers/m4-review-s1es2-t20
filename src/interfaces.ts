export interface ITask{
    id: number;
    title: string;
    content: string;
    done: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

// Método de leitura
// Método de criação
export type TCreateTaskData = Pick<ITask, "title" | "content">;
// Método de atualização
export type TUpdateTaskData = Partial<Omit<ITask, "id" | "createdAt" | "updatedAt">>;
// Método de exclusão

export interface ITaskService{
    getTasks(): ITask[];
    create(data: TCreateTaskData): ITask;
    update(id: number, data: TUpdateTaskData): ITask | string;
    delete(id: number): string;
}