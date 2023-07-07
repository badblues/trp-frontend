import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserPageComponent } from './create-user-page.component';

describe('CreateUserPageComponent', () => {
  let component: CreateUserPageComponent;
  let fixture: ComponentFixture<CreateUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
