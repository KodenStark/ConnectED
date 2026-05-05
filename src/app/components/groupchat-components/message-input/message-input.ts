import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  imports: [FormsModule],
  templateUrl: './message-input.html',
  styleUrl: './message-input.css',
})
export class MessageInput {
  @Input() disabled = false;
  @Input() placeholder = 'Write a post...';
  @Output() postSubmit = new EventEmitter<string>();

  body = '';
  submitting = signal(false);

  async onSubmit(): Promise<void> {
    const text = this.body.trim();
    if (!text || this.submitting()) return;
    this.submitting.set(true);
    this.postSubmit.emit(text);
    this.body = '';
    this.submitting.set(false);
  }
}
