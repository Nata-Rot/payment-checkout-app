import { apiService } from './api.service';

describe('ApiService', () => {
  it('existe el servicio', () => {
    expect(apiService).toBeDefined();
  });

  it('tiene metodo get', () => {
    expect(typeof apiService.get).toBe('function');
  });

  it('tiene metodo post', () => {
    expect(typeof apiService.post).toBe('function');
  });
});