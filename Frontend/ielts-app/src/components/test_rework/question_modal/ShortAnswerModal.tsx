import { useState } from "react";
import type { QuestionToCreate } from "../../../types/Question";
import { toast } from "react-toastify";
import { createQuestion } from "../../../services/questionService";

interface OtherData {
    parentId: number;
    testId: number;
    order: number;
}

interface ShortAnswerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    otherData?: OtherData;
}

function ShortAnswerModal({
    isOpen,
    onClose,
    onSubmit,
    otherData,
}: ShortAnswerModalProps) {
    const [questionContent, setQuestionContent] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [explanation, setExplanation] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!questionContent.trim()) {
            toast.error("Question content is required");
            return false;
        }

        if (!correctAnswer.trim()) {
            toast.error("Correct answer is required");
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (!otherData) return;
        if (!validateForm()) return;
        if (isSubmitting) return;

        const data: QuestionToCreate = {
            questionType: "ShortAnswer",
            content: questionContent,
            choices: "", // Not needed for short answer questions
            correctAnswer: correctAnswer,
            explanation: explanation,
            parentId: otherData.parentId,
            testId: otherData.testId,
            order: otherData.order,
            link: "",
        };

        console.log("Creating Short Answer Question:", data);
        setIsSubmitting(true);

        toast
            .promise(createQuestion(data), {
                pending: "Creating short answer question...",
                success: "Short answer question created successfully!",
                error: "Failed to create question",
            })
            .then((res) => {
                // Reset form after successful creation
                setQuestionContent("");
                setCorrectAnswer("");
                setExplanation("");
                onClose();
                onSubmit(res);
            })
            .catch(() => {
                // Error is already handled by toast.promise
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleClose = () => {
        if (isSubmitting) return; // Prevent closing while submitting
        
        // Reset form when closing
        setQuestionContent("");
        setCorrectAnswer("");
        setExplanation("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Short Answer Question</h5>
                        <button
                            type="button"
                            className="btn-close border-0 rounded-1"
                            aria-label="Close"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Question Content */}
                        <div className="mb-4">
                            <label htmlFor="questionContent" className="form-label fw-bold">
                                <i className="bi bi-question-circle me-1"></i>
                                Question Content
                                <span className="text-danger">*</span>
                            </label>
                            <textarea
                                id="questionContent"
                                className="form-control"
                                rows={4}
                                placeholder="Enter the question content here..."
                                value={questionContent}
                                onChange={(e) => setQuestionContent(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <div className="form-text">
                                Write a clear question that requires a short written response.
                            </div>
                        </div>

                        {/* Correct Answer */}
                        <div className="mb-4">
                            <label htmlFor="correctAnswer" className="form-label fw-bold">
                                <i className="bi bi-check-circle me-1"></i>
                                Correct Answer
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                id="correctAnswer"
                                className="form-control"
                                placeholder="Enter the expected answer..."
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <div className="form-text">
                                Provide the expected correct answer for this question.
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="mb-4">
                            <label htmlFor="explanation" className="form-label fw-bold">
                                <i className="bi bi-info-circle me-1"></i>
                                Explanation
                                <span className="text-muted">(Optional)</span>
                            </label>
                            <textarea
                                id="explanation"
                                className="form-control"
                                rows={3}
                                placeholder="Provide an explanation for the correct answer..."
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <div className="form-text">
                                Explain why this is the correct answer or provide additional context.
                            </div>
                        </div>

                        {/* Preview Section */}
                        {/* {questionContent && (
                            <div className="mb-4">
                                <h6 className="fw-bold text-muted">
                                    <i className="bi bi-eye me-1"></i>
                                    Preview
                                </h6>
                                <div className="border rounded p-3 bg-light">
                                    <p className="mb-2 fw-medium">{questionContent}</p>
                                    <div className="mb-2">
                                        <small className="text-muted">Expected Answer:</small>
                                        <div className="badge bg-success ms-2">{correctAnswer || "Not specified"}</div>
                                    </div>
                                    {explanation && (
                                        <div>
                                            <small className="text-muted">Explanation:</small>
                                            <p className="small mb-0 mt-1">{explanation}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )} */}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary me-3 rounded-3"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary rounded-3"
                            onClick={handleSubmit}
                            disabled={isSubmitting || !questionContent.trim() || !correctAnswer.trim()}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Question'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShortAnswerModal;
