import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { WorkCentre } from '../model/erp.models';
import { workCentresData } from '../model/data/workcentres.data';

@Component({
  selector: 'app-workcentre',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="wc-container">
      <div class="page-header">
        <div>
          <h1>Work Centres</h1>
          <p class="subtitle">Manage production and storage work centres</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Work Centre
        </button>
      </div>

      <div class="wc-grid">
        <mat-card *ngFor="let wc of workCentres" class="wc-card">
          <mat-card-header>
            <div class="wc-header">
              <div>
                <mat-card-title>{{ wc.name }}</mat-card-title>
                <mat-card-subtitle>{{ wc.code }}</mat-card-subtitle>
              </div>
              <mat-chip-set>
                <mat-chip [highlighted]="true">{{ wc.type }}</mat-chip>
              </mat-chip-set>
            </div>
          </mat-card-header>
          <mat-card-content>
            <div class="wc-details">
              <div class="detail-row">
                <mat-icon class="detail-icon">business</mat-icon>
                <div>
                  <small>Division</small>
                  <p>{{ wc.division }}</p>
                </div>
              </div>
              <div class="detail-row">
                <mat-icon class="detail-icon">folder</mat-icon>
                <div>
                  <small>Department</small>
                  <p>{{ wc.department }}</p>
                </div>
              </div>
              <div class="detail-row" *ngIf="wc.capacity">
                <mat-icon class="detail-icon">inventory</mat-icon>
                <div>
                  <small>Capacity</small>
                  <p>{{ wc.capacity }} units</p>
                </div>
              </div>
              <div class="detail-row" *ngIf="wc.storeNumber">
                <mat-icon class="detail-icon">store</mat-icon>
                <div>
                  <small>Store Number</small>
                  <p>{{ wc.storeNumber }}</p>
                </div>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">
              <mat-icon>edit</mat-icon>
              Edit
            </button>
            <button mat-button>
              <mat-icon>visibility</mat-icon>
              View Details
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .wc-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-lg);
    }

    .page-header h1 {
      margin: 0 0 var(--spacing-xs) 0;
    }

    .subtitle {
      color: var(--gray-600);
      margin: 0;
    }

    .wc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--spacing-lg);
    }

    .wc-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .wc-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .wc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    ::ng-deep .wc-card mat-card-title {
      font-size: 1.125rem;
      margin-bottom: 4px;
    }

    ::ng-deep .wc-card mat-card-subtitle {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .wc-details {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-top: var(--spacing-md);
    }

    .detail-row {
      display: flex;
      gap: var(--spacing-md);
      align-items: flex-start;
    }

    .detail-icon {
      color: var(--primary-600);
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .detail-row small {
      display: block;
      font-size: 0.75rem;
      color: var(--gray-500);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .detail-row p {
      margin: 4px 0 0 0;
      font-size: 0.875rem;
      color: var(--gray-800);
      font-weight: 500;
    }

    mat-card-actions {
      padding: var(--spacing-md);
      border-top: 1px solid var(--gray-200);
      display: flex;
      gap: var(--spacing-sm);
    }

    @media (max-width: 768px) {
      .wc-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WorkCentreComponent implements OnInit {
  workCentres: WorkCentre[] = [];

  ngOnInit(): void {
    this.workCentres = workCentresData;
  }
}
