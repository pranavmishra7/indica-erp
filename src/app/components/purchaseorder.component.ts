import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PurchaseOrder, POItem, Amendment, AmendmentChange } from '../model/erp.models';
import { purchaseOrdersData } from '../model/data/purchaseorders.data';

@Component({
  selector: 'app-purchaseorder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  filteredOrders: PurchaseOrder[] = [];
  selectedPO: PurchaseOrder | null = null;
  
  poForm!: FormGroup;
  itemsForm!: FormGroup;
  
  // Filter/Query options
  filterStatus: string = 'all';
  searchText: string = '';
  
  statuses = ['Unauthorised', 'Authorised', 'Printed', 'Released', 'Cancelled'];
  categories = ['DIRECT', 'INDIRECT', 'IMPORT'];
  currencies = ['INR', 'USD', 'EUR', 'GBP'];
  uomOptions = ['SQM', 'KGS', 'LTR', 'MTR', 'PCS', 'BOX'];
  
  // Current editing item
  editingItemIndex: number = -1;
  
  // Amendment tracking
  isAmending: boolean = false;
  amendmentReason: string = '';
  originalPOData: any = null;
  previewingChanges: boolean = false;
  detectedChanges: AmendmentChange[] = [];
  
  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.purchaseOrders = [...purchaseOrdersData];
    this.filteredOrders = [...this.purchaseOrders];
    this.initializeForms();
    
    if (this.purchaseOrders.length > 0) {
      this.selectPO(this.purchaseOrders[0]);
    }
    
    // Subscribe to form changes for auto-preview
    this.poForm.valueChanges.subscribe(() => {
      if (this.isAmending) {
        this.autoUpdatePreview();
      }
    });
  }

  initializeForms(): void {
    // Main PO Form
    this.poForm = this.fb.group({
      poNumber: ['', Validators.required],
      poDate: [new Date(), Validators.required],
      poEffDate: [new Date()],
      poEndDate: [''],
      poAmendDate: [''],
      vendorCode: ['', Validators.required],
      vendorName: [''],
      vendorContactPerson: [''],
      vendorPhone: [''],
      vendorEmail: [''],
      category: ['DIRECT'],
      status: ['Unauthorised'],
      currency: ['INR'],
      currencyConv: [1.000],
      paymentTerms: [''],
      modeOfTransport: ['BY ROAD'],
      priceBasis: ['FREIGHT EXTRA-AT ACTUAL'],
      shippingAddress: [''],
      remarks: [''],
      // PO Direction
      poDirection: ['OpenPO'],
      qualityAssured: [false],
      // GST Insurance
      insuranceType: ['None'],
      insurancePercentage: [0],
      insuranceValue: [0],
      gstInsuranceSGST: [0],
      gstInsuranceUGST: [0],
      gstInsuranceCGST: [0],
      gstInsuranceIGST: [0],
      // GST Freight
      freightType: ['None'],
      freightPercentage: [0],
      freightValue: [0],
      gstFreightSGST: [0],
      gstFreightUGST: [0],
      gstFreightCGST: [0],
      gstFreightIGST: [0],
      // Packing
      packingInPercent: [0],
      packingInValue: [0],
      // Others
      despatchBy: [''],
      banker: [''],
      spInstruction: [''],
      transporter: [''],
      deliverySchedule: [''],
      // Signatory
      signatoryName1: [''],
      designation1: [''],
      signatoryName2: [''],
      designation2: ['']
    });

    // Items Form
    this.itemsForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  get itemsArray(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  createItemFormGroup(item?: POItem): FormGroup {
    return this.fb.group({
      id: [item?.id || this.generateId()],
      itemCode: [item?.itemCode || '', Validators.required],
      itemName: [item?.itemName || ''],
      hsnCode: [item?.hsnCode || ''],
      description: [item?.description || ''],
      quantity: [item?.quantity || 0, [Validators.required, Validators.min(0)]],
      uom: [item?.uom || 'PCS'],
      rate: [item?.rate || 0, [Validators.required, Validators.min(0)]],
      discount: [item?.discount || 0, [Validators.min(0), Validators.max(100)]],
      gst: [item?.gst || 0, [Validators.min(0)]],
      amount: [item?.amount || 0]
    });
  }

  selectPO(po: PurchaseOrder): void {
    this.selectedPO = po;
    this.loadPOData(po);
  }

  loadPOData(po: PurchaseOrder): void {
    // Load main form
    this.poForm.patchValue({
      poNumber: po.poNumber,
      poDate: new Date(po.poDate),
      vendorCode: po.vendor.code,
      vendorName: po.vendor.name,
      vendorContactPerson: po.vendor.contactPerson,
      vendorPhone: po.vendor.phone,
      vendorEmail: po.vendor.email,
      category: po.category,
      status: po.status,
      currency: po.currency,
      paymentTerms: po.paymentTerms,
      shippingAddress: po.shippingAddress,
      remarks: po.remarks
    });

    // Load items
    this.itemsArray.clear();
    po.items.forEach(item => {
      this.itemsArray.push(this.createItemFormGroup(item));
    });
  }

  createNewPO(): void {
    this.selectedPO = null;
    this.poForm.reset({
      category: 'DIRECT',
      status: 'Unauthorised',
      currency: 'INR',
      currencyConv: 1.000,
      poDirection: 'OpenPO',
      poDate: new Date(),
      poEffDate: new Date(),
      modeOfTransport: 'BY ROAD',
      priceBasis: 'FREIGHT EXTRA-AT ACTUAL'
    });
    this.itemsArray.clear();
    this.addNewItem();
    
    // Mark form as dirty to show the form
    this.poForm.markAsDirty();
  }

  addNewItem(): void {
    this.itemsArray.push(this.createItemFormGroup());
  }

  deleteItem(index: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemsArray.removeAt(index);
      this.calculateTotals();
    }
  }

  editItem(index: number): void {
    this.editingItemIndex = index;
  }

  saveItem(index: number): void {
    const item = this.itemsArray.at(index);
    this.calculateItemAmount(index);
    this.editingItemIndex = -1;
  }

  calculateItemAmount(index: number): void {
    const item = this.itemsArray.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const rate = item.get('rate')?.value || 0;
    const discount = item.get('discount')?.value || 0;
    const gst = item.get('gst')?.value || 0;

    let amount = quantity * rate;
    amount = amount - (amount * discount / 100);
    amount = amount + (amount * gst / 100);

    item.patchValue({ amount: amount }, { emitEvent: false });
    this.calculateTotals();
    
    // Auto-update preview if in amendment mode
    if (this.isAmending) {
      this.autoUpdatePreview();
    }
  }

  calculateTotals(): number {
    return this.itemsArray.controls.reduce((sum, item) => {
      return sum + (item.get('amount')?.value || 0);
    }, 0);
  }

  savePO(): void {
    if (this.poForm.valid && this.itemsArray.length > 0) {
      const poData = {
        ...this.poForm.value,
        items: this.itemsArray.value,
        totalValue: this.calculateTotals()
      };

      if (this.selectedPO) {
        // Update existing
        const index = this.purchaseOrders.findIndex(po => po.id === this.selectedPO!.id);
        if (index !== -1) {
          this.purchaseOrders[index] = { ...this.selectedPO, ...poData };
        }
        alert('Purchase Order updated successfully!');
      } else {
        // Create new
        const newPO: PurchaseOrder = {
          id: this.generateId(),
          ...poData,
          vendor: {
            id: this.generateId(),
            code: poData.vendorCode,
            name: poData.vendorName,
            address: '',
            contactPerson: poData.vendorContactPerson,
            phone: poData.vendorPhone,
            email: poData.vendorEmail
          }
        };
        this.purchaseOrders.unshift(newPO);
        this.selectedPO = newPO;
        alert('Purchase Order created successfully!');
      }

      this.applyFilters();
    } else {
      alert('Please fill all required fields and add at least one item!');
    }
  }

  cancelPO(): void {
    if (this.selectedPO && confirm('Are you sure you want to cancel this PO?')) {
      this.selectedPO.status = 'Cancelled';
      this.poForm.patchValue({ status: 'Cancelled' });
      this.savePO();
    }
  }

  authorizePO(): void {
    if (this.selectedPO && this.selectedPO.status === 'Unauthorised') {
      this.selectedPO.status = 'Authorised';
      this.poForm.patchValue({ status: 'Authorised' });
      this.savePO();
    }
  }

  printPO(): void {
    if (this.selectedPO) {
      console.log('Printing PO:', this.selectedPO.poNumber);
      alert('Print functionality would open print dialog');
    }
  }

  applyFilters(): void {
    this.filteredOrders = this.purchaseOrders.filter(po => {
      const statusMatch = this.filterStatus === 'all' || po.status === this.filterStatus;
      const searchMatch = !this.searchText || 
        po.poNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
        po.vendor.name.toLowerCase().includes(this.searchText.toLowerCase());
      
      return statusMatch && searchMatch;
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Authorised': 'badge-success',
      'Unauthorised': 'badge-warning',
      'Released': 'badge-info',
      'Cancelled': 'badge-error',
      'Printed': 'badge-info'
    };
    return statusMap[status] || 'badge-info';
  }

  generateId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }

  getItemsFormGroup(index: number): FormGroup {
    return this.itemsArray.at(index) as FormGroup;
  }

  // Amendment Functions
  startAmendment(): void {
    if (!this.selectedPO) {
      alert('Please select a PO first');
      return;
    }

    if (this.selectedPO.status !== 'Authorised' && this.selectedPO.status !== 'Released') {
      alert('Only Authorised or Released POs can be amended');
      return;
    }

    this.isAmending = true;
    // Store original data for comparison
    this.originalPOData = JSON.parse(JSON.stringify({
      ...this.poForm.value,
      items: this.itemsArray.value
    }));
    
    // Auto-show preview
    this.previewingChanges = true;
    this.detectedChanges = [];
    
    alert('Amendment mode enabled. Make your changes and they will appear in the preview below.');
  }

  saveAmendment(): void {
    if (!this.isAmending || !this.selectedPO) {
      return;
    }

    if (!this.amendmentReason || this.amendmentReason.trim() === '') {
      alert('Please provide an amendment reason');
      return;
    }

    // Detect changes
    const changes = this.detectChanges();
    
    if (changes.length === 0) {
      alert('No changes detected');
      this.isAmending = false;
      this.amendmentReason = '';
      return;
    }

    // Create amendment record
    const amendment: Amendment = {
      id: this.generateId(),
      amendmentNo: (this.selectedPO.amendments?.length || 0) + 1,
      amendmentDate: new Date().toISOString(),
      amendedBy: 'Current User', // Replace with actual user
      reason: this.amendmentReason,
      changes: changes
    };

    // Add to PO amendments
    if (!this.selectedPO.amendments) {
      this.selectedPO.amendments = [];
    }
    this.selectedPO.amendments.push(amendment);

    // Update PO status
    this.selectedPO.status = 'Unauthorised'; // Needs re-authorization
    this.poForm.patchValue({ status: 'Unauthorised' });

    // Save the PO
    this.savePO();

    // Reset amendment mode
    this.isAmending = false;
    this.amendmentReason = '';
    this.originalPOData = null;

    alert(`Amendment #${amendment.amendmentNo} saved successfully! PO needs re-authorization.`);
  }

  cancelAmendment(): void {
    if (confirm('Cancel amendment and discard all changes?')) {
      // Restore original data
      if (this.originalPOData && this.selectedPO) {
        this.loadPOData(this.selectedPO);
      }
      this.isAmending = false;
      this.amendmentReason = '';
      this.originalPOData = null;
      this.previewingChanges = false;
      this.detectedChanges = [];
    }
  }

  previewChanges(): void {
    this.detectedChanges = this.detectChanges();
    this.previewingChanges = true;
  }

  autoUpdatePreview(): void {
    // Automatically update preview if already shown
    if (this.previewingChanges) {
      this.detectedChanges = this.detectChanges();
    }
  }

  detectChanges(): AmendmentChange[] {
    const changes: AmendmentChange[] = [];
    const currentData = {
      ...this.poForm.value,
      items: this.itemsArray.value
    };

    // Check form fields
    const fieldsToCheck = [
      { key: 'vendorCode', label: 'Vendor Code' },
      { key: 'vendorName', label: 'Vendor Name' },
      { key: 'paymentTerms', label: 'Payment Terms' },
      { key: 'shippingAddress', label: 'Shipping Address' },
      { key: 'poEndDate', label: 'PO End Date' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'category', label: 'Category' },
      { key: 'currency', label: 'Currency' }
    ];

    fieldsToCheck.forEach(field => {
      const oldVal = this.originalPOData[field.key];
      const newVal = currentData[field.key];
      
      // Convert dates to strings for comparison if needed
      const oldValStr = oldVal instanceof Date ? oldVal.toISOString() : oldVal;
      const newValStr = newVal instanceof Date ? newVal.toISOString() : newVal;
      
      if (oldValStr !== newValStr) {
        changes.push({
          field: field.key,
          oldValue: oldValStr || 'Empty',
          newValue: newValStr || 'Empty',
          description: `${field.label} changed`
        });
      }
    });

    // Check items changes
    const originalItems = this.originalPOData.items || [];
    const currentItems = currentData.items || [];

    // Check if items were added/removed
    if (originalItems.length !== currentItems.length) {
      changes.push({
        field: 'items_count',
        oldValue: `${originalItems.length} items`,
        newValue: `${currentItems.length} items`,
        description: 'Number of items changed'
      });
    }

    // Check individual item changes
    const maxLength = Math.max(originalItems.length, currentItems.length);
    
    for (let i = 0; i < maxLength; i++) {
      const origItem = originalItems[i];
      const currItem = currentItems[i];
      
      if (!origItem && currItem) {
        // New item added
        changes.push({
          field: `item_${i}_new`,
          oldValue: 'None',
          newValue: `${currItem.itemCode} - ${currItem.itemName}`,
          description: `New item added: ${currItem.itemCode}`
        });
      } else if (origItem && !currItem) {
        // Item removed
        changes.push({
          field: `item_${i}_removed`,
          oldValue: `${origItem.itemCode} - ${origItem.itemName}`,
          newValue: 'Removed',
          description: `Item removed: ${origItem.itemCode}`
        });
      } else if (origItem && currItem) {
        // Check for changes in existing items
        const itemLabel = currItem.itemCode || `Item ${i + 1}`;
        
        if (origItem.itemCode !== currItem.itemCode) {
          changes.push({
            field: `item_${i}_code`,
            oldValue: origItem.itemCode,
            newValue: currItem.itemCode,
            description: `${itemLabel}: Item code changed`
          });
        }
        
        if (origItem.quantity !== currItem.quantity) {
          changes.push({
            field: `item_${i}_quantity`,
            oldValue: String(origItem.quantity),
            newValue: String(currItem.quantity),
            description: `${itemLabel}: Quantity changed from ${origItem.quantity} to ${currItem.quantity}`
          });
        }
        
        if (origItem.rate !== currItem.rate) {
          changes.push({
            field: `item_${i}_rate`,
            oldValue: String(origItem.rate),
            newValue: String(currItem.rate),
            description: `${itemLabel}: Rate changed from ${origItem.rate} to ${currItem.rate}`
          });
        }
        
        if (origItem.discount !== currItem.discount) {
          changes.push({
            field: `item_${i}_discount`,
            oldValue: `${origItem.discount}%`,
            newValue: `${currItem.discount}%`,
            description: `${itemLabel}: Discount changed`
          });
        }
        
        if (origItem.gst !== currItem.gst) {
          changes.push({
            field: `item_${i}_gst`,
            oldValue: `${origItem.gst}%`,
            newValue: `${currItem.gst}%`,
            description: `${itemLabel}: GST changed`
          });
        }
      }
    }

    return changes;
  }
}
