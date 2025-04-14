import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFullModalComponent } from './menu-full-modal.component';

describe('MenuFullModalComponent', () => {
  let component: MenuFullModalComponent;
  let fixture: ComponentFixture<MenuFullModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFullModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFullModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
