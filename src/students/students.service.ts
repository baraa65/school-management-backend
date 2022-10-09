import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentBody } from './student.model';

@Injectable()
export class StudentsService {
  constructor(@InjectModel('student') private studentModel: Model<Student>) {}
  getStudents() {
    return this.studentModel.find();
  }
  async addStudent({ name, grade }: StudentBody) {
    const student = new this.studentModel({ name, grade });
    return await student.save();
  }
  async updateStudent(id: string, { name, grade }: StudentBody) {
    const student = await this.findStudent(id);

    if (name) student.name = name;
    if (grade) student.grade = grade;

    return await student.save();
  }

  async deleteStudent(id: string) {
    const student = await this.findStudent(id);
    await student.remove();
  }

  private async findStudent(id: string): Promise<Student> {
    let student;

    try {
      student = await this.studentModel.findById(id);
    } catch (e) {}

    if (!student) throw new NotFoundException('Student not found');

    return student;
  }
}
