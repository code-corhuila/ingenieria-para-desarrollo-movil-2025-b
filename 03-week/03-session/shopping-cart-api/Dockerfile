# Imagen base ligera de Node
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar e instalar dependencias
COPY package*.json ./
RUN npm install --omit=dev

# Copiar todo el código
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Exponer el puerto de la API
EXPOSE 3000

# Ejecutar migraciones, seed y luego iniciar el servidor
CMD sh -c "npx prisma migrate deploy && npm run seed && npm start"
