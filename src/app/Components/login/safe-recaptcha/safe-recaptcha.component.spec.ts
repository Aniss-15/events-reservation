import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeRecaptchaComponent } from './safe-recaptcha.component';

describe('SafeRecaptchaComponent', () => {
  let component: SafeRecaptchaComponent;
  let fixture: ComponentFixture<SafeRecaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SafeRecaptchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafeRecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
