import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Shopping Cart API",
    description: "Documentación generada automáticamente con swagger-autogen",
    version: "1.0.0"
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; 
const endpointsFiles = ["./src/app.js"]; // Archivo donde montas tus rutas

swaggerAutogen()(outputFile, endpointsFiles, doc);
