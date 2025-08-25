interface MatchingHeadingsProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
}

function MatchingHeadings({
  question,
  updateQuestion,
}: MatchingHeadingsProps) {
  const updateMatchingItem = (index: number, field: "items" | "matches", value: string) => {
    const updatedOptions = { ...question.options };
    updatedOptions[field][index] = value;
    updateQuestion(question.id, "options", updatedOptions);
  };

  const addMatchingPair = () => {
    const updatedOptions = { ...question.options };
    updatedOptions.items.push("");
    updatedOptions.matches.push("");
    updateQuestion(question.id, "options", updatedOptions);
  };

  const removeMatchingPair = (index: number) => {
    if (question.options.items.length > 1) {
      const updatedOptions = { ...question.options };
      updatedOptions.items.splice(index, 1);
      updatedOptions.matches.splice(index, 1);
      updateQuestion(question.id, "options", updatedOptions);
    }
  };

  return (
    <div className="reading-matching-container">
      <div className="reading-matching-grid">
        <div className="reading-matching-column">
          <h5>Questions/Paragraphs</h5>
          {question.options?.items?.map((item: string, index: number) => (
            <div key={index} className="reading-matching-item">
              <span className="reading-matching-number">{index + 1}.</span>
              <input
                type="text"
                className="reading-matching-input"
                value={item}
                onChange={(e) => updateMatchingItem(index, "items", e.target.value)}
                placeholder={`Question/Paragraph ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="reading-matching-column">
          <h5>Headings/Options</h5>
          {question.options?.matches?.map((match: string, index: number) => (
            <div key={index} className="reading-matching-item">
              <span className="reading-matching-letter">
                {String.fromCharCode(65 + index)}.
              </span>
              <input
                type="text"
                className="reading-matching-input"
                value={match}
                onChange={(e) => updateMatchingItem(index, "matches", e.target.value)}
                placeholder={`Heading ${String.fromCharCode(65 + index)}`}
              />
              {question.options.items.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-2"
                  onClick={() => removeMatchingPair(index)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={addMatchingPair}
        >
          <i className="bi bi-plus-circle me-1"></i> Add Pair
        </button>
      </div>

      <div>
        <label className="form-label">Correct Matches</label>
        <div className="alert alert-info">
          <small>
            Example: If question 1 matches with heading A, question 2 with heading C, etc.
            Students will select the appropriate letter for each question number.
          </small>
        </div>
      </div>
    </div>
  );
}

export default MatchingHeadings;
