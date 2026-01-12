import { TestBed } from '@angular/core/testing';

import { Api } from './api';

describe('Api Service', () => {
  let service: Api;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api);
  });

  describe('getFilmsBlock', () => {
    it('should obtain popular movies', async () => {
      const mockResponse = {
        page: 1,
        results: [{ id: 1, title: 'Test Movie' }],
        total_pages: 10
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const result = await service.getFilmsBlock(1);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalled();
    });

    it('should return error when answer is not ok', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(service.getFilmsBlock(1))
        .rejects.toThrow('HTTP error! status: 404');
    });
  });

  describe('getImageUrl', () => {
    it('should return a valid image URL', () => {
      const result = service.getImageUrl('/test.jpg', 'w500');
      expect(result).toBe('https://image.tmdb.org/t/p/w500/test.jpg');
    });

    it('should return an error image when the path is null', () => {
      const result = service.getImageUrl(null);
      expect(result).toBe('error1.png');
    });
  });

  describe('getFilmDetails', () => {
    it('should get film details correctly', async () => {
      const mockDetails = {
        id: 123,
        title: 'Test Movie',
        credits: { cast: [] },
        similar: { results: [] }
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockDetails
      });

      const result = await service.getFilmDetails(123);

      expect(result).toEqual(mockDetails);
    });
  });
});
