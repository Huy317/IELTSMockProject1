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
      <div className="fw-bold mb-3">{prompt}</div>
      <div className="lh-lg">
        {items.map((item, idx) => (
          <div key={idx} className="mb-2">
            <span className="me-1">{item.label}</span>
            <input 
              type="text" 
              className="form-control d-inline-block border-1 border-dark bg-transparent px-2" 
              style={{ width: '80px' }}
            />
            {item.after && <span className="ms-1">{item.after}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

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
export default NoteCompletionQuestion;