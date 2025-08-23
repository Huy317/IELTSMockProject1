import HeaderReading from "../components/test/header-reading";
import QuestionReading from "../components/test/question-reading";

function ListeningTestPage() {
    return (
    <div className="container mt-4">
      <HeaderReading />
      <div className="row mt-4">
        <div>
          <QuestionReading />
        </div>
      </div>
    </div>
  );
}

export default ListeningTestPage;