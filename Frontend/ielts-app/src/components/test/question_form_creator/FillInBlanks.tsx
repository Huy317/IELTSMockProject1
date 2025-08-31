interface FillInBlanksProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
}

function FillInBlanks({ question, updateQuestion }: FillInBlanksProps) {
  return (
    <div className="mb-3">
      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Number of Blanks</label>
          <input
            type="number"
            min="1"
            max="10"
            value={question.blanksCount || 1}
            onChange={(e) =>
              updateQuestion(
                question.id,
                "blanksCount",
                parseInt(e.target.value)
              )
            }
            className="form-control"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Correct Answers (one per line)</label>
        <textarea
          value={
            Array.isArray(question.correctAnswer)
              ? question.correctAnswer.join("\n")
              : ""
          }
          onChange={(e) => {
            const answers = e.target.value
              .split("\n")
              .filter((line) => line.trim() !== "");
            updateQuestion(question.id, "correctAnswer", answers);
          }}
          placeholder="Enter correct answers, one per line&#10;Example:&#10;university&#10;professor&#10;library"
          className="form-control"
          rows={question.blanksCount || 1}
        />
      </div>
      <div className="alert alert-info d-flex align-items-center">
        <i className="bi bi-info-circle me-2"></i>
        <span>
          Use underscores (_____) in your question text to indicate where blanks
          should appear.
        </span>
      </div>
    </div>
  );
}

export default FillInBlanks;
