import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APlayerComponent } from './a-player.component';

describe('APlayerComponent', () => {
  let component: APlayerComponent;
  let fixture: ComponentFixture<APlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
