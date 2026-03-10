import { WorkCentre } from '../erp.models';

export const workCentresData: WorkCentre[] = [
  {
    id: "wc-001",
    code: "FGS-B69",
    name: "FINISHED GOODS STORE AT B69",
    division: "INDICA INDUSTRIES PVT LTD. (B-69)",
    department: "PRODUCTION",
    type: "Store",
    storeNumber: "120",
    capacity: 5000,
    status: "Active"
  },
  {
    id: "wc-002",
    code: "LAM-C157",
    name: "LAMINATION WORK CENTRE",
    division: "INDICA INDUSTRIES PVT LTD. (C-157)",
    department: "PRODUCTION",
    type: "Process",
    capacity: 2000,
    status: "Active"
  },
  {
    id: "wc-003",
    code: "CUT-B69",
    name: "CUTTING SECTION",
    division: "INDICA INDUSTRIES PVT LTD. (B-69)",
    department: "PRODUCTION",
    type: "Process",
    capacity: 3000,
    status: "Active"
  },
  {
    id: "wc-004",
    code: "QC-C157",
    name: "QUALITY CONTROL LAB",
    division: "INDICA INDUSTRIES PVT LTD. (C-157)",
    department: "QUALITY",
    type: "Inside",
    capacity: 500,
    status: "Active"
  },
  {
    id: "wc-005",
    code: "PKG-B69",
    name: "PACKAGING UNIT",
    division: "INDICA INDUSTRIES PVT LTD. (B-69)",
    department: "PRODUCTION",
    type: "Process",
    capacity: 1500,
    status: "Active"
  },
  {
    id: "wc-006",
    code: "RMS-C157",
    name: "RAW MATERIAL STORE",
    division: "INDICA INDUSTRIES PVT LTD. (C-157)",
    department: "STORES",
    type: "Store",
    storeNumber: "105",
    capacity: 8000,
    status: "Active"
  },
  {
    id: "wc-007",
    code: "OUT-PRINT",
    name: "EXTERNAL PRINTING SERVICE",
    division: "INDICA INDUSTRIES PVT LTD. (B-69)",
    department: "PRODUCTION",
    type: "Outside",
    capacity: 0,
    status: "Active"
  }
];
