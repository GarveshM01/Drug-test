import { TestKitDefinition, SubstanceCategoryDefinition, Officer, TestRecord } from '../types';
import { SAMPLE_KIT_IMAGES } from './sampleImages';

export const MOCK_KITS: TestKitDefinition[] = [
  {
    id: 'kit-a',
    name: 'Field Test Kit A',
    displayName: 'Field Test Kit A (General Screening)',
    formulation: 'Colorimetric Reagent Formulation A (Alkaloid / Multi-target)',
    defaultBatch: 'KIT-B24-018',
    defaultExpiry: '2027-08-31',
    description: 'General preliminary screening kit for suspected alkaloid and synthetic compound residues.',
    compatibleCategories: ['Opioids', 'Amphetamine-type substances', 'Other / Unknown'],
    referenceColors: [
      { color: '#ffffff', label: 'Reference Base', indication: 'Baseline null' },
      { color: '#64748b', label: 'Fiducial Grey', indication: 'Chroma target' },
      { color: '#6b21a8', label: 'Violet Target', indication: 'Target spectrum match' },
      { color: '#ca8a04', label: 'Amber Intermediate', indication: 'Pre-reaction neutral' }
    ]
  },
  {
    id: 'kit-b',
    name: 'Field Test Kit B',
    displayName: 'Field Test Kit B (Specific Alkaloid)',
    formulation: 'Colorimetric Reagent Formulation B (Selective Thiocyanate Base)',
    defaultBatch: 'KIT-B24-042',
    defaultExpiry: '2027-11-15',
    description: 'Specific colorimetric ampoule system targeting suspected ester/alkaloid class precipitates.',
    compatibleCategories: ['Cocaine', 'Other / Unknown'],
    referenceColors: [
      { color: '#ffffff', label: 'Reference Base', indication: 'Baseline null' },
      { color: '#0284c7', label: 'Cobalt Blue', indication: 'Target positive precipitate' },
      { color: '#fef08a', label: 'Straw Yellow', indication: 'Negative reaction solution' }
    ]
  },
  {
    id: 'kit-c',
    name: 'Field Test Kit C',
    displayName: 'Field Test Kit C (Plant & Resin Matrix)',
    formulation: 'Colorimetric Reagent Formulation C (Modified Duquenois Base)',
    defaultBatch: 'KIT-C25-009',
    defaultExpiry: '2028-03-30',
    description: 'Multi-phase field test kit for testing botanical residues, dried leaf material, and condensed resin extracts.',
    compatibleCategories: ['Cannabis', 'Other / Unknown'],
    referenceColors: [
      { color: '#ffffff', label: 'Reference Base', indication: 'Baseline null' },
      { color: '#7e22ce', label: 'Purple Phase', indication: 'Separated active chromophore' },
      { color: '#15803d', label: 'Chlorophyll Base', indication: 'Botanical matrix background' }
    ]
  }
];

export const MOCK_SUBSTANCE_CATEGORIES: SubstanceCategoryDefinition[] = [
  {
    id: 'cannabis',
    name: 'Cannabis',
    description: 'Suspected botanical, resin, oil, or hashish matrix (Field Kit C).',
    compatibleKitIds: ['kit-c'],
    sampleReactionColor: '#7e22ce',
    positiveReactionDesc: 'Biphasic purple layer in bottom organic solvent phase',
    negativeReactionDesc: 'No purple transition; aqueous layer remains clear or yellow'
  },
  {
    id: 'opioids',
    name: 'Opioids',
    description: 'Suspected heroin, morphine, codeine, or raw opium latex powder/solid (Field Kit A).',
    compatibleKitIds: ['kit-a'],
    sampleReactionColor: '#581c87',
    positiveReactionDesc: 'Immediate deep violet/purple chromogenic shift within 10-30 seconds',
    negativeReactionDesc: 'Reagent solution remains clear straw or pale amber'
  },
  {
    id: 'cocaine',
    name: 'Cocaine',
    description: 'Suspected cocaine hydrochloride powder, base, or crack precipitate (Field Kit B).',
    compatibleKitIds: ['kit-b'],
    sampleReactionColor: '#0284c7',
    positiveReactionDesc: 'Instant turquoise/bright blue precipitate formation in top layer',
    negativeReactionDesc: 'Pinkish or clear solution without blue precipitate'
  },
  {
    id: 'amphetamine',
    name: 'Amphetamine-type substances',
    description: 'Suspected ATS, methamphetamine crystals, MDMA, or synthetic tablets (Field Kit A).',
    compatibleKitIds: ['kit-a'],
    sampleReactionColor: '#b45309',
    positiveReactionDesc: 'Rapid orange-to-brown or dark blue-black color formation',
    negativeReactionDesc: 'No color change; reagent remains unreactive'
  },
  {
    id: 'other',
    name: 'Other / Unknown',
    description: 'Unidentified chemical substance requiring general screening profile.',
    compatibleKitIds: ['kit-a', 'kit-b', 'kit-c'],
    sampleReactionColor: '#475569',
    positiveReactionDesc: 'Non-standard chromogenic shift observed',
    negativeReactionDesc: 'No chromogenic shift observed'
  }
];

export const MOCK_OFFICERS: Officer[] = [
  {
    id: 'OFF-1023',
    name: 'Insp. Rajesh Verma',
    badgeNumber: 'MP-BPL-4921',
    unit: 'BPL-CENTRAL-01',
    station: 'MP Narcotics Enforcement Sector 4',
    role: 'officer',
    pin: '1234',
    phone: '+91 98260 10234'
  },
  {
    id: 'ADM-8801',
    name: 'DySP Ananya Sharma',
    badgeNumber: 'HQ-CID-0088',
    unit: 'State Narcotics Control Bureau',
    station: 'State HQ - Zonal Oversight',
    role: 'supervisor',
    pin: '8801',
    phone: '+91 98110 88012'
  },
  {
    id: 'OFF-2041',
    name: 'Sub-Insp. Vikram Singh',
    badgeNumber: 'DL-ND-8190',
    unit: 'New Delhi Interdiction Team',
    station: 'Station 12 Narcotics Wing',
    role: 'officer',
    pin: '2041',
    phone: '+91 98711 20411'
  },
  {
    id: 'OFF-3118',
    name: 'Insp. Priya Patel',
    badgeNumber: 'MH-MUM-6102',
    unit: 'Mumbai Port & Coastal Unit',
    station: 'Zone 2 Maritime Enforcement',
    role: 'officer',
    pin: '3118',
    phone: '+91 98200 31189'
  }
];

export const INITIAL_TEST_RECORDS: TestRecord[] = [
  {
    id: 'FT-00124',
    caseId: 'CASE-2026-00124',
    sampleId: 'SMP-00124',
    referenceNumber: 'REF-BPL-992',
    officerId: 'OFF-1023',
    officerName: 'Insp. Rajesh Verma',
    unitId: 'Bhopal Central Unit',
    testKit: 'Field Test Kit A',
    category: 'Opioids',
    sampleType: 'Powder',
    batchNumber: 'KIT-B24-018',
    expiryDate: '2027-08-31',
    result: 'Presumptive Positive',
    confidence: 96,
    date: '23 Sep 2026',
    time: '10:42 AM',
    location: 'Bhopal Sector 4 Interdiction Point',
    gpsCoordinates: '23.2599° N, 77.4126° E',
    integrity: 'Verified',
    hash: '8f4a92bc7e41d8e5b42a9603b12391de',
    imageUrl: SAMPLE_KIT_IMAGES.positive,
    notes: 'Tan powder intercepted at vehicle checkpoint. Reaction in ampoule produced rapid purple shift verified with reference standard.'
  },
  {
    id: 'FT-00123',
    caseId: 'CASE-2026-00119',
    sampleId: 'SMP-00119',
    referenceNumber: 'REF-BPL-981',
    officerId: 'OFF-1023',
    officerName: 'Insp. Rajesh Verma',
    unitId: 'Bhopal Central Unit',
    testKit: 'Field Test Kit B',
    category: 'Cocaine',
    sampleType: 'Powder',
    batchNumber: 'KIT-B24-042',
    expiryDate: '2027-11-15',
    result: 'Negative',
    confidence: 98,
    date: '22 Sep 2026',
    time: '04:15 PM',
    location: 'Bhopal Railway Hub - Platform 1 Parcel Office',
    gpsCoordinates: '23.2642° N, 77.4101° E',
    integrity: 'Verified',
    hash: 'a3b91ef472c9108b3e8112d7c041f83c',
    imageUrl: SAMPLE_KIT_IMAGES.negative,
    notes: 'White crystalline substance tested negative. Solution remained clear pale straw. Specimen logged as common pharmaceutical powder.'
  },
  {
    id: 'FT-00122',
    caseId: 'CASE-2026-00105',
    sampleId: 'SMP-00105',
    referenceNumber: 'REF-BPL-940',
    officerId: 'OFF-2041',
    officerName: 'Sub-Insp. Vikram Singh',
    unitId: 'New Delhi Interdiction Team',
    testKit: 'Field Test Kit C',
    category: 'Cannabis',
    sampleType: 'Plant Material',
    batchNumber: 'KIT-C25-009',
    expiryDate: '2028-03-30',
    result: 'Presumptive Positive',
    confidence: 94,
    date: '21 Sep 2026',
    time: '11:20 AM',
    location: 'Delhi Highway Toll 08 Corridor',
    gpsCoordinates: '28.7041° N, 77.1025° E',
    integrity: 'Verified',
    hash: 'c7e2b109f5832ea48911b3d8702c510e',
    imageUrl: SAMPLE_KIT_IMAGES.positive,
    notes: 'Crushed dried leaf material. Duquenois-Levine test indicated characteristic violet bottom layer.'
  },
  {
    id: 'FT-00121',
    caseId: 'CASE-2026-00098',
    sampleId: 'SMP-00098',
    referenceNumber: 'REF-MUM-772',
    officerId: 'OFF-3118',
    officerName: 'Insp. Priya Patel',
    unitId: 'Mumbai Port & Coastal Unit',
    testKit: 'Field Test Kit A',
    category: 'Amphetamine-type substances',
    sampleType: 'Tablet',
    batchNumber: 'KIT-B24-018',
    expiryDate: '2027-08-31',
    result: 'Inconclusive',
    confidence: 64,
    date: '20 Sep 2026',
    time: '09:05 PM',
    location: 'JNPT Cargo Berth 3 Warehouse',
    gpsCoordinates: '18.9499° N, 72.9511° E',
    integrity: 'Verified',
    hash: '5d83a1c028e932b71004ea892cf518a2',
    imageUrl: SAMPLE_KIT_IMAGES.inconclusive,
    notes: 'Color transition faint and muddy due to tablet binders/pigment. Officer flagged for immediate central laboratory analysis.'
  },
  {
    id: 'FT-00120',
    caseId: 'CASE-2026-00085',
    sampleId: 'SMP-00085',
    referenceNumber: 'REF-BPL-912',
    officerId: 'OFF-1023',
    officerName: 'Insp. Rajesh Verma',
    unitId: 'Bhopal Central Unit',
    testKit: 'Field Test Kit B',
    category: 'Other / Unknown',
    sampleType: 'Liquid',
    batchNumber: 'KIT-B24-042',
    expiryDate: '2027-11-15',
    result: 'Negative',
    confidence: 97,
    date: '19 Sep 2026',
    time: '02:30 PM',
    location: 'Bhopal Express Freight Yard',
    gpsCoordinates: '23.2450° N, 77.4200° E',
    integrity: 'Verified',
    hash: '9910e543ab71df671402ca8b1820b174',
    imageUrl: SAMPLE_KIT_IMAGES.negative,
    notes: 'Suspected chemical solvent shipment. No chromogenic reaction observed.'
  }
];
