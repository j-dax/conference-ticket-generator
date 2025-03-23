import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDropComponent } from './image-drop.component'

describe('FileDropComponent', () => {
  let component: ImageDropComponent;
  let fixture: ComponentFixture<ImageDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDropComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
