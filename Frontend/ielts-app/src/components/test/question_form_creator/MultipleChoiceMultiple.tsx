interface MultipleChoiceMultipleProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
  updateQuestionOption: (questionId: any, optionIndex: any, value: any) => void;
}

function MultipleChoiceMultiple({
  question,
  updateQuestion,
  updateQuestionOption,
}: MultipleChoiceMultipleProps) {
  return (
    <div className="row g-2 mb-3">
      {question.options.map((option: any, optionIndex: any) => (
        <div key={optionIndex} className="col-md-6">
          <div className="input-group">
            <div className="input-group-text">
              <input
                type="checkbox"
                name={`correct-${question.id}-${optionIndex}`}
                value={option}
                checked={
                  Array.isArray(question.correctAnswer) &&
                  question.correctAnswer.includes(option) &&
                  option !== ""
                }
                onChange={(e) => {
                  const currentAnswers = Array.isArray(question.correctAnswer)
                    ? question.correctAnswer
                    : [];
                  if (e.target.checked) {
                    updateQuestion(question.id, "correctAnswer", [
                      ...currentAnswers,
                      option,
                    ]);
                  } else {
                    updateQuestion(
                      question.id,
                      "correctAnswer",
                      currentAnswers.filter((ans: string) => ans !== option)
                    );
                  }
                }}
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

export default MultipleChoiceMultiple;
