import { useState } from "react";
import type { QuestionToCreate } from "../../../types/Question";
import { toast } from "react-toastify";
import { createQuestion } from "../../../services/questionService";

interface OtherData {
    parentId: number;
    testId: number;
    order: number;
}

interface MatchingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    otherData?: OtherData;
}

function MatchingModal({
    isOpen,
    onClose,
    onSubmit,
    otherData,
}: MatchingModalProps) {
    const [listOfOptions, setListOfOptions] = useState("");
    const [questionContent, setQuestionContent] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [explanation, setExplanation] = useState("");

    const validateForm = () => {
        if (!listOfOptions.trim()) {
            alert("List of options is required");
            return false;
        }

        if (!questionContent.trim()) {
            alert("Question content is required");
            return false;
        }

        if (!correctAnswer.trim()) {
            alert("Correct answer is required");
            return false;
        }

        return true;
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = () => {
        if (!otherData) return;

        if (!validateForm()) return;

        if (isSubmitting) return;
        const data: QuestionToCreate = {
            questionType: "Matching",
            content: questionContent,
            choices: listOfOptions,
            correctAnswer: correctAnswer,
            explanation: explanation,
            parentId: otherData.parentId,
            testId: otherData.testId,
            order: otherData.order,
            link: "",
        };

        console.log(data);

        setIsSubmitting(true);
        console.log(data);

        setIsSubmitting(true);

        // Call API to create question
        toast
            .promise(createQuestion(data), {
                pending: "Creating question...",
                success: "Question created successfully!",
                error: "Failed to create question",
            })
            .then((res) => {
                onClose();

                // Remember to call this
                onSubmit(res);
            })
            .catch(() => {
                // Error is already handled by toast.promise
            })
            .finally(() => {
                setIsSubmitting(false);
            });
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
                        <h5 className="modal-title">Matching Question</h5>
                        <button
                            type="button"
                            className="btn-close border-0 rounded-1"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* List of Options */}
                        <div className="mb-3">
                            <label htmlFor="listOfOptions" className="form-label fw-bold">
                                List of Options
                            </label>
                            <textarea
                                className="form-control"
                                id="listOfOptions"
                                rows={6}
                                value={listOfOptions}
                                onChange={(e) => setListOfOptions(e.target.value)}
                                placeholder="Paste or type your list of options here:&#10;A. Option 1&#10;B. Option 2&#10;i. Option 1&#10;ii. Option 2"
                            ></textarea>
                            <small className="form-text text-muted">
                                Paste your list of options here. Each option should be on a new
                                line.
                            </small>
                        </div>

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
                                placeholder="Match this statement with the correct option:"
                            ></textarea>
                            <small className="form-text text-muted">
                                Enter the matching instruction
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
                                placeholder="Option 1 | Option 2"
                            />
                            <small className="form-text text-muted">
                                Enter the correct option letter
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

export default MatchingModal;
