import React, { createContext, useContext, useState, useEffect } from 'react';
import { TestRecord, NewTestDraft, TestResult } from '../types';
import { INITIAL_TEST_RECORDS, MOCK_KITS } from '../data/mockData';
import { generateNextIds } from '../utils/formatters';

interface TestContextType {
  records: TestRecord[];
  draft: NewTestDraft;
  currentCompletedRecord: TestRecord | null;
  setCurrentCompletedRecord: (record: TestRecord | null) => void;
  updateDraft: (partial: Partial<NewTestDraft>) => void;
  resetDraft: () => void;
  addRecord: (record: TestRecord) => void;
  getRecordById: (id: string) => TestRecord | undefined;
  getStats: (officerId?: string) => {
    total: number;
    positive: number;
    negative: number;
    inconclusive: number;
  };
}

const STORAGE_KEY = 'drugtest_secure_records';

const defaultDraft = (): NewTestDraft => {
  const ids = generateNextIds(0);
  return {
    kitId: MOCK_KITS[0].id,
    category: 'Opioids',
    caseId: ids.caseId,
    sampleId: ids.sampleId,
    sampleType: 'Powder',
    referenceNumber: ids.refNo,
    batchNumber: MOCK_KITS[0].defaultBatch,
    expiryDate: MOCK_KITS[0].defaultExpiry,
    capturedImage: null,
    selectedSampleKey: 'positive',
    notes: '',
    simulatedResult: 'Presumptive Positive',
    simulatedConfidence: 96
  };
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<TestRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_TEST_RECORDS;
  });

  const [draft, setDraft] = useState<NewTestDraft>(() => defaultDraft());
  const [currentCompletedRecord, setCurrentCompletedRecord] = useState<TestRecord | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  const updateDraft = (partial: Partial<NewTestDraft>) => {
    setDraft(prev => ({ ...prev, ...partial }));
  };

  const resetDraft = () => {
    const ids = generateNextIds(records.length);
    setDraft({
      kitId: MOCK_KITS[0].id,
      category: 'Opioids',
      caseId: ids.caseId,
      sampleId: ids.sampleId,
      sampleType: 'Powder',
      referenceNumber: ids.refNo,
      batchNumber: MOCK_KITS[0].defaultBatch,
      expiryDate: MOCK_KITS[0].defaultExpiry,
      capturedImage: null,
      selectedSampleKey: 'positive',
      notes: '',
      simulatedResult: 'Presumptive Positive',
      simulatedConfidence: 96
    });
  };

  const addRecord = (record: TestRecord) => {
    setRecords(prev => [record, ...prev]);
    setCurrentCompletedRecord(record);
  };

  const getRecordById = (id: string): TestRecord | undefined => {
    return records.find(r => r.id.toLowerCase() === id.toLowerCase() || r.caseId.toLowerCase() === id.toLowerCase());
  };

  const getStats = (officerId?: string) => {
    const filtered = officerId
      ? records.filter(r => r.officerId.toLowerCase() === officerId.toLowerCase())
      : records;

    const positive = filtered.filter(r => r.result === 'Presumptive Positive').length;
    const negative = filtered.filter(r => r.result === 'Negative').length;
    const inconclusive = filtered.filter(r => r.result === 'Inconclusive').length;

    return {
      total: filtered.length,
      positive,
      negative,
      inconclusive
    };
  };

  return (
    <TestContext.Provider
      value={{
        records,
        draft,
        currentCompletedRecord,
        setCurrentCompletedRecord,
        updateDraft,
        resetDraft,
        addRecord,
        getRecordById,
        getStats
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTests = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTests must be used within a TestProvider');
  }
  return context;
};
