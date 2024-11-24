import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moviepage1Component } from './moviepage1.component';

describe('Moviepage1Component', () => {
  let component: Moviepage1Component;
  let fixture: ComponentFixture<Moviepage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Moviepage1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Moviepage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
