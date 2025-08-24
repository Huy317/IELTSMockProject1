import React from "react";

interface SentenceCompletionProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
}

const SentenceCompletion: React.FC<SentenceCompletionProps> = ({
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
        Correct Answers for Blanks
        <small className="text-muted d-block">
          Enter the correct word/phrase for each blank in the sentence completion
        </small>
      </label>
      
      <div className="mb-3">
        <label className="form-label">Sentence/Text with Blanks</label>
        <textarea
          className="form-control"
          rows={4}
          value={question.sentenceWithBlanks || ""}
          onChange={(e) =>
            updateQuestion(question.id, "sentenceWithBlanks", e.target.value)
          }
          placeholder="Enter the sentence with blanks marked as _____ or (1), (2), etc.
Example: The study showed that _____ (1) has a significant impact on _____ (2)."
        />
      </div>

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
        className="btn btn-outline-primary btn-sm"
        onClick={addBlank}
      >
        <i className="bi bi-plus-circle me-1"></i> Add Another Blank
      </button>

      <div className="mt-3">
        <label className="form-label">Word Limit (optional)</label>
        <input
          type="number"
          className="form-control"
          style={{ width: "150px" }}
          value={question.wordLimit || ""}
          onChange={(e) =>
            updateQuestion(question.id, "wordLimit", e.target.value)
          }
          placeholder="e.g., 3"
          min="1"
          max="5"
        />
        <small className="text-muted">
          Maximum number of words for each answer (if applicable)
        </small>
      </div>
    </div>
  );
};

export default SentenceCompletion;
