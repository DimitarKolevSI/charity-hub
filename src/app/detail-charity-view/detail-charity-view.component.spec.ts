import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCharityViewComponent } from './detail-charity-view.component';

describe('DetailCharityViewComponent', () => {
  let component: DetailCharityViewComponent;
  let fixture: ComponentFixture<DetailCharityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCharityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCharityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
