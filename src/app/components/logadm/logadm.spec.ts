import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logadm } from './logadm';

describe('Logadm', () => {
  let component: Logadm;
  let fixture: ComponentFixture<Logadm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logadm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logadm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
