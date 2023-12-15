export interface PaymentMetadata {
  title: string;
  id: number;
  quantity: number;
  pricePerItem: number;
}

export class PaymentInfo {
  constructor(public items: PaymentMetadata[], public total: number) {}
}
