/// <summary>
/// DTO de salida para una orden creada.
/// Devuelve ID de orden y total.
/// </summary>
export class CreateOrderResponseDto {
  constructor({ id, userId, totalCents, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.totalCents = totalCents;
    this.createdAt = createdAt;
  }
}
