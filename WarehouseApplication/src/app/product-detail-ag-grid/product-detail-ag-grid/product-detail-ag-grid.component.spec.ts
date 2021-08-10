import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailAgGridComponent } from './product-detail-ag-grid.component';

describe('ProductDetailAgGridComponent', () => {
  let component: ProductDetailAgGridComponent;
  let fixture: ComponentFixture<ProductDetailAgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailAgGridComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
