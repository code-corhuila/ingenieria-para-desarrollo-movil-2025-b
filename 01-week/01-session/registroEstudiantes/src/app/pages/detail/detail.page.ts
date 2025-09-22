import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class DetailPage implements OnInit {
  student: Student | undefined;

  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = await this.studentService.getStudentById(id);
  }

}
