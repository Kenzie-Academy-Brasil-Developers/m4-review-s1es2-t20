import { ITask, ITaskService, TCreateTaskData, TUpdateTaskData } from "./interfaces";

export class TaskService implements ITaskService{
    private id: number = 1;
    private taskList: ITask[] = [];

    getTasks(): ITask[] {
        return this.taskList;
    }

    create(data: TCreateTaskData): ITask {
        const now = new Date();

        const newTask: ITask = {
            ...data,
            id: this.id,
            done: false,
            createdAt: now
        }

        this.taskList.push(newTask);

        this.id++;

        return newTask;
    }

    update(id: number, data: TUpdateTaskData): ITask | string {
        const currentTask = this.taskList.find((task) => task.id === id);

        if(currentTask){
            const index = this.taskList.findIndex((task) => task.id === id);

            const now = new Date();

            const updateTask: ITask = { ...currentTask, ...data, updatedAt: now };

            this.taskList.splice(index, 1, updateTask);

            return updateTask;
        } else {
            return "Tarefa não encontrada.";
        }
    }

    delete(id: number): string {
        const currentTask = this.taskList.find((task) => task.id === id);

        if(currentTask){
            const index = this.taskList.findIndex((task) => task.id === id);

            this.taskList.splice(index, 1);

            return "Tarefa excluída com sucesso!"
        } else {
            return "Tarefa não encontrada.";
        }
    }
}

const taskService = new TaskService();
console.log("--CRIANDO NOTA 1--")
console.log(taskService.create({ title: "Estou assistindo a revisão do Alex", content: "Cara, essa revisão é xuxu beleza."}));
console.log("--CRIANDO NOTA 2--")
console.log(taskService.create({ title: "Sou uma maquina de criar notas", content: "Sou um mestre do CRUD."}));
console.log("--LEITURA--");
console.log(taskService.getTasks());
console.log("--ATUALIZAR NOTA 1--")
console.log(taskService.update(1, { done: true }));
console.log("--EXCLUIR NOTA 2--");
console.log(taskService.delete(2));
console.log("--ATUALIZAÇÃO NÃO EXISTENTE");
console.log(taskService.update(123, { done: true }));
console.log("--EXCLUSÃO NÃO EXISTENTE");
console.log(taskService.delete(123));