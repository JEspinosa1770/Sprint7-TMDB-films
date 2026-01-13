import { FilmDetail } from './film-detail';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Auth } from '@angular/fire/auth';

// Mock de UserService de Firebase
const mockUserService = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn()
};

describe('FilmDetail', () => {
  let component: FilmDetail;
  let fixture: ComponentFixture<FilmDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmDetail],
      providers: [
        provideRouter([
          { path: 'list', component: FilmDetail },
          { path: '', component: FilmDetail },
          { path: '**', redirectTo: '' } 
        ]),
        { provide: Auth, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilmDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
