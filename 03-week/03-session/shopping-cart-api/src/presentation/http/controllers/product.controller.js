import { PrismaProductRepository } from "../../../infrastructure/repositories/PrismaProductRepository.js";
import { ProductRequestDto } from "../../../domain/dtos/ProductRequestDto.js";
import { CreateProduct } from "../../../application/product/CreateProduct.js";
import { UpdateProduct } from "../../../application/product/UpdateProduct.js";
import { GetAllProducts } from "../../../application/product/GetAllProducts.js";
import { GetProductById } from "../../../application/product/GetProductById.js";
import { DeleteProduct } from "../../../application/product/DeleteProduct.js";

export class ProductController {
  static async create(req, res) {
    try {
      const dto = new ProductRequestDto(req.body);
      const repo = new PrismaProductRepository();
      const useCase = new CreateProduct(repo);
      const result = await useCase.execute(dto);
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const dto = new ProductRequestDto(req.body);
      const repo = new PrismaProductRepository();
      const useCase = new UpdateProduct(repo);
      const result = await useCase.execute(id, dto);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const repo = new PrismaProductRepository();
      const useCase = new GetAllProducts(repo);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const repo = new PrismaProductRepository();
      const useCase = new GetProductById(repo);
      const result = await useCase.execute(id);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const repo = new PrismaProductRepository();
      const useCase = new DeleteProduct(repo);
      const result = await useCase.execute(id);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
