import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTests } from '../context/TestContext';
import { MOCK_KITS } from '../data/mockData';
import { TestKitDefinition, TestResult, TestRecord } from '../types';
import { generateSHA256 } from '../utils/hash';
import { getCurrentFormattedDateTime, generateNextIds } from '../utils/formatters';

import { StepIndicator } from '../components/test-flow/StepIndicator';
import { StepKitSelection } from '../components/test-flow/StepKitSelection';
import { StepSubstance } from '../components/test-flow/StepSubstance';
import { StepSampleCase } from '../components/test-flow/StepSampleCase';
import { StepKitDetails } from '../components/test-flow/StepKitDetails';
import { StepInstructions } from '../components/test-flow/StepInstructions';
import { StepCameraScan } from '../components/test-flow/StepCameraScan';
import { StepAnalysis } from '../components/test-flow/StepAnalysis';

export const NewTestWizard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { records, draft, updateDraft, addRecord, resetDraft } = useTests();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Helper for kit selection
  const handleKitSelect = (kit: TestKitDefinition) => {
    // Also reset category to first compatible category for this kit
    const compatible = kit.compatibleCategories[0] || 'Other / Unknown';
    updateDraft({
      kitId: kit.id,
      category: compatible,
      batchNumber: kit.defaultBatch,
      expiryDate: kit.defaultExpiry
    });
  };

  const handleFieldChange = (field: string, value: string) => {
    updateDraft({ [field]: value });
  };

  // Called from Step 6 when user clicks "Use This Image"
  const handleCaptureImage = (
    imageUrl: string,
    simulatedResult: TestResult,
    confidence: number
  ) => {
    updateDraft({
      capturedImage: imageUrl,
      simulatedResult,
      simulatedConfidence: confidence
    });
    // Move to step 7: AI Analysis simulation
    setCurrentStep(7);
  };

  // Called from Step 7 when analysis completes
  const handleAnalysisComplete = async () => {
    const currentKit = MOCK_KITS.find(k => k.id === draft.kitId) || MOCK_KITS[0];
    const dt = getCurrentFormattedDateTime();
    const ids = generateNextIds(records.length);

    // Compute cryptographic hash over the evidentiary fields
    const hashInput = `${ids.testId}-${draft.caseId}-${draft.sampleId}-${draft.batchNumber}-${dt.date}-${dt.time}-${user?.id || 'OFF-1023'}-${draft.simulatedResult}`;
    const sha256 = await generateSHA256(hashInput);

    const newRecord: TestRecord = {
      id: ids.testId,
      caseId: draft.caseId || ids.caseId,
      sampleId: draft.sampleId || ids.sampleId,
      referenceNumber: draft.referenceNumber || ids.refNo,
      officerId: user?.id || 'OFF-1023',
      officerName: user?.name || 'Insp. Rajesh Verma',
      unitId: user?.unit || 'Bhopal Central Unit',
      testKit: currentKit.name,
      category: draft.category || 'Opioids',
      sampleType: draft.sampleType || 'Powder',
      batchNumber: draft.batchNumber || currentKit.defaultBatch,
      expiryDate: draft.expiryDate || currentKit.defaultExpiry,
      result: draft.simulatedResult || 'Presumptive Positive',
      confidence: draft.simulatedConfidence || 96,
      date: dt.date,
      time: dt.time,
      location: 'Bhopal Sector 4 Interdiction Point',
      gpsCoordinates: '23.2599° N, 77.4126° E',
      integrity: 'Verified',
      hash: sha256,
      imageUrl: draft.capturedImage || '',
      notes: draft.notes || `Field sample verified via ${currentKit.name}. Automated colorimetric spectrum calibration passed standard fiducial check.`
    };

    addRecord(newRecord);
    resetDraft();
    navigate(`/result/${newRecord.id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      
      {/* Step Indicator Header */}
      <StepIndicator currentStep={currentStep} />

      {/* Step Container Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl">
        {currentStep === 1 && (
          <StepKitSelection
            selectedKitId={draft.kitId}
            onSelectKit={handleKitSelect}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepSubstance
            selectedKitId={draft.kitId}
            selectedCategory={draft.category}
            onSelectCategory={(cat) => updateDraft({ category: cat })}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepSampleCase
            caseId={draft.caseId}
            sampleId={draft.sampleId}
            sampleType={draft.sampleType}
            referenceNumber={draft.referenceNumber}
            onChangeField={handleFieldChange}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepKitDetails
            kitId={draft.kitId}
            category={draft.category}
            batchNumber={draft.batchNumber}
            expiryDate={draft.expiryDate}
            onChangeField={handleFieldChange}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <StepInstructions
            onOpenCamera={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && (
          <StepCameraScan
            onCaptureImage={handleCaptureImage}
            onBack={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 7 && (
          <StepAnalysis
            capturedImage={draft.capturedImage}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}
      </div>

    </div>
  );
};
