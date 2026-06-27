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
}

