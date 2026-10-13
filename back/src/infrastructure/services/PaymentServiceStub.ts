import { IPaymentService, PaymentRequest, PaymentResult } from '../../application/services/IPaymentService.js';

export class PaymentServiceStub implements IPaymentService {
  async initiatePayment(request: PaymentRequest): Promise<PaymentResult> {
    return {
      providerReference: `stub-${request.companyId}-${request.reference}`,
      status: 'PENDING',
    };
  }

  async verifyPayment(providerReference: string): Promise<PaymentResult> {
    return { providerReference, status: 'PENDING' };
  }
}
