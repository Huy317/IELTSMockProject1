import { useRef } from "react";
import {
  MultipleChoiceSingle,
  MultipleChoiceMultiple,
  FillInBlanks,
  Matching,
} from "./index";

interface Question {
  id: number;
  questionNumber: number;
  sectionId: number;
  questionType: string;
  questionText: string;
  options?: string[] | { items: string[]; matches: string[] };
  correctAnswer?: string | string[] | { item: number; match: number }[];
  blanksCount?: number;
  explanation?: string;
}

interface ListeningSection {
  id: number;
  title: string;
  description: string;
  audioFile?: File;
  transcript: string;
  questions: Question[];
  questionType: string;
  range?: string;
  isExpanded: boolean;
}

interface ListeningSectionComponentProps {
  sections: ListeningSection[];
  updateListeningSection: (
    sectionId: number,
    field: string,
    value: any
  ) => void;
  toggleListeningSectionExpansion: (sectionId: number) => void;
  addListeningQuestion: (sectionId: number) => void;
  updateListeningQuestion: (
    sectionId: number,
    questionId: number,
    field: string,
    value: any
  ) => void;
  updateListeningQuestionOption: (
    sectionId: number,
    questionId: number,
    optionIndex: number,
    value: any
  ) => void;
  removeListeningQuestion: (sectionId: number, questionId: number) => void;
}

function ListeningSectionComponent(props: ListeningSectionComponentProps) {
  const {
    sections,
    updateListeningSection,
    toggleListeningSectionExpansion,
    addListeningQuestion,
    updateListeningQuestion,
    updateListeningQuestionOption,
    removeListeningQuestion,
  } = props;

  const audioFileRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const getSectionTitle = (sectionNumber: number) => {
    return `Section ${sectionNumber}`;
  };

  return (
    <div className="mb-4">
      {sections.map((section) => (
        <div key={section.id} className="card mb-4 border-primary">
          <div
            className="card-header bg-primary bg-opacity-10 d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleListeningSectionExpansion(section.id)}
          >
            <div className="d-flex align-items-center">
              <div>
                <h3 className="mb-0">
                  <i className="bi bi-speaker me-2"></i>
                  {getSectionTitle(section.id)}
                </h3>
              </div>
            </div>
            <span className="expand-collapse-icon">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </span>
          </div>

          {section.isExpanded && (
            <div className="card-body">
              {/* Audio Upload */}
              <div className="mb-3">
                <label className="form-label">
                  Audio File Upload <span className="text-danger">*</span>
                </label>
                <div
                  className="border border-2 border-dashed rounded p-4 text-center bg-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => audioFileRefs.current[section.id]?.click()}
                >
                  <p className="mb-2">
                    {section.audioFile ? (
                      <>
                        <i className="bi bi-file-earmark-music text-success me-2"></i>
                        {section.audioFile.name}
                      </>
                    ) : (
                      <>
                        🎵 Click to upload audio file for Section {section.id}
                      </>
                    )}
                  </p>
                  <p className="small text-muted mb-0">
                    Supported formats: MP3, WAV, M4A (Max 100MB)
                  </p>
                  <input
                    type="file"
                    ref={(el) => {
                      audioFileRefs.current[section.id] = el;
                    }}
                    accept="audio/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateListeningSection(section.id, "audioFile", file);
                      }
                    }}
                  />
                </div>
                {section.audioFile && (
                  <div className="mt-2">
                    <audio controls className="w-100">
                      <source
                        src={URL.createObjectURL(section.audioFile)}
                        type={section.audioFile.type}
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>

              {/* Transcript */}
              <div className="mb-4">
                <label className="form-label">
                  Audio Transcript <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  rows={6}
                  value={section.transcript}
                  onChange={(e) =>
                    updateListeningSection(
                      section.id,
                      "transcript",
                      e.target.value
                    )
                  }
                  placeholder={`Paste the complete audio transcript for Section ${section.id} here...`}
                />
              </div>

              {/* Questions */}
              <div className="border rounded p-4 bg-light">
                <h4 className="mb-3">
                  <i className="bi bi-pencil-square me-2"></i>
                  Questions Builder
                </h4>

                {/* Questions List */}
                <div className="questions-container mb-3">
                  {section.questions
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
                              style={{ width: "35px", height: "35px" }}
                            >
                              {question.questionNumber}
                            </span>
                            <div>
                              <h6 className="mb-0">
                                Question {question.questionNumber}
                              </h6>
                              <small className="text-muted">
                                Section {section.id}
                              </small>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              removeListeningQuestion(section.id, question.id)
                            }
                          >
                            <i className="bi bi-trash3 me-1"></i> DELETE
                          </button>
                        </div>

                        <div className="card-body">
                          <div className="mb-3">
                            <textarea
                              value={question.questionText}
                              onChange={(e) =>
                                updateListeningQuestion(
                                  section.id,
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

                          {/* Multiple Choice (Single Answer) */}
                          {question.questionType === "multiple-choice" &&
                            question.options &&
                            Array.isArray(question.options) && (
                              <MultipleChoiceSingle
                                question={question}
                                updateQuestion={(id, field, value) =>
                                  updateListeningQuestion(
                                    section.id,
                                    id,
                                    field,
                                    value
                                  )
                                }
                                updateQuestionOption={(id, index, value) =>
                                  updateListeningQuestionOption(
                                    section.id,
                                    id,
                                    index,
                                    value
                                  )
                                }
                              />
                            )}

                          {/* Multiple Choice (Multiple Answers) */}
                          {question.questionType ===
                            "multiple-choice-multiple" &&
                            question.options &&
                            Array.isArray(question.options) && (
                              <MultipleChoiceMultiple
                                question={question}
                                updateQuestion={(id, field, value) =>
                                  updateListeningQuestion(
                                    section.id,
                                    id,
                                    field,
                                    value
                                  )
                                }
                                updateQuestionOption={(id, index, value) =>
                                  updateListeningQuestionOption(
                                    section.id,
                                    id,
                                    index,
                                    value
                                  )
                                }
                              />
                            )}

                          {/* Fill in the Blanks */}
                          {question.questionType === "fill-blanks" && (
                            <FillInBlanks
                              question={question}
                              updateQuestion={(id, field, value) =>
                                updateListeningQuestion(
                                  section.id,
                                  id,
                                  field,
                                  value
                                )
                              }
                            />
                          )}

                          {/* Matching */}
                          {question.questionType === "matching" && (
                            <Matching
                              question={question}
                              updateQuestion={(id, field, value) =>
                                updateListeningQuestion(
                                  section.id,
                                  id,
                                  field,
                                  value
                                )
                              }
                            />
                          )}

                          <div className="border-top pt-3">
                            <label className="form-label">
                              Explanation (Optional)
                            </label>
                            <textarea
                              className="form-control"
                              rows={3}
                              value={question.explanation || ""}
                              onChange={(e) =>
                                updateListeningQuestion(
                                  section.id,
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
                      className="form-select"
                      value={section.questionType}
                      onChange={(e) =>
                        updateListeningSection(
                          section.id,
                          "questionType",
                          e.target.value
                        )
                      }
                    >
                      <option value="multiple-choice">
                        Multiple Choice (Single Answer)
                      </option>
                      <option value="multiple-choice-multiple">
                        Multiple Choice (Multiple Answers)
                      </option>
                      <option value="fill-blanks">Fill in the Blanks</option>
                      <option value="matching">Matching</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Questions Range</label>
                    <input
                      type="text"
                      className="form-control"
                      value={section.range || ""}
                      onChange={(e) =>
                        updateListeningSection(section.id, "range", e.target.value)
                      }
                      placeholder={`e.g., Questions 1-10`}
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-custom-purple"
                    onClick={() => addListeningQuestion(section.id)}
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListeningSectionComponent;
