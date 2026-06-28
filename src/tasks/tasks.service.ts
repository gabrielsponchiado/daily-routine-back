import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id }
    }) 
    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }
    
    return task;
  }

  async create(data: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        done: data.done ?? false,
        userId: 1,
      }
    })
  }

  async update(id: number, data: UpdateTaskDto) {
    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        done: data.done,
      },
    })
  }

  async delete(id: number) {
    await this.findOne(id)

    return this.prisma.task.delete({
      where: { id },
    })
  }
}
