import { ProductResponseDto } from "../../domain/dtos/ProductResponseDto.js";

/// <summary>
/// Caso de uso: Actualizar stock de un producto.
/// </summary>
export class UpdateProductStock {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute({ productId, newStock }) {
    if (newStock < 0) throw { status: 400, message: "Stock no puede ser negativo" };

    const product = await this.productRepository.updateStock(productId, newStock);
    return new ProductResponseDto(product);
  }
}
