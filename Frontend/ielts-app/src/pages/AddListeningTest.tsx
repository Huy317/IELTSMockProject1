import { useState, useRef } from "react";
import "./AddListeningTest.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  MultipleChoiceSingle,
  MultipleChoiceMultiple,
  FillInBlanks,
  Matching,
} from "../components/test/question_form_creator";

// interface Question {
//   id: number;
//   section: string;
//   questionType: string;
//   questionText: string;
//   options?: string[];
//   correctAnswer?: string;
//   points: number;
//   explanation?: string;
// }

function AddListeningTest() {
  const audioFileRef = useRef<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [nextQuestionId, setNextQuestionId] = useState(1);
  const [, setLastCreatedQuestionNumber] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({
    title: "",
    duration: 30,
    transcript: "",
    instructions: "",
    availability: "public",
    attempts: "unlimited",
    description: "",
    tags: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({ ...prev, audioFile: file }));
    }
  };

  const addListeningQuestion = () => {
    const section =
      (document.getElementById("listeningSection") as any)?.value || "1";
    const questionType =
      (document.getElementById("listeningQuestionType") as any)?.value ||
      "multiple-choice";

    // Find the lowest available question number
    const existingNumbers = questions.map((q) => q.questionNumber);
    let newQuestionNumber = 1;
    while (existingNumbers.includes(newQuestionNumber)) {
      newQuestionNumber++;
    }

    const newQuestion = {
      id: nextQuestionId,
      questionNumber: newQuestionNumber, // Use the lowest available number
      section,
      questionType,
      questionText: "",
      options:
        questionType === "multiple-choice" ||
        questionType === "multiple-choice-multiple"
          ? ["", "", "", ""]
          : questionType === "matching"
          ? {
              items: ["", "", "", ""],
              matches: ["", "", "", ""],
            }
          : undefined,
      correctAnswer:
        questionType === "multiple-choice-multiple"
          ? []
          : questionType === "fill-blanks"
          ? [""]
          : questionType === "matching"
          ? [{ item: 0, match: 0 }]
          : undefined,
      blanksCount: questionType === "fill-blanks" ? 1 : undefined,
      explanation: "",
    };

    setQuestions((prev: any) => [newQuestion, ...prev]); // Add to beginning
    setNextQuestionId((prev) => prev + 1);
    setLastCreatedQuestionNumber(newQuestionNumber);

    // Scroll to the newly created question after a short delay
    setTimeout(() => {
      const questionElement = document.getElementById(
        `question-${newQuestionNumber}`
      );
      if (questionElement) {
        questionElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, 100);
  };

  const updateQuestion = (id: any, field: any, value: any) => {
    setQuestions((prev: any) =>
      prev.map((q: any) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateQuestionOption = (
    questionId: any,
    optionIndex: any,
    value: any
  ) => {
    setQuestions((prev: any) =>
      prev.map((q: any) =>
        q.id === questionId && q.options
          ? {
              ...q,
              options: q.options.map((opt: any, idx: any) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const removeQuestion = (id: number) => {
    setQuestions((prev: any) => prev.filter((q: any) => q.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Questions:", questions);
    alert("Listening test created successfully!");
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 text-primary">
                <i className="bi bi-headphones me-2"></i> Create Listening Test
              </h2>

              <form id="listeningTestForm" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-8">
                    <label className="form-label">
                      Test Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., IELTS Listening Practice Test 1"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Test Availability</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="public">Public (Anyone can access)</option>
                      <option value="private">
                        Private (Invited users only)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Audio File Upload <span className="text-danger">*</span>
                  </label>
                  <div
                    className="border border-2 border-dashed rounded p-4 text-center bg-light"
                    style={{ cursor: "pointer" }}
                    onClick={() => audioFileRef.current?.click()}
                  >
                    <p className="mb-2">
                      🎵 Click to upload audio file or drag & drop
                    </p>
                    <p className="small text-muted mb-0">
                      Supported formats: MP3, WAV, M4A (Max 100MB)
                    </p>
                    <input
                      type="file"
                      ref={audioFileRef}
                      name="audioFile"
                      accept="audio/*"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Audio Transcript <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="transcript"
                    className="form-control"
                    rows={6}
                    value={formData.transcript}
                    onChange={handleInputChange}
                    placeholder="Paste the complete audio transcript here. This will help in creating accurate questions and answers..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <h3 className="mb-3">
                    <i className="bi bi-pencil-square me-2"></i> Questions
                    Builder
                  </h3>

                  <div id="listeningQuestions">
                    {questions
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
                                style={{ width: "40px", height: "40px" }}
                              >
                                {question.questionNumber}
                              </span>
                              <div>
                                <h5 className="mb-0">
                                  Question {question.questionNumber}
                                </h5>
                                <small className="text-muted">
                                  Section {question.section}
                                </small>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeQuestion(question.id)}
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
                              question.options && (
                                <MultipleChoiceSingle
                                  question={question}
                                  updateQuestion={updateQuestion}
                                  updateQuestionOption={updateQuestionOption}
                                />
                              )}

                            {/* Multiple Choice (Multiple Answers) */}
                            {question.questionType ===
                              "multiple-choice-multiple" &&
                              question.options && (
                                <MultipleChoiceMultiple
                                  question={question}
                                  updateQuestion={updateQuestion}
                                  updateQuestionOption={updateQuestionOption}
                                />
                              )}

                            {/* Fill in the Blanks */}
                            {question.questionType === "fill-blanks" && (
                              <FillInBlanks
                                question={question}
                                updateQuestion={updateQuestion}
                              />
                            )}

                            {/* Matching */}
                            {question.questionType === "matching" && (
                              <Matching
                                question={question}
                                updateQuestion={updateQuestion}
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
                                  updateQuestion(
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
                      <label className="form-label">Section</label>
                      <select id="listeningSection" className="form-select">
                        <option value="1">Section 1 (Social Context)</option>
                        <option value="2">Section 2 (Monologue)</option>
                        <option value="3">
                          Section 3 (Academic Discussion)
                        </option>
                        <option value="4">Section 4 (Academic Lecture)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Question Type</label>
                      <select
                        id="listeningQuestionType"
                        className="form-select"
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
                  </div>

                  <div className="d-grid mb-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={addListeningQuestion}
                    >
                      <i className="bi bi-plus-circle-fill me-2"></i> Add
                      Question
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Special Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for test-takers (e.g., 'You will hear each recording only once', 'Write your answers in the order you hear them')"
                    className="form-control"
                    rows={3}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success btn-lg px-5">
                    <i className="bi bi-floppy-fill me-2"></i> Save Listening
                    Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddListeningTest;
