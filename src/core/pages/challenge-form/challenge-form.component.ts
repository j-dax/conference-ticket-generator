import { CommonModule } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-image-selector',
  template: `
<div
  class="filedrop"
  (dragover)="onDragOver($event)"
  (drop)="onDrop($event)"
  (click)="fileInput.click()"
>
  <input
    type="file"
    accept="image/*"
    (change)="onChange($event)"
    hidden
    #fileInput
  />
  <!--<p>{{ "I10N.UPLOAD_PLACEHOLDER" }}</p>-->
  <div *ngIf="imageName() && (selectedFile || imagePreview())">
    <img
      [src]="imagePreview()"
      alt="Image Preview"
    >
    <p><span>{{ imageName() }}</span>({{fileSize()}} KB)</p>
    <img alt="TODO: DELETE BUTTON">
  </div>
  <div *ngIf="!selectedFile">
    <div class="image-backdrop">
      <img alt="Upload icon" src="challenge-assets/images/icon-upload.svg">
    </div>
    <p>Drag and drop or click to upload</p>
  </div>
</div>`,
  styles: `
.image-backdrop {
  margin: auto;
  width: 50px;

  background-color: hsl(252, 6%, 83% / 0.99);

  border: 2px solid var(--neutral-300);
  border-radius: 12px;
}
.image-backdrop+p { color: var(--neutral-700); }
.image-backdrop>img { width: 50px; }
.filedrop {
  align-content: center;
  background-color: hsl(252, 6%, 83% / 0.9);

  border: 2px dashed var(--neutral-300);
  border-radius: 8px;

  display:flex;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 8px;
  text-align: center;
}
`,
})
export class ImageDrop {
  // TODO: Internationalization
  imageName = signal('');
  imagePreview = signal('');
  fileSize = signal('');
  selectedFile: File | null = null;

  onChange(event: Event) {
    if (event.type === 'change' && event.target instanceof HTMLInputElement) {
      this.onFileChange(event.target.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.onFileChange(event.dataTransfer?.files);
  }

  onFileChange(files: any) {
    this.selectedFile = files[0] ?? null;
    if (this.selectedFile == null) return;

    const reader = new FileReader();
    reader.onload = e => this.imagePreview.set((e.target?.result ?? "") as string);
    reader.readAsDataURL(this.selectedFile);

    this.imageName.set(this.selectedFile.name);
    this.fileSize.set((this.selectedFile.size / 1000).toFixed(1));
  }
}

@Component({
  imports: [ImageDrop],
  selector: 'app-challenge-form',
  // templateUrl: './challenge-form.component.html',
  template: `
<form>
  <label>Upload Avatar</label>
  <app-image-selector />
  <span>ⓘ  Upload your photo (JPG or PNG, max size: 500KB).</span>

  <label for="user-full-name">Full Name</label>
  <input id="user-full-name" name="user-full-name" type="text" placeholder="Mona the Octocat" />

  <label for="user-email">Email Address</label>
  <input id="user-email" name="user-email" type="text" placeholder="monatheoctocat@example.com" />

  <label for="user-github">GitHub Username</label>
  <input id="user-github" name="user-github" type="text" placeholder="MonaTheOctocat" />

  <button (click)="onSubmit($event)">Generate My Ticket</button>
</form>
`,
  // styleUrl: './challenge-form.component.scss'
  styles: `
app-image-selector { min-width: 100%; }
app-image-selector + span {
  font-weight: 400;
  color: var(--neutral-700);
}
form {
  box-sizing: border-box;

  padding: 16px 8px 16px 8px;
  min-width: 300px;
  max-width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  align-self: flex-start;

  font-size: 20px;
  font-weight: 500;

  margin: 16px 0 8px 8px;
  width: 99vw;
}
form > input {
  height: 40px;
  width: calc(100% - 20px);

  border: 2px solid var(--neutral-300);
  border-radius: 8px;

  padding: 8px 0px 8px 16px;

  font-weight: 500;
}
form > input::placeholder {
  font-weight: 500;
  font-size: 1rem;

  margin: 4px;
}
button {
  background-color: var(--orange-500);
  border: 2px solid var(--orange-500);
  border-radius: 8px;
  color: black;
  font-weight: 800;
  margin-top: 16px;
  min-height: 48px;
  width: 100%;
}
@media (min-width: 1440px) { // selected wrt the ⓘ nformation dialog
  form { width: 33vw; }
}
`
})
export class ChallengeFormComponent {
  fileDrop = viewChild.required(ImageDrop);

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.fileDrop().selectedFile);
  }
}

