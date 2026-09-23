export type TestResult = 'Presumptive Positive' | 'Negative' | 'Inconclusive';

export type SampleType = 'Powder' | 'Tablet' | 'Plant Material' | 'Liquid' | 'Other';

export interface ColorReferencePoint {
  color: string; // hex
  label: string;
  indication: string;
}

export interface TestKitDefinition {
  id: string;
  name: string;
  displayName: string;
  formulation: string;
  defaultBatch: string;
  defaultExpiry: string;
  description: string;
  compatibleCategories: string[];
  referenceColors: ColorReferencePoint[];
}

export interface SubstanceCategoryDefinition {
  id: string;
  name: string;
  description: string;
  compatibleKitIds: string[];
  sampleReactionColor: string;
  positiveReactionDesc: string;
  negativeReactionDesc: string;
}

export interface TestRecord {
  id: string;
  caseId: string;
  sampleId: string;
  referenceNumber: string;
  officerId: string;
  officerName: string;
  unitId: string;
  testKit: string;
  category: string;
  sampleType: SampleType;
  batchNumber: string;
  expiryDate: string;
  result: TestResult;
  confidence: number;
  date: string;
  time: string;
  location: string;
  gpsCoordinates: string;
  integrity: 'Verified' | 'Flagged';
  hash: string;
  imageUrl: string;
  notes?: string;
  colorimetricSampleHex?: string;
  colorimetricReferenceHex?: string;
}

export interface Officer {
  id: string;
  name: string;
  badgeNumber: string;
  unit: string;
  station: string;
  role: 'officer' | 'supervisor';
  pin: string;
  avatarUrl?: string;
  phone?: string;
}

export interface NewTestDraft {
  kitId: string;
  category: string;
  caseId: string;
  sampleId: string;
  sampleType: SampleType;
  referenceNumber: string;
  batchNumber: string;
  expiryDate: string;
  capturedImage: string | null;
  selectedSampleKey?: string;
  notes?: string;
  simulatedResult?: TestResult;
  simulatedConfidence?: number;
}
