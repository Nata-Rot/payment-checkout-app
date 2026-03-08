export const wompiService = {
  tokenizeCard: jest.fn().mockResolvedValue({ data: { id: 'tok_test' } }),
  getAcceptanceToken: jest.fn().mockResolvedValue('acc_token_test'),
};