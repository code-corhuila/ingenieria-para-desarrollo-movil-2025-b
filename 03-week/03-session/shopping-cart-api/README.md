# 🛒 Shopping Cart API

## Descripción General
El presente proyecto corresponde al desarrollo de una **API RESTful para la gestión de un carrito de compras**, implementada en **Node.js** con el framework **Express**, utilizando **Prisma ORM** para la persistencia de datos en **MySQL**.  
El sistema se encuentra contenedorizado mediante **Docker Compose**, lo que garantiza portabilidad, facilidad de despliegue y replicabilidad del entorno de ejecución.

La aplicación ha sido diseñada bajo principios de **arquitectura limpia (Clean Architecture)**, favoreciendo la separación de responsabilidades, la mantenibilidad y la escalabilidad del sistema.

---

## Objetivos del Proyecto
- Implementar una API modular y extensible que soporte operaciones de gestión sobre un carrito de compras.
- Aplicar buenas prácticas de desarrollo en **Node.js**, incluyendo el uso de middlewares, controladores, servicios y repositorios.
- Demostrar la integración de **Prisma ORM** con **MySQL** en un entorno contenedorizado.
- Proporcionar documentación automática de los endpoints mediante **Swagger**.
- Servir como base práctica para la asignatura **Programación Móvil – CORHUILA 2025B**.

---

## Arquitectura del Proyecto

La estructura de carpetas responde a un enfoque basado en capas y dominios:

```
shopping-cart-api/
├── src/
│   ├── application/       # Casos de uso del negocio
│   ├── config/            # Configuraciones generales y de entorno
│   ├── core/              # Constantes, utilidades y helpers
│   ├── domain/            # Definición de entidades del dominio
│   ├── infrastructure/    # Adaptadores externos (Prisma, repositorios, DB)
│   ├── middlewares/       # Middlewares de Express
│   ├── presentation/      # Controladores y rutas expuestas
│   ├── app.js             # Configuración principal de Express
│   └── server.js          # Punto de arranque del servidor
├── prisma/                # Esquemas y migraciones de Prisma ORM
├── swagger.js             # Configuración de Swagger
├── swagger-output.json    # Esquema de documentación generado
├── docker-compose.yml     # Orquestación de servicios
├── package.json
├── .env
└── README.md
```

Este diseño busca la **independencia de las capas**, de tal forma que los casos de uso (application) no dependan directamente de la infraestructura (ORM, base de datos), garantizando mayor flexibilidad y mantenibilidad.

---

## Requisitos Previos

Para ejecutar el proyecto es necesario contar con:

- **Docker** y **Docker Compose** instalados en el sistema.
- Opcionalmente, **Node.js v18+** y **npm**, en caso de que se desee ejecutar fuera de contenedores.

---

## Ejecución del Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/code-corhuila/ingenieria-para-desarrollo-movil-2025-b.git
```

### 2. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto a partir del `.env.example`.  
Ejemplo de configuración mínima:

```env
PORT=3000
DATABASE_URL="mysql://sc_user:sc_pass@db:3306/shopping_cart"
JWT_SECRET=supersecretkey
```

> ⚠️ Importante: En local con Docker usa `db` como host de MySQL.  
> Si corres sin Docker, usa `localhost:3307` (ver puertos expuestos en `docker-compose.yml`).

### 3. Levantar servicios con Docker
```bash
docker-compose up --build
```

Este comando iniciará:
- **Base de Datos MySQL 8.4** (contenedor `sc_mysql`).
- **API Node.js** (contenedor `sc_api`).

Durante el arranque de la API se ejecutan automáticamente:
- Instalación de dependencias (`npm install`).
- Generación de cliente Prisma (`npx prisma generate`).
- Aplicación de migraciones (`npx prisma migrate deploy`).
- Ejecución de semillas de datos (`npx prisma db seed`).
- Inicio del servidor (`npm run dev`).

La API quedará disponible en:  
👉 `http://localhost:3000`

### 4. Ejecución sin Docker (opcional)
```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

En este caso la base de datos debe estar previamente levantada de forma manual.

---

## Documentación de la API

El proyecto incorpora **Swagger** para la documentación interactiva de los endpoints.  
Una vez en ejecución, la documentación estará disponible en:

👉 [http://localhost:3000/docs](http://localhost:3000/api-docs/#/)

---

## Consideraciones Finales

Este proyecto constituye un **ejemplo práctico de desarrollo backend** con tecnologías modernas, con el objetivo de fortalecer las competencias de los estudiantes en:

- Diseño modular de software.
- Manejo de entornos contenedorizados.
- Persistencia de datos con ORM en bases relacionales.
- Exposición y documentación de servicios mediante APIs RESTful.

La **Shopping Cart API** será consumida por aplicaciones móviles desarrolladas en **Ionic + Angular**, permitiendo a los estudiantes comprender de manera integral la interacción entre cliente y servidor en un contexto realista.

---
