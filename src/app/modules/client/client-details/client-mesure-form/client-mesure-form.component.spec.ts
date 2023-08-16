import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMesureFormComponent } from './client-mesure-form.component';

describe('ClientMesureFormComponent', () => {
  let component: ClientMesureFormComponent;
  let fixture: ComponentFixture<ClientMesureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMesureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMesureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
