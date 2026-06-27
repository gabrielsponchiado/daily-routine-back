import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = [
        { id: 1, title: 'Aprender inglês', done: false},
        { id: 2, title: 'Treinar', done: true},
        { id: 3, title: 'Fazer atividade', done: false},
      ];

      findAll() {
        return this.tasks;
      }

      findOne(id: number) {
        return this.tasks.find(tasks => tasks.id === id);
      }

      create(data: any) {
        const newId = Math.max(...this.tasks.map(t => t.id)) + 1;
        const newTask = {
            id: newId,
            title: data.title,
            done: data.done ?? false,
        }

        this.tasks.push(newTask);
        return newTask
      }

      update(id: number, data: any) {
        const task = this.tasks.find(task => task.id === id)

        if(!task) return null;

        if (data.title) task.title = data.title;
        if (data.done !== undefined) task.done = data.done;

        return task;
      }

      delete(id: number) {
        const taskId = this.tasks.findIndex(task => task.id === id);
        
        if (taskId === -1) {
          return null;
        }
      
        const deletedTask = this.tasks[taskId];
        this.tasks.splice(taskId, 1);
        
        return deletedTask;
      }
}

