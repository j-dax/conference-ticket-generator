import { Component, signal, viewChild, WritableSignal } from '@angular/core';
import { ImageDropComponent } from '../../../components/image-drop/image-drop.component';
import { ChallengeBackgroundComponent } from '../challenge-background/challenge-background.component';

type Validation = {
  validator: (input: string) => boolean;
  onFailureMessage: string;
};

@Component({
  imports: [ImageDropComponent, ChallengeBackgroundComponent],
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrl: './challenge-form.component.scss',
})
export class ChallengeFormComponent {
  imageDrop = viewChild.required(ImageDropComponent);
  nameField = signal('');
  nameFieldErrors = signal('');
  emailField = signal('');
  emailFieldErrors = signal('');
  githubField = signal('');
  githubFieldErrors = signal('');

  // Constructs a list, displayed as a tooltip
  validateChain(value: string, target: WritableSignal<string>, chain: Validation[]): boolean {
    let errors: string[] = [];
    for (let valid of chain) {
      if (!valid.validator(value ?? "")) {
        // \u2022; is a bullet point
        errors.push("\u2022 " + valid.onFailureMessage);
      }
    }
    target.set(errors.join("\n"));
    return errors.length == 0;
  }

  validateFile(): boolean { return false; }

  validateAll(): boolean {
    let errorCount = 0;
    if (!this.validateFile()) errorCount++;
    if (!this.validateChain(this.nameField(), this.nameFieldErrors, [
      { validator: s => s.length > 0, onFailureMessage: "Name must not be empty" },
    ])) errorCount++;
    if (!this.validateChain(this.emailField(), this.emailFieldErrors, [
      { validator: s => s.length > 0, onFailureMessage: "Email must not be empty" },
      { validator: s => /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(s), onFailureMessage: "Email must be valid" },
    ])) errorCount++;
    if (!this.validateChain(this.githubField(), this.githubFieldErrors, [
      { validator: s => s.length > 0, onFailureMessage: "Github username must not be empty" },
    ])) errorCount++;
    alert(`Found ${errorCount} errors`);
    return errorCount == 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.imageDrop().selectedFile);
    this.validateAll();
  }
}
