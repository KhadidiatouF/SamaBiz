export interface PaymentRequest {
  companyId: string;
  amount: number;
  reference: string;
}

export interface PaymentResult {
  providerReference: string;
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED';
}

export interface IPaymentService {
  initiatePayment(request: PaymentRequest): Promise<PaymentResult>;
  verifyPayment(providerReference: string): Promise<PaymentResult>;
}
