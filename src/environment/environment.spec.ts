
import { environment } from './environment';

describe('Environment', () => {
  it('should be defined', () => {
    expect(environment).toBeTruthy();
  });

  it('should be production environment', () => {
    expect(environment.production).toBe(true);
  });

  it('should have firebase configuration', () => {
    expect(environment.firebaseConfig).toBeDefined();
    expect(environment.firebaseConfig.projectId).toBe('sprint7-tmdb');
  });
});
