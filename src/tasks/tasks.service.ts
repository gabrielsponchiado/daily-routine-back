import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
      }
    });
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

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        done: createTaskDto.done ?? false,
        userId: userId,
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
