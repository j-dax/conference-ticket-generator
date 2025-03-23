import { Component, viewChild } from '@angular/core';
import { ImageDropComponent } from '../../../components/image-drop/image-drop.component';
import { ChallengeBackgroundComponent } from '../challenge-background/challenge-background.component';

@Component({
  imports: [ImageDropComponent, ChallengeBackgroundComponent],
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrl: './challenge-form.component.scss',
})
export class ChallengeFormComponent {
  imageDrop = viewChild.required(ImageDropComponent);

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.imageDrop().selectedFile);
  }
}
