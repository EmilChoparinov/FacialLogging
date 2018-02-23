import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectNavComponent } from './subject-nav.component';

describe('SubjectNavComponent', () => {
  let component: SubjectNavComponent;
  let fixture: ComponentFixture<SubjectNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
