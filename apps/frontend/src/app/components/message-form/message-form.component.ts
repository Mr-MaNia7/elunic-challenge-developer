import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { MessageService as PrimeNGMessageService } from 'primeng/api';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    Textarea,
    ButtonModule,
    CardModule,
    ToastModule,
    RippleModule,
    DividerModule,
  ],
  providers: [PrimeNGMessageService],
  template: `
    <p-card header="Send a Message">
      <form [formGroup]="messageForm" (ngSubmit)="onSubmit()">
        <div class="form-container">
          <div class="form-field">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              pInputText
              formControlName="name"
              placeholder="Enter your name"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  messageForm.get('name')?.invalid &&
                  messageForm.get('name')?.touched
              }"
            />
            <small
              *ngIf="
                messageForm.get('name')?.invalid &&
                messageForm.get('name')?.touched
              "
              class="text-danger"
            >
              Name is required
            </small>
          </div>

          <div class="form-field">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              pInputText
              formControlName="email"
              placeholder="Enter your email address"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  messageForm.get('email')?.invalid &&
                  messageForm.get('email')?.touched
              }"
            />
            <small
              *ngIf="
                messageForm.get('email')?.invalid &&
                messageForm.get('email')?.touched
              "
              class="text-danger"
            >
              Valid email is required
            </small>
          </div>

          <div class="form-field">
            <label for="message">Message</label>
            <textarea
              id="message"
              pInputTextarea
              formControlName="message"
              rows="5"
              placeholder="Type your message here"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  messageForm.get('message')?.invalid &&
                  messageForm.get('message')?.touched
              }"
            ></textarea>
            <small
              *ngIf="
                messageForm.get('message')?.invalid &&
                messageForm.get('message')?.touched
              "
              class="text-danger"
            >
              Message is required
            </small>
          </div>

          <div class="form-actions">
            <p-button
              type="submit"
              label="Submit"
              icon="pi pi-send"
              [disabled]="messageForm.invalid"
              styleClass="p-button-raised p-button-primary"
              pRipple
            ></p-button>
            <p-button
              type="reset"
              label="Reset"
              icon="pi pi-refresh"
              (click)="resetForm()"
              styleClass="p-button-raised p-button-secondary"
              pRipple
            ></p-button>
          </div>
        </div>
      </form>
    </p-card>
    <p-toast position="top-right"></p-toast>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 2rem;
      }

      .form-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-field {
        display: flex;
        flex-direction: column;
      }

      label {
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #495057;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      :host ::ng-deep {
        .p-button {
          margin-right: 0.5rem;
        }

        .p-button.p-button-primary {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .p-button.p-button-primary:hover {
          background: #2563eb;
          border-color: #2563eb;
        }

        .p-button.p-button-secondary {
          background: #64748b;
          border-color: #64748b;
        }

        .p-button.p-button-secondary:hover {
          background: #475569;
          border-color: #475569;
        }
      }
    `,
  ],
})
export class MessageFormComponent {
  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private primeNGMessageService: PrimeNGMessageService
  ) {
    this.messageForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.messageService.createMessage(this.messageForm.value).subscribe({
        next: () => {
          this.primeNGMessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Your message has been sent!',
            life: 3000,
          });
          this.messageForm.reset();
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.primeNGMessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to send your message. Please try again.',
            life: 3000,
          });
        },
      });
    } else {
      this.markFormGroupTouched(this.messageForm);
    }
  }

  resetForm(): void {
    this.messageForm.reset();
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
