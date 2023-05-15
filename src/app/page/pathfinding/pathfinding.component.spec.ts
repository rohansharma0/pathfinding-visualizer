import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfindingComponent } from './pathfinding.component';

describe('PathfindingComponent', () => {
  let component: PathfindingComponent;
  let fixture: ComponentFixture<PathfindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathfindingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathfindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
