interface NoteCompletionItem {
  label: string;
  after?: string;
}

interface NoteCompletionQuestionProps {
  prompt: string;
  items: NoteCompletionItem[];
}

function NoteCompletionQuestion({ prompt, items }: NoteCompletionQuestionProps) {
  return (
    <div className="mb-4">
      <div className="fw-bold mb-2">{prompt}</div>
      <ul className="list-unstyled">
        {items.map((item, idx) => (
          <li key={idx} className="mb-3 d-flex align-items-center">
            <span>{item.label} </span>
            <input type="text" className="form-control d-inline-block w-auto mx-2" />
            {item.after && <span>{item.after}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// const noteCompletionProps: NoteCompletionQuestionProps = {
//   prompt: "Trans-Australian Railway (TAR) Key Facts",
//   items: [
//     { label: "Longest straight track section:", after: "miles" },
//     { label: "Original gauge of eastern/western railways:" },
//     { label: "Year diesel replaced steam engines:" },
//     { label: "Final year of the Tea and Sugar Train:" }
//   ]
// };

// function NoteCompletionQuestionDemo() {
//   return <NoteCompletionQuestion {...noteCompletionProps} />;
// }

function testNote(question : NoteCompletionQuestionProps[]) {
  return (
    <div>
      {question.map((q, idx) => (
        <NoteCompletionQuestion key={idx} prompt= {q.prompt} items = {q.items}/>
      ))}
    </div>
  );
}

export {testNote};
// export { NoteCompletionQuestionDemo };
export default NoteCompletionQuestion;
