import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { studentCollection } from './student.model';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getStudents() {
    const students = await this.studentsService.getStudents();
    return students.map((s) => studentCollection(s));
  }

  @Post()
  async addStudent(@Body('name') name: string, @Body('grade') grade: number) {
    const student = await this.studentsService.addStudent({ name, grade });
    return studentCollection(student);
  }

  @Patch(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('grade') grade: number,
  ) {
    const student = await this.studentsService.updateStudent(id, {
      name,
      grade,
    });

    return studentCollection(student);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    await this.studentsService.deleteStudent(id);

    return 'Success';
  }
}
