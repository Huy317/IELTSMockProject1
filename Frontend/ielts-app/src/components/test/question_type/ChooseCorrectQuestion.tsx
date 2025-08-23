interface CorrectChoiceQuestionProps {
  question: string;
  options: string[];
}
function ChooseCorrectQuestion({ question, options }: CorrectChoiceQuestionProps) {
  return (
    <div className="mb-3">
      <div>{question}</div>
      <div>
        {options.map((opt, idx) => (
          <label key={idx} className="ms-3">
            <input type="radio" name={question} /> {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function testCorrect(question : CorrectChoiceQuestionProps[]) {
  return (
    <div>
      {question.map((q, idx) => (
        <ChooseCorrectQuestion key={idx} question={q.question} options={q.options} />
      ))}
    </div>
  );
}

export {testCorrect};
export default ChooseCorrectQuestion;
