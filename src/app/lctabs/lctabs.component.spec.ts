import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LctabsComponent } from './lctabs.component';

describe('LctabsComponent', () => {
  let component: LctabsComponent;
  let fixture: ComponentFixture<LctabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LctabsComponent]
    });
    fixture = TestBed.createComponent(LctabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
