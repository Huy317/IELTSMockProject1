import React from "react";
import HeaderReading from "../components/test/header-reading";
import ContentReading from "../components/test/content-reading";
import QuestionReading from "../components/test/question-reading";
import Pagination from "../components/utils/Pagination";

function ReadingTestPage() {
  return (
    <div className="container mt-4">
      <HeaderReading />
      <div className="row mt-4">
        <div className="col-md-6">
          <ContentReading />
        </div>
        <div className="col-md-6">
          <QuestionReading />
        </div>
      </div>
      <Pagination/>
    </div>
  );
}

export default ReadingTestPage;
