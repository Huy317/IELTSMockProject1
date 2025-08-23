interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
}

function MultipleChoiceQuestion({ question, options }: MultipleChoiceQuestionProps) {
  return (
    <div className="mb-3">
      <div>{question}</div>
      <div>
        {options.map((opt, idx) => (
          <label key={idx} className="ms-3">
            <input type="checkbox" name={question} /> {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function testMul(questions: MultipleChoiceQuestionProps[]) {
  return (
    <div>
      {questions.map((q, idx) => (
        <MultipleChoiceQuestion key={idx} question={q.question} options={q.options} />
      ))}
    </div>
  );
}
export { testMul };
export default MultipleChoiceQuestion;
