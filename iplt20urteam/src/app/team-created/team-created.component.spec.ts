import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreatedComponent } from './team-created.component';

describe('TeamCreatedComponent', () => {
  let component: TeamCreatedComponent;
  let fixture: ComponentFixture<TeamCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
