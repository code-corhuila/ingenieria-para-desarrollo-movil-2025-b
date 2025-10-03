import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
  ],
})
export class RegisterPage implements OnInit {
  // Definición del formulario de registro.
  registerForm!: FormGroup;

  // Variables para controlar el estado de carga y mostrar errores.
  loading = false;
  errorMessage: string | null = null;

  // Constructor para inyectar las dependencias necesarias: FormBuilder, Router, y AuthService.
  constructor(
    private fb: FormBuilder, // FormBuilder para construir el formulario.
    private router: Router, // Router para navegar entre páginas.
    private authService: AuthService // Inyecta el servicio de autenticación.
  ) {}

  // Método de inicialización del componente.
  ngOnInit(): void {
    // Inicializa el formulario con los controles 'name', 'email', y 'password' y sus validaciones.
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // El nombre es obligatorio y debe tener al menos 3 caracteres.
      email: ['', [Validators.required, Validators.email]], // El email es obligatorio y debe ser un correo válido.
      password: ['', [Validators.required, Validators.minLength(8)]], // La contraseña es obligatoria y debe tener al menos 8 caracteres.
    });
  }

  // Método que se ejecuta cuando el usuario hace clic en el botón de registro.
  onRegister(): void {
    // Si el formulario es inválido, se muestra un mensaje de error.
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    // Se activa el indicador de carga mientras se espera la respuesta del servidor.
    this.loading = true;
    this.errorMessage = null; // Se limpia cualquier mensaje de error anterior.

    // Se obtiene los datos del formulario (nombre, email y contraseña).
    const userData = this.registerForm.value;

    // Se llama al servicio de autenticación para realizar el registro del nuevo usuario.
    this.authService.register(userData).subscribe({
      next: (res) => {
        // Si el registro es exitoso, se muestra un mensaje en la consola.
        this.loading = false; // Se desactiva el indicador de carga.
        // Se redirige a la página de login después de un registro exitoso.
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Si ocurre un error durante el registro, se muestra un mensaje de error.
        this.loading = false; // Se desactiva el indicador de carga.
        this.errorMessage =
          err.error?.message || 'Error al registrar. Intenta nuevamente.'; // Se muestra el mensaje de error correspondiente.
      },
    });
  }
}
