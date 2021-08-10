import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickDeleteComponent } from './quick-delete.component';

describe('QuickDeleteComponent', () => {
  let component: QuickDeleteComponent;
  let fixture: ComponentFixture<QuickDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
