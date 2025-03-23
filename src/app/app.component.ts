import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChallengeFormComponent } from '../core/pages/challenge-form/challenge-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChallengeFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'conference-ticket-generator';
}
