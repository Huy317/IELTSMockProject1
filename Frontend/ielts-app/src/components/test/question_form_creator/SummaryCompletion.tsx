import React from "react";

interface SummaryCompletionProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
}

const SummaryCompletion: React.FC<SummaryCompletionProps> = ({
  question,
  updateQuestion,
}) => {
  const updateBlank = (index: number, value: string) => {
    const updatedAnswers = [...(question.correctAnswer || [""])];
    updatedAnswers[index] = value;
    updateQuestion(question.id, "correctAnswer", updatedAnswers);
  };

  const addBlank = () => {
    const updatedAnswers = [...(question.correctAnswer || [""]), ""];
    updateQuestion(question.id, "correctAnswer", updatedAnswers);
    updateQuestion(question.id, "blanksCount", (question.blanksCount || 1) + 1);
  };

  const removeBlank = (index: number) => {
    if ((question.correctAnswer?.length || 1) > 1) {
      const updatedAnswers = [...(question.correctAnswer || [""])];
      updatedAnswers.splice(index, 1);
      updateQuestion(question.id, "correctAnswer", updatedAnswers);
      updateQuestion(question.id, "blanksCount", (question.blanksCount || 1) - 1);
    }
  };

  return (
    <div className="reading-completion-container">
      <label className="form-label">
        Summary Text with Blanks
        <small className="text-muted d-block">
          Enter the summary text with blanks marked as _____ or (1), (2), etc.
        </small>
      </label>
      
      <div className="mb-3">
        <textarea
          className="form-control"
          rows={6}
          value={question.summaryText || ""}
          onChange={(e) =>
            updateQuestion(question.id, "summaryText", e.target.value)
          }
          placeholder="Enter the summary with blanks marked as _____ or (1), (2), etc.

Example: The research indicates that _____ (1) is becoming increasingly important in modern society. This trend has led to _____ (2) and affected how people _____ (3)."
        />
      </div>

      <label className="form-label">
        Correct Answers for Blanks
        <small className="text-muted d-block">
          Enter the correct word/phrase for each blank in the summary
        </small>
      </label>

      {(question.correctAnswer || [""]).map((answer: string, index: number) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <span className="reading-blank-number">Blank {index + 1}:</span>
          <input
            type="text"
            className="form-control reading-completion-blank flex-grow-1 mx-2"
            value={answer}
            onChange={(e) => updateBlank(index, e.target.value)}
            placeholder={`Answer for blank ${index + 1}`}
          />
          {(question.correctAnswer?.length || 1) > 1 && (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => removeBlank(index)}
            >
              <i className="bi bi-trash3"></i>
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="btn btn-outline-primary btn-sm mb-3"
        onClick={addBlank}
      >
        <i className="bi bi-plus-circle me-1"></i> Add Another Blank
      </button>

      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Word Limit per Blank</label>
          <input
            type="number"
            className="form-control"
            value={question.wordLimit || ""}
            onChange={(e) =>
              updateQuestion(question.id, "wordLimit", e.target.value)
            }
            placeholder="e.g., 2"
            min="1"
            max="5"
          />
          <small className="text-muted">
            Maximum words for each answer
          </small>
        </div>
        <div className="col-md-6">
          <label className="form-label">Answer Options (optional)</label>
          <textarea
            className="form-control"
            rows={3}
            value={question.wordBank || ""}
            onChange={(e) =>
              updateQuestion(question.id, "wordBank", e.target.value)
            }
            placeholder="Provide word bank options separated by commas
Example: technology, impact, communicate, social, digital"
          />
          <small className="text-muted">
            Word bank for students to choose from
          </small>
        </div>
      </div>
    </div>
  );
};

export default SummaryCompletion;
