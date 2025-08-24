import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  MultipleChoiceSingle,
  TrueFalseNotGiven,
  YesNoNotGiven,
  MatchingHeadings,
  SentenceCompletion,
  SummaryCompletion,
  ShortAnswer,
} from "./index";

interface Passage {
  id: number;
  title: string;
  category: string;
  content: string;
  questions: any[];
  range: string;
  questionType: string;
  isExpanded: boolean;
}

interface PassageComponentProps {
  passage: Passage;
  index: number;
  updatePassage: (passageId: number, field: string, value: any) => void;
  togglePassageExpansion: (passageId: number) => void;
  addReadingQuestion: (passageId: number) => void;
  removeQuestion: (passageId: number, questionId: number) => void;
  updateQuestion: (
    passageId: number,
    questionId: any,
    field: any,
    value: any
  ) => void;
  updateQuestionOption: (
    passageId: number,
    questionId: any,
    optionIndex: any,
    value: any
  ) => void;
}

const PassageComponent: React.FC<PassageComponentProps> = ({
  passage,
  index,
  updatePassage,
  togglePassageExpansion,
  addReadingQuestion,
  removeQuestion,
  updateQuestion,
  updateQuestionOption,
}) => {
  const renderQuestionForm = (question: any, passageId: number) => {
    const questionProps = {
      question,
      updateQuestion: (id: any, field: any, value: any) =>
        updateQuestion(passageId, id, field, value),
      updateQuestionOption: (id: any, optionIndex: any, value: any) =>
        updateQuestionOption(passageId, id, optionIndex, value),
    };

    switch (question.questionType) {
      case "multiple-choice":
        return <MultipleChoiceSingle {...questionProps} />;
      case "true-false-notgiven":
        return <TrueFalseNotGiven {...questionProps} />;
      case "yes-no-notgiven":
        return <YesNoNotGiven {...questionProps} />;
      case "matching-headings":
      case "matching-information":
      case "matching-features":
        return <MatchingHeadings {...questionProps} />;
      case "sentence-completion":
      case "note-completion":
      case "table-completion":
      case "flow-chart":
      case "diagram-labeling":
        return <SentenceCompletion {...questionProps} />;
      case "summary-completion":
        return <SummaryCompletion {...questionProps} />;
      case "short-answer":
        return <ShortAnswer {...questionProps} />;
      default:
        return <MultipleChoiceSingle {...questionProps} />;
    }
  };

  return (
    <div className="card mb-4 border-info">
      <div
        className="card-header bg-info bg-opacity-10 d-flex justify-content-between align-items-center expandable-header"
        style={{ cursor: "pointer" }}
        onClick={() => togglePassageExpansion(passage.id)}
      >
        <h3 className="mb-0">
          <i className="bi bi-file-text me-2"></i>
          Passage {index + 1}
        </h3>
        <span className="expand-collapse-icon">
          {/* {passage.isExpanded ? (
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}><i className="bi bi-chevron-up"></i></span>
          ) : (
            
          )} */}
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            <i className="bi bi-chevron-down"></i>
          </span>
        </span>
      </div>

      {passage.isExpanded && (
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">
                Passage Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={passage.title}
                onChange={(e) =>
                  updatePassage(passage.id, "title", e.target.value)
                }
                placeholder="e.g., The History of Coffee"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Topic Category</label>
              <select
                value={passage.category}
                onChange={(e) =>
                  updatePassage(passage.id, "category", e.target.value)
                }
                className="form-select"
              >
                <option value="science">Science & Technology</option>
                <option value="history">History & Culture</option>
                <option value="environment">Environment</option>
                <option value="society">Society & People</option>
                <option value="education">Education</option>
                <option value="business">Business & Economy</option>
                <option value="health">Health & Medicine</option>
                <option value="arts">Arts & Literature</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">
              Passage Content <span className="text-danger">*</span>
            </label>
            <textarea
              value={passage.content}
              onChange={(e) =>
                updatePassage(passage.id, "content", e.target.value)
              }
              className="form-control"
              rows={8}
              placeholder="Paste the complete reading passage here. Ensure it's appropriate for the selected difficulty level..."
              required
            />
          </div>

          {/* Question Builder for this passage */}
          <div className="border rounded p-4 bg-light">
            <h4 className="mb-3">
              <i className="bi bi-pencil-square me-2"></i>
              Questions Builder
            </h4>

            {/* Questions for this passage */}
            <div id={`readingQuestions${passage.id}`} className="mb-3">
              {passage.questions
                .sort((a, b) => a.questionNumber - b.questionNumber)
                .map((question) => (
                  <div
                    key={question.id}
                    id={`question-${question.questionNumber}`}
                    className="card mb-3 border-primary"
                  >
                    <div className="card-header bg-primary bg-opacity-10 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <span
                          className="badge bg-primary me-3 fs-3 fw-bold rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "35px",
                            height: "35px",
                          }}
                        >
                          {question.questionNumber}
                        </span>
                        <div>
                          <h6 className="mb-0">
                            Question {question.questionNumber}
                          </h6>
                          <small className="text-muted">
                            Passage {index + 1}
                          </small>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeQuestion(passage.id, question.id)}
                      >
                        <i className="bi bi-trash3 me-1"></i> DELETE
                      </button>
                    </div>

                    <div className="card-body">
                      <div className="mb-3">
                        <textarea
                          value={question.questionText}
                          onChange={(e) =>
                            updateQuestion(
                              passage.id,
                              question.id,
                              "questionText",
                              e.target.value
                            )
                          }
                          placeholder="Enter the question text..."
                          className="form-control"
                          rows={3}
                        />
                      </div>

                      {renderQuestionForm(question, passage.id)}

                      <div className="border-top pt-3">
                        <label className="form-label">
                          Explanation (Optional)
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={question.explanation || ""}
                          onChange={(e) =>
                            updateQuestion(
                              passage.id,
                              question.id,
                              "explanation",
                              e.target.value
                            )
                          }
                          placeholder="Explanation for the answer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Question Type</label>
                <select
                  value={passage.questionType}
                  onChange={(e) =>
                    updatePassage(passage.id, "questionType", e.target.value)
                  }
                  className="form-select"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false-notgiven">
                    True/False/Not Given
                  </option>
                  <option value="yes-no-notgiven">Yes/No/Not Given</option>
                  <option value="matching-headings">Matching Headings</option>
                  <option value="matching-information">
                    Matching Information
                  </option>
                  <option value="matching-features">Matching Features</option>
                  <option value="sentence-completion">
                    Sentence Completion
                  </option>
                  <option value="summary-completion">Summary Completion</option>
                  <option value="note-completion">Note Completion</option>
                  <option value="table-completion">Table Completion</option>
                  <option value="flow-chart">Flow Chart Completion</option>
                  <option value="diagram-labeling">Diagram Labeling</option>
                  <option value="short-answer">Short Answer Questions</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Questions Range</label>
                <input
                  type="text"
                  value={passage.range}
                  onChange={(e) =>
                    updatePassage(passage.id, "range", e.target.value)
                  }
                  placeholder="e.g., Questions 1-13"
                  className="form-control"
                />
              </div>
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-custom-purple"
                onClick={() => addReadingQuestion(passage.id)}
              >
                <i className="bi bi-plus-circle-fill me-2"></i>
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassageComponent;
