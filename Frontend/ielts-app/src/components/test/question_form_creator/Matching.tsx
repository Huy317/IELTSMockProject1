interface MatchingProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
}

function Matching({ question, updateQuestion }: MatchingProps) {
  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-md-6">
          <h5 className="mb-3">Items to Match</h5>
          {question.options?.items?.map((item: string, index: number) => (
            <div key={`item-${index}`} className="input-group mb-2">
              <span className="input-group-text fw-bold text-primary">
                {index + 1}.
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...(question.options?.items || [])];
                  newItems[index] = e.target.value;
                  updateQuestion(question.id, "options", {
                    ...question.options,
                    items: newItems,
                  });
                }}
                placeholder={`Item ${index + 1}`}
                className="form-control"
              />
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <h5 className="mb-3">Answer Options</h5>
          {question.options?.matches?.map((match: string, index: number) => (
            <div key={`match-${index}`} className="input-group mb-2">
              <span className="input-group-text fw-bold text-success">
                {String.fromCharCode(65 + index)}.
              </span>
              <input
                type="text"
                value={match}
                onChange={(e) => {
                  const newMatches = [...(question.options?.matches || [])];
                  newMatches[index] = e.target.value;
                  updateQuestion(question.id, "options", {
                    ...question.options,
                    matches: newMatches,
                  });
                }}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                className="form-control"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <label className="form-label">
          Correct Matches (Format: 1-A, 2-B, 3-C, 4-D)
        </label>
        <input
          type="text"
          value={
            Array.isArray(question.correctAnswer)
              ? question.correctAnswer
                  .map(
                    (match: any) =>
                      `${match.item + 1}-${String.fromCharCode(
                        65 + match.match
                      )}`
                  )
                  .join(", ")
              : ""
          }
          onChange={(e) => {
            const matches = e.target.value
              .split(",")
              .map((pair) => {
                const [item, match] = pair.trim().split("-");
                return {
                  item: parseInt(item) - 1,
                  match: match ? match.charCodeAt(0) - 65 : 0,
                };
              })
              .filter((match) => !isNaN(match.item) && !isNaN(match.match));
            updateQuestion(question.id, "correctAnswer", matches);
          }}
          placeholder="1-A, 2-B, 3-C, 4-D"
          className="form-control font-monospace"
        />
      </div>
    </div>
  );
};

export default Matching;
