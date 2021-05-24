import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityViewComponent } from './charity-view.component';

describe('CharityViewComponent', () => {
  let component: CharityViewComponent;
  let fixture: ComponentFixture<CharityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
