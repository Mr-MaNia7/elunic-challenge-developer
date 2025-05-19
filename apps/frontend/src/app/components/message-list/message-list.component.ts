import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { UserMessage } from '../../models/user-message.model';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService as PrimeNGMessageService } from 'primeng/api';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    TagModule,
    ToastModule,
    RippleModule,
    SkeletonModule,
  ],
  providers: [PrimeNGMessageService],
  template: `
    <p-card header="Message History">
      <div class="message-list-container">
        <p-table
          [value]="messages"
          [rows]="3"
          [paginator]="true"
          [rowsPerPageOptions]="[3, 6, 9]"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} messages"
          [tableStyle]="{ 'min-width': '100%' }"
          [loading]="loading"
          styleClass="p-datatable-hoverable-rows"
          [rowHover]="true"
          responsiveLayout="stack"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-message>
            <tr>
              <td>
                <div class="message-field">
                  <span class="field-label">Name:</span>
                  <span>{{ message.name }}</span>
                </div>
              </td>
              <td>
                <div class="message-field">
                  <span class="field-label">Email:</span>
                  <a href="mailto:{{ message.email }}">{{ message.email }}</a>
                </div>
              </td>
              <td>
                <div class="message-field">
                  <span class="field-label">Message:</span>
                  <span class="message-content">{{ message.message }}</span>
                </div>
              </td>
              <td>
                <div class="message-field">
                  <span class="field-label">Date:</span>
                  <span>{{ message.createdAt | date : 'medium' }}</span>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="4" class="text-center">
                <div class="empty-state">
                  <i class="pi pi-inbox empty-icon"></i>
                  <p>No messages found</p>
                  <p-button
                    label="Refresh"
                    icon="pi pi-refresh"
                    (click)="loadMessages()"
                    pRipple
                    styleClass="p-button-outlined"
                  ></p-button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="loadingbody">
            <tr *ngFor="let _ of [1, 2, 3]">
              <td *ngFor="let _ of [1, 2, 3, 4]">
                <p-skeleton></p-skeleton>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="paginatorleft">
            <p-button
              type="button"
              icon="pi pi-refresh"
              (click)="loadMessages()"
              styleClass="p-button-text"
              pRipple
              pTooltip="Refresh messages"
              tooltipPosition="top"
            ></p-button>
          </ng-template>
        </p-table>
      </div>
    </p-card>
    <p-toast position="top-right"></p-toast>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 2rem;
      }

      .message-list-container {
        min-height: 400px;
      }

      .message-field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .field-label {
        font-weight: 600;
        color: #64748b;
        font-size: 0.875rem;
        display: none;
      }

      .message-content {
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 4.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 1rem;
        color: #64748b;
      }

      .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #94a3b8;
      }

      :host ::ng-deep {
        .p-datatable-wrapper {
          min-height: 300px;
        }

        .p-paginator {
          padding: 1rem;
        }

        .p-datatable.p-datatable-hoverable-rows
          .p-datatable-tbody
          > tr:not(.p-highlight):hover {
          background-color: #f1f5f9;
        }

        .p-datatable .p-datatable-tbody > tr > td {
          padding: 1rem;
          vertical-align: top;
        }

        @media screen and (max-width: 768px) {
          .p-datatable.p-datatable-responsive .p-datatable-tbody > tr > td {
            padding: 0.75rem 0.5rem;
          }

          .p-datatable.p-datatable-responsive
            .p-datatable-tbody
            > tr
            > td
            .p-column-title {
            display: none;
          }

          .field-label {
            display: inline-block;
          }
        }
      }
    `,
  ],
})
export class MessageListComponent implements OnInit {
  messages: UserMessage[] = [];
  loading = true;

  constructor(
    private messageService: MessageService,
    private primeNGMessageService: PrimeNGMessageService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messageService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.loading = false;
        this.primeNGMessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load messages. Please try again.',
          life: 3000,
        });
      },
    });
  }
}
