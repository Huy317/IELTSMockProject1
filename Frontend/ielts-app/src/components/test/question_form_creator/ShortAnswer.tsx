interface ShortAnswerProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
}

function ShortAnswer({ question, updateQuestion }: ShortAnswerProps) {
  return (
    <div className="reading-short-answer">
      <label className="form-label">
        Correct Answer
        <small className="text-muted d-block">
          Enter the correct short answer (usually 1-3 words)
        </small>
      </label>
      
      <input
        type="text"
        className="reading-short-answer-input"
        value={question.correctAnswer || ""}
        onChange={(e) =>
          updateQuestion(question.id, "correctAnswer", e.target.value)
        }
        placeholder="Enter the correct short answer"
      />

      <div className="mt-3">
        <label className="form-label">Word Limit</label>
        <input
          type="number"
          className="form-control"
          style={{ width: "150px" }}
          value={question.wordLimit || 3}
          onChange={(e) =>
            updateQuestion(question.id, "wordLimit", Number(e.target.value))
          }
          min="1"
          max="5"
        />
        <small className="text-muted">
          Maximum number of words allowed in the answer
        </small>
      </div>

      <div className="mt-3">
        <label className="form-label">Alternative Answers (optional)</label>
        <textarea
          className="form-control"
          rows={3}
          value={question.alternativeAnswers || ""}
          onChange={(e) =>
            updateQuestion(question.id, "alternativeAnswers", e.target.value)
          }
          placeholder="Enter alternative correct answers, separated by commas
Example: cat, feline, kitten"
        />
        <small className="text-muted">
          Provide alternative acceptable answers separated by commas
        </small>
      </div>
    </div>
  );
}

export default ShortAnswer;
