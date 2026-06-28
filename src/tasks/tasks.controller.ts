import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: CreateTaskDto) {
    return await this.tasksService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    return await this.tasksService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.tasksService.delete(Number(id))
  }
}
