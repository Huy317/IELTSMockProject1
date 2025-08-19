import React, { useState } from 'react';

interface CreateTestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (testData: TestData) => void;
}

interface TestData {
    testName: string;
    testType: 'Reading' | 'Listening';
}

function CreateTestModal({ isOpen, onClose, onConfirm }: CreateTestModalProps) {
    const [testName, setTestName] = useState('');
    const [testType, setTestType] = useState<'Reading' | 'Listening'>('Reading');
    const [errors, setErrors] = useState<{ testName?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: { testName?: string } = {};
        if (!testName.trim()) {
            newErrors.testName = 'Test name is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit data
        onConfirm({
            testName: testName.trim(),
            testType
        });

        // Reset form
        setTestName('');
        setTestType('Reading');
        setErrors({});
    };

    const handleCancel = () => {
        setTestName('');
        setTestType('Reading');
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal d-block"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleCancel}
        >
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New IELTS Test</h5>
                        <button
                            type="button"
                            className="btn p-0 border-0 bg-transparent"
                            onClick={handleCancel}
                            aria-label="Close"
                            style={{ fontSize: '1.5rem', lineHeight: '1' }}
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="testName" className="form-label">
                                    Test Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="testName"
                                    className={`form-control ${errors.testName ? 'is-invalid' : ''}`}
                                    placeholder="Enter test name (e.g., IELTS Practice Test 1)"
                                    value={testName}
                                    onChange={(e) => {
                                        setTestName(e.target.value);
                                        if (errors.testName) {
                                            setErrors({ ...errors, testName: undefined });
                                        }
                                    }}
                                />
                                {errors.testName && (
                                    <div className="invalid-feedback">{errors.testName}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="testType" className="form-label">
                                    Test Type <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="testType"
                                    className="form-select"
                                    value={testType}
                                    onChange={(e) => setTestType(e.target.value as 'Reading' | 'Listening')}
                                >
                                    <option value="Reading">Reading</option>
                                    <option value="Listening">Listening</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary me-3"
                                style={{ borderRadius: '0.375rem' }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ borderRadius: '0.375rem' }}
                            >
                                Create Test
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTestModal;
