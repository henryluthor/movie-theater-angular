import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moviepage2Component } from './moviepage2.component';

describe('Moviepage2Component', () => {
  let component: Moviepage2Component;
  let fixture: ComponentFixture<Moviepage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Moviepage2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Moviepage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
