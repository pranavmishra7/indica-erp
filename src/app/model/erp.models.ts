// Purchase Order Models
export interface PurchaseOrder {
  id: string;
  poNumber: string;
  poDate: string;
  vendor: Vendor;
  category: string;
  status: 'Unauthorised' | 'Authorised' | 'Printed' | 'Released' | 'Cancelled';
  items: POItem[];
  totalValue: number;
  currency: string;
  paymentTerms: string;
  shippingAddress: string;
  remarks?: string;
  amendments?: Amendment[];
}

export interface Amendment {
  id: string;
  amendmentNo: number;
  amendmentDate: string;
  amendedBy: string;
  reason: string;
  changes: AmendmentChange[];
}

export interface AmendmentChange {
  field: string;
  oldValue: any;
  newValue: any;
  description: string;
}

export interface POItem {
  id: string;
  itemCode: string;
  itemName: string;
  hsnCode: string;
  description: string;
  quantity: number;
  uom: string;
  rate: number;
  discount: number;
  gst: number;
  amount: number;
}

export interface Vendor {
  id: string;
  code: string;
  name: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
}

// Work Centre Models
export interface WorkCentre {
  id: string;
  code: string;
  name: string;
  division: string;
  department: string;
  type: 'Store' | 'Process' | 'Inside' | 'Outside';
  storeNumber?: string;
  capacity?: number;
  status: 'Active' | 'Inactive';
}

// Routing Models
export interface RouteSheet {
  id: string;
  routeSheetNo: string;
  operationNo: string;
  operationDescription: string;
  workCentre: string;
  masterRoute: boolean;
  startDate: string;
  endDate?: string;
  bomItems: BOMItem[];
  timeDetails: TimeDetails;
  createdBy: string;
  createdDate: string;
  updatedBy?: string;
  updatedDate?: string;
}

export interface BOMItem {
  id: string;
  itemCode: string;
  itemDescription: string;
  quantity: number;
  uom: string;
  usage: number;
  rejectionPercentage: number;
}

export interface TimeDetails {
  setupTime: number;
  runTime: number;
  moveTime: number;
  toolChangeTime: number;
  setupCrew: number;
  runCrew: number;
  helperCrew: number;
  timeUnit: 'Hours' | 'Minutes' | 'Seconds';
}

// Navigation
export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}
