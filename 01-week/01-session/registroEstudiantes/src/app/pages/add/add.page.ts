import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class AddPage implements OnInit {
  name = '';
  email = '';
  program = '';

  constructor(
    private studentService: StudentService, 
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async saveStudent() {
    if (this.name && this.email && this.program) {
      try {
        await this.studentService.addStudent({ 
          id: 0, 
          name: this.name.trim(), 
          email: this.email.trim(), 
          program: this.program.trim() 
        });
        
        // Mostrar mensaje de éxito
        const toast = await this.toastController.create({
          message: 'Estudiante registrado exitosamente',
          duration: 2000,
          color: 'success',
          position: 'bottom'
        });
        await toast.present();
        
        this.router.navigate(['/list']);
      } catch (error) {
        // Mostrar mensaje de error
        const toast = await this.toastController.create({
          message: 'Error al registrar estudiante',
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        });
        await toast.present();
      }
    } else {
      // Mostrar mensaje de validación
      const toast = await this.toastController.create({
        message: 'Por favor complete todos los campos',
        duration: 2000,
        color: 'warning',
        position: 'bottom'
      });
      await toast.present();
    }
  }

}
