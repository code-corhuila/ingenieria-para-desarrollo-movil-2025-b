import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Student {
  id: number;
  name: string;
  email: string;
  program: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];

  async loadStudents() {
    const { value } = await Preferences.get({ key: 'students' });
    this.students = value ? JSON.parse(value) : [];
    return this.students;
  }

  async addStudent(student: Student) {
    student.id = Date.now();
    this.students.push(student);
    await Preferences.set({ key: 'students', value: JSON.stringify(this.students) });
  }

  async getStudentById(id: number) {
    await this.loadStudents(); // Asegurar que los datos estén cargados
    return this.students.find(s => s.id === id);
  }

  async deleteStudent(id: number) {
    await this.loadStudents();
    this.students = this.students.filter(s => s.id !== id);
    await Preferences.set({ key: 'students', value: JSON.stringify(this.students) });
  }

  async updateStudent(updatedStudent: Student) {
    await this.loadStudents();
    const index = this.students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      await Preferences.set({ key: 'students', value: JSON.stringify(this.students) });
    }
  }

  async getAllStudents() {
    return await this.loadStudents();
  }
}
