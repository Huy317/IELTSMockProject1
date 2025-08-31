interface TrueFalseNotGivenProps {
  question: any;
  updateQuestion: (id: any, field: any, value: any) => void;
}

function TrueFalseNotGiven({
  question,
  updateQuestion,
}: TrueFalseNotGivenProps) {
  const options = ["True", "False", "Not Given"];

  return (
    <div className="reading-tfng-container">
      <label className="form-label">Correct Answer</label>
      <div className="reading-tfng-options">
        {options.map((option, index) => (
          <label
            key={index}
            className={`reading-tfng-option ${
              question.correctAnswer === option ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name={`tfng-${question.id}`}
              value={option}
              checked={question.correctAnswer === option}
              onChange={(e) =>
                updateQuestion(question.id, "correctAnswer", e.target.value)
              }
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default TrueFalseNotGiven;
