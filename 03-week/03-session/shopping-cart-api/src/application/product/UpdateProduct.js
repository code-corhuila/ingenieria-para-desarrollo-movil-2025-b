import { ProductResponseDto } from "../../domain/dtos/ProductResponseDto.js";

export class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, dto) {
    const product = await this.productRepository.update(id, dto);
    return new ProductResponseDto(product);
  }
}
