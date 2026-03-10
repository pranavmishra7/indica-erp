import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="dashboard">
      <div class="page-header">
        <h1>Dashboard</h1>
        <p class="subtitle">Welcome to Indica Industries ERP System</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: var(--primary-100);">
            <mat-icon style="color: var(--primary-600);">shopping_cart</mat-icon>
          </div>
          <div class="stat-content">
            <h3>12</h3>
            <p>Active Purchase Orders</p>
            <a routerLink="/purchaseorder" class="stat-link">View All →</a>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #e8f5e9;">
            <mat-icon style="color: var(--success);">check_circle</mat-icon>
          </div>
          <div class="stat-content">
            <h3>8</h3>
            <p>Approved This Month</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #fff3e0;">
            <mat-icon style="color: var(--warning);">pending</mat-icon>
          </div>
          <div class="stat-content">
            <h3>3</h3>
            <p>Pending Approval</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #f3e5f5;">
            <mat-icon style="color: #9c27b0;">factory</mat-icon>
          </div>
          <div class="stat-content">
            <h3>7</h3>
            <p>Active Work Centres</p>
            <a routerLink="/workcentre" class="stat-link">View All →</a>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <mat-card class="recent-card">
          <mat-card-header>
            <mat-card-title>Recent Purchase Orders</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="po-list">
              <div class="po-item">
                <div class="po-info">
                  <strong>PO #DI5019501</strong>
                  <span class="po-vendor">MILLS & METALS CORPORATION</span>
                </div>
                <span class="badge badge-warning">Unauthorised</span>
              </div>
              <div class="po-item">
                <div class="po-info">
                  <strong>PO #DI5019502</strong>
                  <span class="po-vendor">SUPREME POLYMERS LTD</span>
                </div>
                <span class="badge badge-success">Authorised</span>
              </div>
              <div class="po-item">
                <div class="po-info">
                  <strong>PO #DI5019503</strong>
                  <span class="po-vendor">TECHNO CHEMICALS INC</span>
                </div>
                <span class="badge badge-info">Released</span>
              </div>
            </div>
            <button mat-button color="primary" routerLink="/purchaseorder" class="view-all-btn">
              View All Orders
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card class="quick-actions-card">
          <mat-card-header>
            <mat-card-title>Quick Actions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="action-buttons">
              <button mat-raised-button color="primary" routerLink="/purchaseorder">
                <mat-icon>add</mat-icon>
                New Purchase Order
              </button>
              <button mat-raised-button routerLink="/workcentre">
                <mat-icon>factory</mat-icon>
                Manage Work Centres
              </button>
              <button mat-raised-button routerLink="/routing">
                <mat-icon>route</mat-icon>
                Create Route Sheet
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: var(--spacing-lg);
    }

    .page-header h1 {
      margin: 0 0 var(--spacing-xs) 0;
      color: var(--gray-900);
    }

    .subtitle {
      color: var(--gray-600);
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);
    }

    .stat-card {
      background: white;
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-200);
      display: flex;
      gap: var(--spacing-md);
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .stat-content p {
      margin: 4px 0;
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .stat-link {
      color: var(--primary-600);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      display: inline-block;
      margin-top: 4px;
    }

    .stat-link:hover {
      color: var(--primary-700);
      text-decoration: underline;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--spacing-md);
    }

    mat-card {
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-200);
    }

    ::ng-deep mat-card-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
    }

    .po-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin: var(--spacing-md) 0;
    }

    .po-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      background: var(--gray-50);
      border-radius: var(--radius-md);
    }

    .po-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .po-info strong {
      color: var(--gray-900);
      font-size: 0.875rem;
    }

    .po-vendor {
      color: var(--gray-600);
      font-size: 0.75rem;
    }

    .view-all-btn {
      width: 100%;
      margin-top: var(--spacing-md);
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-top: var(--spacing-md);
    }

    .action-buttons button {
      justify-content: flex-start;
    }

    @media (max-width: 968px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {}
