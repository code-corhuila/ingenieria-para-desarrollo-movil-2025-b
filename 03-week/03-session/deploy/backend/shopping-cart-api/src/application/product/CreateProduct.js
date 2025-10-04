import { ProductResponseDto } from "../../domain/dtos/ProductResponseDto.js";

export class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(dto) {
    const product = await this.productRepository.create(dto);
    return new ProductResponseDto(product);
  }
}
