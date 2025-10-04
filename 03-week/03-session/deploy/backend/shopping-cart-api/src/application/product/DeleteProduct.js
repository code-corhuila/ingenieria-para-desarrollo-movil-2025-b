export class DeleteProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    await this.productRepository.delete(id);
    return { success: true };
  }
}