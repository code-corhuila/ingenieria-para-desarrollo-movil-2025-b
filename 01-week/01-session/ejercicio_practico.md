# Ejercicio Práctico: Aplicación de Registro de Estudiantes con Ionic + Capacitor

## Contexto
En CORHUILA se desea una aplicación móvil que permita:
- Registrar estudiantes con nombre, correo y programa.
- Guardar la información en la memoria del dispositivo.
- Consultar el listado de estudiantes registrados.
- Ver el detalle de cada estudiante.

Para este ejercicio se utilizará **Ionic (Angular)** y el plugin de **Capacitor Storage** para simular persistencia de datos.

---

## Paso 1: Crear el proyecto
```bash
ionic start registroEstudiantes blank --type=angular
cd registroEstudiantes
```

---

## Paso 2: Instalar Capacitor y el plugin de almacenamiento
```bash
npm install @capacitor/core @capacitor/cli
npx cap init registroEstudiantes com.corhuila.registro
npx cap add android
npx cap add ios
npm install @capacitor/storage
```

---

## Paso 3: Generar las páginas necesarias
- Página para listar estudiantes
- Página para crear estudiante
- Página para ver detalle

```bash
ionic generate page pages/list
ionic generate page pages/add
ionic generate page pages/detail
```

---

## Paso 4: Crear un servicio para manejar los estudiantes

Archivo `student.service.ts`:

```ts
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

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
    const { value } = await Storage.get({ key: 'students' });
    this.students = value ? JSON.parse(value) : [];
    return this.students;
  }

  async addStudent(student: Student) {
    student.id = Date.now();
    this.students.push(student);
    await Storage.set({ key: 'students', value: JSON.stringify(this.students) });
  }

  async getStudentById(id: number) {
    return this.students.find(s => s.id === id);
  }
}
```

---

## Paso 5: Listar estudiantes

Archivo `list.page.ts`:

```ts
import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html'
})
export class ListPage implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  async ngOnInit() {
    this.students = await this.studentService.loadStudents();
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }
}
```

Archivo `list.page.html`:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Estudiantes</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item *ngFor="let student of students" (click)="goToDetail(student.id)">
      {{ student.name }} - {{ student.program }}
    </ion-item>
  </ion-list>

  <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button (click)="goToAdd()">
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</ion-content>
```

---

## Paso 6: Agregar un estudiante

Archivo `add.page.ts`:

```ts
import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html'
})
export class AddPage {
  name = '';
  email = '';
  program = '';

  constructor(private studentService: StudentService, private router: Router) {}

  async saveStudent() {
    if (this.name && this.email && this.program) {
      await this.studentService.addStudent({ id: 0, name: this.name, email: this.email, program: this.program });
      this.router.navigate(['/list']);
    }
  }
}
```

Archivo `add.page.html`:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Registrar Estudiante</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-item>
    <ion-label position="stacked">Nombre</ion-label>
    <ion-input [(ngModel)]="name"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="stacked">Correo</ion-label>
    <ion-input [(ngModel)]="email" type="email"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="stacked">Programa</ion-label>
    <ion-input [(ngModel)]="program"></ion-input>
  </ion-item>

  <ion-button expand="block" (click)="saveStudent()">Guardar</ion-button>
</ion-content>
```

---

## Paso 7: Ver detalle de estudiante

Archivo `detail.page.ts`:

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html'
})
export class DetailPage implements OnInit {
  student: Student | undefined;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = await this.studentService.getStudentById(id);
  }
}
```

Archivo `detail.page.html`:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Detalle del Estudiante</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <div *ngIf="student">
    <h2>{{ student.name }}</h2>
    <p><strong>Correo:</strong> {{ student.email }}</p>
    <p><strong>Programa:</strong> {{ student.program }}</p>
  </div>
</ion-content>
```

---

## Paso 8: Prueba en dispositivo

1. Construir la aplicación
```bash
ionic build
npx cap sync
```

2. Abrir en Android Studio
```bash
npx cap open android
```

3. Ejecutar en un dispositivo físico conectado.

---

## Resultado esperado
- El usuario abre la aplicación y ve la lista de estudiantes (vacía al inicio).  
- Puede registrar un estudiante llenando el formulario.  
- El estudiante queda almacenado en el dispositivo gracias a Capacitor Storage.  
- Puede consultar la lista y ver el detalle.  

---

## Reflexión final
Este ejercicio demuestra cómo aplicar Ionic y Capacitor en un caso práctico, con almacenamiento local y navegación completa. Representa un paso inicial para aplicaciones más complejas en CORHUILA.
