import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  // Definición del formulario de login.
  loginForm!: FormGroup;
  // Variables para controlar el estado de carga y mostrar errores.
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, // FormBuilder para construir el formulario.
    private router: Router, // Router para navegar entre páginas.
    private authService: AuthService //  inyecta el servicio de autenticación.
  ) {}

   // Método de inicialización del componente.
  ngOnInit(): void {
    // Inicializa el formulario con los controles 'email' y 'password' y sus validaciones.
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // El email es obligatorio y debe ser un correo válido.
      password: ['', [Validators.required, Validators.minLength(8)]]  // La contraseña es obligatoria y debe tener al menos 8 caracteres.
    });
  }

  // Método que se ejecuta cuando el usuario hace clic en el botón de login.
  async onLogin(): Promise<void> {
     // Si el formulario es inválido, se muestra un mensaje de error.
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa los campos correctamente.';
      return;
    }
     // Se activa el indicador de carga mientras se espera la respuesta del servidor.
    this.loading = true;
    this.errorMessage = null; // Se limpia cualquier mensaje de error anterior.

    // Desestructuramos el formulario para obtener el email y la contraseña.
    const { email, password } = this.loginForm.value;

    // Se llama al servicio de autenticación para realizar el login.
    this.authService.login({ email, password }).subscribe({
      next: async (res) => {

        console.log('Login response', res);


        // Si el login es exitoso, se guarda el token y los detalles del usuario en preferences.
        await Preferences.set({
          key: 'token',
          value: res.token,
        });
        // Guardar usuario
        await Preferences.set({
          key: 'user',
          value: JSON.stringify({
            id: res.id,
            name: res.name,
            email: res.email,
            role: res.role,
          }),
        });
        await Preferences.set({ key: 'userId', value: res.id });

        this.loading = false;

        // Redirige al home o tabs
        this.router.navigate(['/tabs']);
      },
      error: (err) => {
         // Si ocurre un error durante el login, se muestra un mensaje de error.
        this.errorMessage = err.error?.message || 'Credenciales incorrectas.';
        this.loading = false;
      }
    });
  }
}
