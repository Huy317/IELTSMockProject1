interface MultipleChoiceSingleProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
  updateQuestionOption: (questionId: any, optionIndex: any, value: any) => void;
}

function MultipleChoiceSingle({
  question,
  updateQuestion,
  updateQuestionOption,
}: MultipleChoiceSingleProps) {
  return (
    <div className="row g-2 mb-3">
      {question.options.map((option: any, optionIndex: any) => (
        <div key={optionIndex} className="col-md-6">
          <div className="input-group">
            <div className="input-group-text">
              <input
                type="radio"
                name={`correct-${question.id}`}
                value={option}
                checked={question.correctAnswer === option && option !== ""}
                onChange={() =>
                  updateQuestion(question.id, "correctAnswer", option)
                }
              />
            </div>
            <input
              type="text"
              value={option}
              onChange={(e) =>
                updateQuestionOption(question.id, optionIndex, e.target.value)
              }
              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
              className="form-control"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MultipleChoiceSingle;
