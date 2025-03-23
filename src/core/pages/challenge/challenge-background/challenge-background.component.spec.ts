import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeBackgroundComponent } from './challenge-background.component';

describe('ChallengeBackgroundComponent', () => {
  let component: ChallengeBackgroundComponent;
  let fixture: ComponentFixture<ChallengeBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
