import { testCorrect } from "./question_type/ChooseCorrectQuestion";
import { testMul } from "./question_type/MultipleChoiceQuestion";
import { testNote } from "./question_type/NoteCompletionQuestion";

function QuestionReading() {
  return (
    <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
      <h5><b>This is one choice</b></h5>
      <h5><b>This is TFNG</b></h5>
      {testCorrect([
        {
          question: "Which city is the capital of Australia?",
          options: ["Sydney", "Melbourne", "Canberra"],
        },
        {
          question: "Which city is the largest in Australia?",
          options: ["T", "F", "NG"],
        },
      ])}
      <h5>
        <b>This is fill in blank | complete the sentences | Matching heading</b>
      </h5>
      {testNote([
        {
          prompt: "Trans-Australian Railway (TAR) Key Facts",
          items: [
            { label: "Longest straight track section:", after: "miles" },
            { label: "Original gauge of eastern/western railways:" },
          ],
        },
        {
          prompt: "Trans-Australian Railway (TAR) Key Facts",
          items: [
            { label: "Longest straight", after: "track section: miles" },
            { label: "Original gauge of eastern/western railways:" },
          ],
        },
      ])}
      <h5>This is test multiple choice</h5>
      {testMul([
        { question: "aaaaaaaaaaaaa", options: ["Red", "Blue", "Green"] },
        {
          question: "aaaaaaaaaaaaaaaaaa",
          options: ["Sydney", "Melbourne", "Canberra"],
        },
      ])}
    </div>
  );
}

export default QuestionReading;
