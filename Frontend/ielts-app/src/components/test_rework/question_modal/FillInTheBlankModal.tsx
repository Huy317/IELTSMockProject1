import { useState } from 'react';
import type { QuestionToCreate } from '../../../types/Question';

interface OtherData {
    parentId: number;
    testId: number;
    order: number;
}

interface FillInTheBlankModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    otherData?: OtherData;
}

function FillInTheBlankModal({ isOpen, onClose, onSubmit, otherData }: FillInTheBlankModalProps) {
    const [questionContent, setQuestionContent] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [explanation, setExplanation] = useState('');

    const validateForm = () => {
        if (!questionContent.trim()) {
            alert('Question content is required');
            return false;
        }

        if (!questionContent.includes('_')) {
            alert('Question content must contain at least one blank (underscore) to indicate where users should fill in answers');
            return false;
        }

        if (!correctAnswer.trim()) {
            alert('Correct answer is required');
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (!otherData) return;

        if (!validateForm()) return;

        const data: QuestionToCreate = {
            questionType: 'FormCompletion',
            content: questionContent,
            choices: '', // Leave blank as specified
            correctAnswer: correctAnswer,
            explanation: explanation,
            parentId: otherData.parentId,
            testId: otherData.testId,
            order: otherData.order,
            link: '',
        };

        console.log(data);

        onSubmit(data);
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Form Completion Question</h5>
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
                                placeholder="The capital of France is _______"
                            ></textarea>
                            <small className="form-text text-muted">
                                Tip: Use underscores (___) to mark where students should type their answers
                            </small>
                        </div>

                        {/* Correct Answer */}
                        <div className="mb-3">
                            <label htmlFor="correctAnswer" className="form-label fw-bold">
                                Correct Answer
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="correctAnswer"
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                placeholder="Enter the correct answer for the blank"
                            />
                            <small className="form-text text-muted">
                                Enter the exact text that should fill the blank
                            </small>
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
                                placeholder="Enter explanation for the correct answer..."
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

export default FillInTheBlankModal;