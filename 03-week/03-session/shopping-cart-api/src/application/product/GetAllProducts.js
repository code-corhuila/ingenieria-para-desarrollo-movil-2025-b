import { ProductResponseDto } from "../../domain/dtos/ProductResponseDto.js";

export class GetAllProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    const products = await this.productRepository.findAll();
    return products.map(p => new ProductResponseDto(p));
  }
}