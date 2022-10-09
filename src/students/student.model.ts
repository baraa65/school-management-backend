import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    required: true,
  },
});

export interface Student extends mongoose.Document {
  id: string;
  name: string;
  grade: number;
}

export interface StudentBody {
  name: string;
  grade: number;
}

export const studentCollection = (student: Student) => ({
  id: student.id,
  name: student.name,
  grade: student.grade,
});
