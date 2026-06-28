import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskEntity[] = [];

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find(tasks => tasks.id === id);
  }

  create(data: CreateTaskDto) {
    const newId =
      this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;

    const newTask = {
      id: newId,
      title: data.title,
      done: data.done ?? false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, data: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) return null;

    if (data.title) task.title = data.title;
    if (data.done !== undefined) task.done = data.done;

    return task;
  }

  delete(id: number) {
    const taskId = this.tasks.findIndex((task) => task.id === id);

    if (taskId === -1) {
      return null;
    }

    const deletedTask = this.tasks[taskId];
    this.tasks.splice(taskId, 1);

    return deletedTask;
  }
}
