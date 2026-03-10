import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { RouteSheet } from '../model/erp.models';
import { routeSheetsData } from '../model/data/routesheets.data';

@Component({
  selector: 'app-routing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTabsModule
  ],
  template: `
    <div class="routing-container">
      <div class="page-header">
        <div>
          <h1>Routing & BOM</h1>
          <p class="subtitle">Manage routing sheets and bill of materials</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Route Sheet
        </button>
      </div>

      <div class="routing-layout">
        <div class="routing-list">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Route Sheets</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="route-item" 
                   *ngFor="let route of routeSheets" 
                   [class.selected]="selectedRoute?.id === route.id"
                   (click)="selectRoute(route)">
                <div class="route-header">
                  <strong>{{ route.routeSheetNo }}</strong>
                  <mat-chip-set>
                    <mat-chip *ngIf="route.masterRoute" [highlighted]="true">Master</mat-chip>
                  </mat-chip-set>
                </div>
                <p class="route-operation">{{ route.operationDescription }}</p>
                <small class="route-wc">{{ route.workCentre }}</small>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="routing-main">
          <mat-card *ngIf="selectedRoute">
            <mat-card-header>
              <div class="route-title">
                <mat-card-title>{{ selectedRoute.routeSheetNo }}</mat-card-title>
                <mat-chip-set>
                  <mat-chip [highlighted]="selectedRoute.masterRoute">
                    {{ selectedRoute.masterRoute ? 'Master Route' : 'Standard Route' }}
                  </mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-header>

            <mat-card-content>
              <mat-tab-group>
                <mat-tab label="Operation Details">
                  <div class="tab-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <small>Operation No</small>
                        <p>{{ selectedRoute.operationNo }}</p>
                      </div>
                      <div class="info-item">
                        <small>Operation</small>
                        <p>{{ selectedRoute.operationDescription }}</p>
                      </div>
                      <div class="info-item">
                        <small>Work Centre</small>
                        <p>{{ selectedRoute.workCentre }}</p>
                      </div>
                      <div class="info-item">
                        <small>Start Date</small>
                        <p>{{ selectedRoute.startDate | date }}</p>
                      </div>
                      <div class="info-item" *ngIf="selectedRoute.endDate">
                        <small>End Date</small>
                        <p>{{ selectedRoute.endDate | date }}</p>
                      </div>
                    </div>

                    <div class="time-details">
                      <h3>Time Details</h3>
                      <div class="time-grid">
                        <div class="time-item">
                          <small>Setup Time</small>
                          <p>{{ selectedRoute.timeDetails.setupTime }} {{ selectedRoute.timeDetails.timeUnit }}</p>
                        </div>
                        <div class="time-item">
                          <small>Run Time</small>
                          <p>{{ selectedRoute.timeDetails.runTime }} {{ selectedRoute.timeDetails.timeUnit }}</p>
                        </div>
                        <div class="time-item">
                          <small>Move Time</small>
                          <p>{{ selectedRoute.timeDetails.moveTime }} {{ selectedRoute.timeDetails.timeUnit }}</p>
                        </div>
                        <div class="time-item">
                          <small>Tool Change</small>
                          <p>{{ selectedRoute.timeDetails.toolChangeTime }} {{ selectedRoute.timeDetails.timeUnit }}</p>
                        </div>
                      </div>

                      <h4>Crew Details</h4>
                      <div class="crew-grid">
                        <div class="crew-item">
                          <small>Setup Crew</small>
                          <p>{{ selectedRoute.timeDetails.setupCrew }}</p>
                        </div>
                        <div class="crew-item">
                          <small>Run Crew</small>
                          <p>{{ selectedRoute.timeDetails.runCrew }}</p>
                        </div>
                        <div class="crew-item">
                          <small>Helper Crew</small>
                          <p>{{ selectedRoute.timeDetails.helperCrew }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-tab>

                <mat-tab label="BOM Items">
                  <div class="tab-content">
                    <div class="table-container">
                      <table mat-table [dataSource]="selectedRoute.bomItems">
                        <ng-container matColumnDef="itemCode">
                          <th mat-header-cell *matHeaderCellDef>Item Code</th>
                          <td mat-cell *matCellDef="let item">{{ item.itemCode }}</td>
                        </ng-container>

                        <ng-container matColumnDef="description">
                          <th mat-header-cell *matHeaderCellDef>Description</th>
                          <td mat-cell *matCellDef="let item">{{ item.itemDescription }}</td>
                        </ng-container>

                        <ng-container matColumnDef="quantity">
                          <th mat-header-cell *matHeaderCellDef>Quantity</th>
                          <td mat-cell *matCellDef="let item" class="text-right">
                            {{ item.quantity | number:'1.2-2' }}
                          </td>
                        </ng-container>

                        <ng-container matColumnDef="uom">
                          <th mat-header-cell *matHeaderCellDef>UOM</th>
                          <td mat-cell *matCellDef="let item">{{ item.uom }}</td>
                        </ng-container>

                        <ng-container matColumnDef="usage">
                          <th mat-header-cell *matHeaderCellDef>Usage</th>
                          <td mat-cell *matCellDef="let item" class="text-right">
                            {{ item.usage | number:'1.7-7' }}
                          </td>
                        </ng-container>

                        <ng-container matColumnDef="rejection">
                          <th mat-header-cell *matHeaderCellDef>Rejection %</th>
                          <td mat-cell *matCellDef="let item" class="text-right">
                            {{ item.rejectionPercentage }}%
                          </td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="bomColumns"></tr>
                        <tr mat-row *matRowDef="let row; columns: bomColumns;"></tr>
                      </table>
                    </div>
                  </div>
                </mat-tab>

                <mat-tab label="History">
                  <div class="tab-content">
                    <div class="history-info">
                      <div class="history-item">
                        <mat-icon>person</mat-icon>
                        <div>
                          <small>Created By</small>
                          <p>{{ selectedRoute.createdBy }}</p>
                          <small>{{ selectedRoute.createdDate | date:'medium' }}</small>
                        </div>
                      </div>
                      <div class="history-item" *ngIf="selectedRoute.updatedBy">
                        <mat-icon>edit</mat-icon>
                        <div>
                          <small>Updated By</small>
                          <p>{{ selectedRoute.updatedBy }}</p>
                          <small>{{ selectedRoute.updatedDate | date:'medium' }}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-tab>
              </mat-tab-group>
            </mat-card-content>

            <mat-card-actions>
              <button mat-raised-button color="primary">
                <mat-icon>save</mat-icon>
                Save Changes
              </button>
              <button mat-raised-button>
                <mat-icon>content_copy</mat-icon>
                Copy Route
              </button>
              <button mat-raised-button>
                <mat-icon>print</mat-icon>
                Print
              </button>
            </mat-card-actions>
          </mat-card>

          <div *ngIf="!selectedRoute" class="empty-state">
            <mat-icon>route</mat-icon>
            <h3>No Route Sheet Selected</h3>
            <p>Select a route sheet from the list or create a new one</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .routing-container {
      max-width: 1600px;
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

    .routing-layout {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: var(--spacing-lg);
    }

    .routing-list mat-card-content {
      padding: 0;
    }

    .route-item {
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--gray-200);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .route-item:hover {
      background-color: var(--gray-50);
    }

    .route-item.selected {
      background-color: var(--primary-50);
      border-left: 3px solid var(--primary-600);
    }

    .route-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xs);
    }

    .route-operation {
      margin: var(--spacing-xs) 0;
      font-size: 0.875rem;
      color: var(--gray-700);
    }

    .route-wc {
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .route-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .tab-content {
      padding: var(--spacing-lg);
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .info-item small {
      display: block;
      font-size: 0.75rem;
      color: var(--gray-500);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .info-item p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--gray-900);
      font-weight: 500;
    }

    .time-details {
      margin-top: var(--spacing-xl);
    }

    .time-details h3, .time-details h4 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--gray-800);
    }

    .time-details h4 {
      margin-top: var(--spacing-lg);
    }

    .time-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);
    }

    .time-item, .crew-item {
      background: var(--gray-50);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      border: 1px solid var(--gray-200);
    }

    .time-item small, .crew-item small {
      display: block;
      font-size: 0.75rem;
      color: var(--gray-600);
      margin-bottom: 4px;
    }

    .time-item p, .crew-item p {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--primary-700);
    }

    .crew-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-md);
    }

    .history-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .history-item {
      display: flex;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--gray-50);
      border-radius: var(--radius-md);
      border: 1px solid var(--gray-200);
    }

    .history-item mat-icon {
      color: var(--primary-600);
    }

    .history-item small {
      display: block;
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .history-item p {
      margin: 4px 0;
      font-weight: 500;
      color: var(--gray-900);
    }

    mat-card-actions {
      padding: var(--spacing-lg);
      border-top: 1px solid var(--gray-200);
      display: flex;
      gap: var(--spacing-sm);
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-xl) * 2;
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .empty-state mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: var(--gray-400);
      margin-bottom: var(--spacing-md);
    }

    .empty-state h3 {
      margin: 0 0 var(--spacing-sm) 0;
      color: var(--gray-700);
    }

    .empty-state p {
      color: var(--gray-500);
      margin: 0;
    }

    @media (max-width: 1200px) {
      .routing-layout {
        grid-template-columns: 1fr;
      }

      .crew-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RoutingComponent implements OnInit {
  routeSheets: RouteSheet[] = [];
  selectedRoute: RouteSheet | null = null;
  bomColumns = ['itemCode', 'description', 'quantity', 'uom', 'usage', 'rejection'];

  ngOnInit(): void {
    this.routeSheets = routeSheetsData;
    if (this.routeSheets.length > 0) {
      this.selectedRoute = this.routeSheets[0];
    }
  }

  selectRoute(route: RouteSheet): void {
    this.selectedRoute = route;
  }
}
