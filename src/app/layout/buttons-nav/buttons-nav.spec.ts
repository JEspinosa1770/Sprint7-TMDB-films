import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsNav } from './buttons-nav';

describe('ButtonsNav', () => {
  let component: ButtonsNav;
  let fixture: ComponentFixture<ButtonsNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
