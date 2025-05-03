import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiteeComponent } from './recruitee.component';

describe('RecruiteeComponent', () => {
  let component: RecruiteeComponent;
  let fixture: ComponentFixture<RecruiteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
