# Indica Industries ERP System

A modern, professional ERP system built with Angular 18, featuring a clean white and blue theme for manufacturing and operations management.

## Features

### ✨ Modern UI/UX
- **Professional Theme**: Clean white and blue color scheme
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Material Design**: Built with Angular Material components
- **Hamburger Navigation**: Easy-to-use side navigation menu

### 📋 Modules Implemented

#### 1. Dashboard
- Overview statistics
- Recent purchase orders
- Quick actions
- System status indicators

#### 2. Purchase Orders
- **Tabs**: Other Details, Items, Spec, Cancel PO, Amend
- List view with status badges
- Detailed item management
- Vendor information tracking
- Real-time calculations
- Sample JSON data with 3 purchase orders

#### 3. Work Centres
- Grid view of work centres
- Division and department categorization
- Store and process type management
- Capacity tracking
- Sample JSON data with 7 work centres

#### 4. Routing & BOM
- **Tabs**: Operation Details, BOM Items, History
- Route sheet management
- Master/Standard route distinction
- Time and crew details
- Bill of Materials tracking
- Sample JSON data with 4 route sheets

## Technology Stack

- **Framework**: Angular 18 (Latest)
- **UI Library**: Angular Material 18
- **Forms**: Reactive Forms
- **Routing**: Lazy-loaded routes
- **Language**: TypeScript 5.5
- **Styling**: Custom CSS with CSS Variables

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard.component.ts          # Dashboard with stats
│   │   ├── purchaseorder.component.ts      # PO module with tabs
│   │   ├── workcentre.component.ts         # Work centres grid
│   │   └── routing.component.ts            # Routing & BOM
│   ├── model/
│   │   ├── erp.models.ts                   # TypeScript interfaces
│   │   └── data/
│   │       ├── purchase-orders.json        # Sample PO data
│   │       ├── workcentres.json            # Sample WC data
│   │       └── routesheets.json            # Sample routing data
│   ├── app.component.*                     # Main shell with sidebar
│   └── app.routes.ts                       # Route configuration
├── styles.css                              # Global theme styles
└── index.html

NO HYPHENS IN FOLDER NAMES ✓
```

## Installation

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm start
   ```

3. **Open browser**
   - Navigate to `http://localhost:4200`

4. **Build for production**
   ```bash
   npm run build
   ```

## Features by Module

### Purchase Orders
- ✅ Sidebar list with status badges
- ✅ Multi-tab interface (Other Details, Items, Spec, Cancel PO, Amend)
- ✅ Form validation
- ✅ Item table with calculations
- ✅ Vendor details display
- ✅ Status management (Unauthorised, Authorised, Released, etc.)
- ✅ Sample data with 3 POs

### Work Centres
- ✅ Card-based grid layout
- ✅ Division/Department filtering
- ✅ Type indicators (Store, Process, Inside, Outside)
- ✅ Capacity display
- ✅ Sample data with 7 work centres

### Routing & BOM
- ✅ Route sheet list with master/standard indicators
- ✅ Operation details with time management
- ✅ BOM items table
- ✅ Crew configuration
- ✅ History tracking (created/updated)
- ✅ Sample data with 4 route sheets

## Color Scheme

```css
Primary Blue: #2196f3
Accent Blue: #1976d2
White: #ffffff
Gray Scale: #f5f5f5 to #212121
Success: #4caf50
Warning: #ff9800
Error: #f44336
```

## Navigation

- **Hamburger Menu** - Click menu icon to open sidebar
- **Dashboard** - System overview
- **Purchase Orders** - Manage POs with badge count
- **Work Centres** - View and manage work centres
- **Routing & BOM** - Route sheets and materials

## Sample Data

### Purchase Orders (3 records)
- PO #DI5019501 - MILLS & METALS CORPORATION - Unauthorised
- PO #DI5019502 - SUPREME POLYMERS LTD - Authorised
- PO #DI5019503 - TECHNO CHEMICALS INC - Released

### Work Centres (7 records)
- Finished Goods Store, Lamination, Cutting, QC Lab, Packaging, Raw Material Store, External Printing

### Route Sheets (4 records)
- Lamination, Cutting, Stitching, Packing operations

## Development

### Add New Module
1. Create component in `src/app/components/`
2. Add route in `src/app/app.routes.ts`
3. Add menu item in `app.component.ts`

### Add New Data
1. Create JSON file in `src/app/model/data/`
2. Define interface in `src/app/model/erp.models.ts`
3. Import in component

### Customize Theme
Edit CSS variables in `src/styles.css`:
```css
:root {
  --primary-600: #your-color;
  /* ... */
}
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Future Enhancements
- Backend API integration
- Authentication & authorization
- Advanced search and filtering
- Export to Excel/PDF
- Real-time notifications
- Multi-language support
- Dark mode

## License
© 2026 Indica Industries Pvt. Ltd.

## Support
For questions or issues, contact the development team.
