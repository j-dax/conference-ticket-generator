import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTicketComponent } from './challenge-ticket.component';

describe('ChallengeTicketComponent', () => {
  let component: ChallengeTicketComponent;
  let fixture: ComponentFixture<ChallengeTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
