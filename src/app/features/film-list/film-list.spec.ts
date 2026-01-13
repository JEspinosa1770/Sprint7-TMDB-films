
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FilmList } from './film-list';

// Mock de UserService de Firebase
const mockUserService = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn()
};

describe('FilmList', () => {
  let component: FilmList;
  let fixture: ComponentFixture<FilmList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmList],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilmList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
