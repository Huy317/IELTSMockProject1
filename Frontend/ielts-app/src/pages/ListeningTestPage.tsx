import HeaderReading from "../components/test/header-reading";
import QuestionReading from "../components/test/question-reading";
import Pagination from "../components/utils/Pagination";

function ListeningTestPage() {
    return (
    <div className="container mt-4">
      <HeaderReading />
      <div className="row mt-4">
        <div>
          <QuestionReading />
        </div>
      </div>
      <Pagination/>
    </div>
  );
}

export default ListeningTestPage;