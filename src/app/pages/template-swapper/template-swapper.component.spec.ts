import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSwapperComponent } from './template-swapper.component';

describe('TemplateSwapperComponent', () => {
  let component: TemplateSwapperComponent;
  let fixture: ComponentFixture<TemplateSwapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSwapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateSwapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
