import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'image-drop',
  templateUrl: './image-drop.component.html',
  styleUrl: './image-drop.component.scss',
})
export class ImageDropComponent {
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

