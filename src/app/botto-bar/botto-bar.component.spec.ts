import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottoBarComponent } from './botto-bar.component';

describe('BottoBarComponent', () => {
  let component: BottoBarComponent;
  let fixture: ComponentFixture<BottoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottoBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
