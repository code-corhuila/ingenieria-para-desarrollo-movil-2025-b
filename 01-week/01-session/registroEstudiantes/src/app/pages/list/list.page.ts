import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class ListPage implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) { }

  async ngOnInit() {
    await this.loadStudents();
  }

  async ionViewWillEnter() {
    // Recargar los estudiantes cada vez que entramos a la vista
    await this.loadStudents();
  }

  async loadStudents() {
    this.students = await this.studentService.loadStudents();
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

}
