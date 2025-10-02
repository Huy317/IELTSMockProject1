import { useState } from "react";
import type { QuestionToCreate } from "../../../types/Question";
import { toast } from "react-toastify";
import { createQuestion } from "../../../services/questionService";

interface Choice {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface OtherData {
  parentId: number;
  testId: number;
  order: number;
}

interface SingleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  otherData?: OtherData;
}

// ChoiceItem component - MUST be defined outside to prevent re-renders and focus loss
interface ChoiceItemProps {
  choice: Choice;
  index: number;
  onTextChange: (id: number, text: string) => void;
  onCorrectChange: (id: number) => void;
  onDelete: (id: number) => void;
  canDelete: boolean;
}

function ChoiceItem({
  choice,
  index,
  onTextChange,
  onCorrectChange,
  onDelete,
  canDelete,
}: ChoiceItemProps) {
  return (
    <div className="border rounded p-3 mb-3 bg-light">
      <div className="row align-items-center">
        <div className="col-9">
          <div className="input-group mb-2">
            <div className="input-group-text me-2">
              <input
                className="form-check-input mt-0"
                type="radio"
                id={`correct-${choice.id}`}
                name="correctChoice"
                checked={choice.isCorrect}
                onChange={() => onCorrectChange(choice.id)}
                title="Mark as correct answer"
                style={{
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={choice.text}
              onChange={(e) => onTextChange(choice.id, e.target.value)}
              placeholder={`Enter choice ${index + 1}`}
            />
          </div>
        </div>
        <div className="col-3 text-center">
          <button
            type="button"
            className="btn btn-outline-danger btn-md rounded-3"
            onClick={() => onDelete(choice.id)}
            disabled={!canDelete}
            title="Delete choice"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function SingleChoiceModal({
  isOpen,
  onClose,
  onSubmit,
  otherData,
}: SingleChoiceModalProps) {
  const [questionContent, setQuestionContent] = useState("");
  const [choices, setChoices] = useState<Choice[]>([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
  ]);
  const [explanation, setExplanation] = useState("");
  const [nextChoiceId, setNextChoiceId] = useState(3);

  const handleAddChoice = () => {
    const newChoice: Choice = {
      id: nextChoiceId,
      text: "",
      isCorrect: false,
    };
    setChoices([...choices, newChoice]);
    setNextChoiceId(nextChoiceId + 1);
  };

  const handleChoiceTextChange = (id: number, text: string) => {
    setChoices(
      choices.map((choice) => (choice.id === id ? { ...choice, text } : choice))
    );
  };

  const handleChoiceCorrectChange = (id: number) => {
    setChoices(
      choices.map((choice) =>
        choice.id === id
          ? { ...choice, isCorrect: true }
          : { ...choice, isCorrect: false }
      )
    );
  };

  const handleDeleteChoice = (id: number) => {
    // Prevent deleting if only 2 choices remain
    if (choices.length <= 2) return;
    setChoices(choices.filter((choice) => choice.id !== id));
  };

  function formatChoicesToString(choices: Choice[]): string {
    return choices.map((choice) => choice.text).join("|");
  }

  function formatCorrectAnswersToString(choices: Choice[]): string {
    const correctChoice = choices.find((c) => c.isCorrect);
    return correctChoice ? correctChoice.text : "";
  }

  const validateForm = () => {
    if (!questionContent.trim()) {
      alert("Question content is required");
      return false;
    }

    if (!choices.some((choice) => choice.isCorrect)) {
      alert("Please select exactly one correct answer");
      return false;
    }

    if (choices.some((choice) => !choice.text.trim())) {
      alert("All choices must have text");
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
      questionType: "SingleChoice",
      content: questionContent,
      choices: formatChoicesToString(choices),
      correctAnswer: formatCorrectAnswersToString(choices),
      explanation: explanation,
      parentId: otherData.parentId,
      testId: otherData.testId,
      order: otherData.order,
      link: "",
    };

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
            <h5 className="modal-title">Single Choice Question</h5>
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
                placeholder="Enter your question here..."
              ></textarea>
            </div>

            {/* Choices Section */}
            <div className="mb-3">
              <label className="form-label fw-bold">Choices</label>
              <small className="form-text text-muted d-block mb-3">
                Select the correct choice
              </small>

              {/* Render all choices */}
              {choices.map((choice, index) => (
                <ChoiceItem
                  key={choice.id}
                  choice={choice}
                  index={index}
                  onTextChange={handleChoiceTextChange}
                  onCorrectChange={handleChoiceCorrectChange}
                  onDelete={handleDeleteChoice}
                  canDelete={choices.length > 2}
                />
              ))}

              {/* Add Choice Button */}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm rounded-1"
                onClick={handleAddChoice}
              >
                <i className="bi bi-plus me-1"></i>
                Add Choice
              </button>
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

export default SingleChoiceModal;
