import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSelectedComponent } from './movie-selected.component';

describe('MovieSelectedComponent', () => {
  let component: MovieSelectedComponent;
  let fixture: ComponentFixture<MovieSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
