import { ProductResponseDto } from "../../domain/dtos/ProductResponseDto.js";

export class GetProductById {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.findById(id);
    if (!product) throw { status: 404, message: "Producto no encontrado" };
    return new ProductResponseDto(product);
  }
}