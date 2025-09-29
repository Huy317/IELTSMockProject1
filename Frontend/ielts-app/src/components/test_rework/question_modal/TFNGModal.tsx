import { useState } from 'react';
import type { QuestionToCreate } from '../../../types/Question';

interface OtherData {
    parentId: number;
    testId: number;
    order: number;
}

interface TFNGModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    otherData?: OtherData;
}

type TFNGAnswer = 'TRUE' | 'FALSE' | 'NOT GIVEN';

function TFNGModal({ isOpen, onClose, onSubmit, otherData }: TFNGModalProps) {
    const [questionContent, setQuestionContent] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState<TFNGAnswer | ''>('');
    const [explanation, setExplanation] = useState('');

    const validateForm = () => {
        if (!questionContent.trim()) {
            alert('Question content is required');
            return false;
        }

        if (!correctAnswer) {
            alert('Please select the correct answer (TRUE, FALSE, or NOT GIVEN)');
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (!otherData) return;

        if (!validateForm()) return;

        const data: QuestionToCreate = {
            questionType: 'TrueFalseNotGiven',
            content: questionContent,
            choices: 'TRUE|FALSE|NOT GIVEN', // Fixed choices for TFNG
            correctAnswer: correctAnswer,
            explanation: explanation,
            parentId: otherData.parentId,
            testId: otherData.testId,
            order: otherData.order,
            link: '',
        };

        onSubmit(data);
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">True/False/Not Given Question</h5>
                        <button
                            type="button"
                            className="btn-close border-0 rounded-1"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Question Content */}
                        <div className="mb-3">
                            <label htmlFor="questionContent" className="form-label fw-bold">
                                Question Content
                            </label>
                            <textarea
                                className="form-control"
                                id="questionContent"
                                rows={3}
                                value={questionContent}
                                onChange={(e) => setQuestionContent(e.target.value)}
                                placeholder="Enter the statement to be evaluated as TRUE, FALSE, or NOT GIVEN..."
                            ></textarea>
                        </div>

                        {/* Answer Selection */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Correct Answer</label>
                            
                            <div className="d-flex flex-column gap-2">
                                {/* TRUE Option */}
                                <div className={`border rounded-2 p-3 ${correctAnswer === 'TRUE' ? 'border-primary bg-light' : 'border-secondary'}`}>
                                    <div className="d-flex align-items-center">
                                        <input
                                            className="form-check-input me-3"
                                            type="radio"
                                            id="answer-true"
                                            name="correctAnswer"
                                            value="TRUE"
                                            checked={correctAnswer === 'TRUE'}
                                            onChange={(e) => setCorrectAnswer(e.target.value as TFNGAnswer)}
                                            style={{ width: '20px', height: '20px', marginTop: '0px' }}
                                        />
                                        <div className="d-flex align-items-center w-100">
                                            <div style={{ minWidth: '120px' }}>
                                                <h6 className="mb-0 fw-bold">TRUE</h6>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="text-muted">The statement agrees with the information</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* FALSE Option */}
                                <div className={`border rounded-2 p-3 ${correctAnswer === 'FALSE' ? 'border-primary bg-light' : 'border-secondary'}`}>
                                    <div className="d-flex align-items-center">
                                        <input
                                            className="form-check-input me-3"
                                            type="radio"
                                            id="answer-false"
                                            name="correctAnswer"
                                            value="FALSE"
                                            checked={correctAnswer === 'FALSE'}
                                            onChange={(e) => setCorrectAnswer(e.target.value as TFNGAnswer)}
                                            style={{ width: '20px', height: '20px', marginTop: '0px' }}
                                        />
                                        <div className="d-flex align-items-center w-100">
                                            <div style={{ minWidth: '120px' }}>
                                                <h6 className="mb-0 fw-bold">FALSE</h6>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="text-muted">The statement contradicts the information</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* NOT GIVEN Option */}
                                <div className={`border rounded-2 p-3 ${correctAnswer === 'NOT GIVEN' ? 'border-primary bg-light' : 'border-secondary'}`}>
                                    <div className="d-flex align-items-center">
                                        <input
                                            className="form-check-input me-3"
                                            type="radio"
                                            id="answer-not-given"
                                            name="correctAnswer"
                                            value="NOT GIVEN"
                                            checked={correctAnswer === 'NOT GIVEN'}
                                            onChange={(e) => setCorrectAnswer(e.target.value as TFNGAnswer)}
                                            style={{ width: '20px', height: '20px', marginTop: '0px' }}
                                        />
                                        <div className="d-flex align-items-center w-100">
                                            <div style={{ minWidth: '120px' }}>
                                                <h6 className="mb-0 fw-bold">NOT GIVEN</h6>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="text-muted">There is no information about this</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="mb-3">
                            <label htmlFor="explanation" className="form-label fw-bold">
                                Explanation (optional)
                            </label>
                            <textarea
                                className="form-control"
                                id="explanation"
                                rows={2}
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                placeholder="Explain why this is the correct answer..."
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary me-3 rounded-3"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary rounded-3"
                            onClick={handleSubmit}
                        >
                            Create Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TFNGModal;
