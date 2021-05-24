import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharityPageComponent } from './edit-charity-page.component';

describe('EditCharityPageComponent', () => {
  let component: EditCharityPageComponent;
  let fixture: ComponentFixture<EditCharityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCharityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCharityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
