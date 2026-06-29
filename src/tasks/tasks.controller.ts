import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    email: string;
  };
}

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub; 
    return this.tasksService.create(createTaskDto, userId);
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
