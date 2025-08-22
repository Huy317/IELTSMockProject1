import { useState, useRef } from "react";
import "./AddListeningTest.css";
import GeneralSettings from '../components/utils/GeneralSettings';

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

// interface FormData extends GeneralSettingsData {
//   title: string;
//   duration: number;
//   audioFile?: File;
//   transcript: string;
//   instructions: string;
// }

function AddListeningTest() {
  const audioFileRef = useRef<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
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
      (document.getElementById("listeningQuestionType") as any)?.value || "multiple-choice";

    const newQuestion = {
      id: questions.length + 1,
      section,
      questionType,
      questionText: "",
      options:
        questionType === "multiple-choice" ? ["", "", "", ""] : undefined,
      correctAnswer: undefined,
      points: 1,
      explanation: "",
    };

    setQuestions((prev: any) => [...prev, newQuestion]);
  };

  const updateQuestion = (id: any, field: any, value: any) => {
    setQuestions((prev: any) =>
      prev.map((q: any) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateQuestionOption = (questionId: any, optionIndex: any, value: any) => {
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

  const removeQuestion = (id: any) => {
    setQuestions((prev: any) => prev.filter((q: any) => q.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Questions:", questions);
    alert("Listening test created successfully!");
  };

  return (
    <div className="listening-form-container">
      <div className="listening-form">
        <h2 className="listening-section-title">🎧 Listening Test Creator</h2>

        <form id="listeningTestForm" onSubmit={handleSubmit}>
          <GeneralSettings />

          <div className="listening-form-row">
            <div className="listening-form-group">
              <label>
                Test Title <span className="listening-required">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., IELTS Listening Practice Test 1"
                required
              />
            </div>
            <div className="listening-form-group">
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="10"
                max="60"
              />
            </div>
          </div>

          <div className="listening-form-group">
            <label>
              Audio File Upload <span className="listening-required">*</span>
            </label>
            <div
              className="listening-file-upload-area"
              onClick={() => audioFileRef.current?.click()}
            >
              <p>🎵 Click to upload audio file or drag & drop</p>
              <p style={{ fontSize: "14px", color: "#666", marginTop: "12px" }}>
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

          <div className="listening-form-group">
            <label>
              Audio Transcript <span className="listening-required">*</span>
            </label>
            <textarea
              name="transcript"
              className="listening-textarea-large"
              value={formData.transcript}
              onChange={handleInputChange}
              placeholder="Paste the complete audio transcript here. This will help in creating accurate questions and answers..."
              required
            />
          </div>

          <div className="listening-question-builder">
            <h3 style={{ marginBottom: "25px" }}>📝 Questions Builder</h3>

            <div className="listening-form-row">
              <div className="listening-form-group">
                <label>Section</label>
                <select id="listeningSection">
                  <option value="1">Section 1 (Social Context)</option>
                  <option value="2">Section 2 (Monologue)</option>
                  <option value="3">Section 3 (Academic Discussion)</option>
                  <option value="4">Section 4 (Academic Lecture)</option>
                </select>
              </div>
              <div className="listening-form-group">
                <label>Question Type</label>
                <select id="listeningQuestionType">
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="fill-blanks">Fill in the Blanks</option>
                  <option value="matching">Matching</option>
                  <option value="map-labeling">Map/Plan Labeling</option>
                  <option value="form-completion">Form Completion</option>
                  <option value="note-completion">Note Completion</option>
                  <option value="table-completion">Table Completion</option>
                  <option value="flow-chart">Flow Chart</option>
                  <option value="summary-completion">Summary Completion</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>
            </div>

            <div id="listeningQuestions">
              {questions.map((question) => (
                <div key={question.id} className="listening-question-item">
                  <div className="listening-question-header">
                    <div className="listening-question-info">
                      <div className="listening-question-number">
                        {question.id}
                      </div>
                      <div className="listening-question-meta">
                        <span className="listening-question-title">Question {question.id}</span>
                        <span className="listening-section-info">Section {question.section}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="listening-btn listening-btn-delete"
                      onClick={() => removeQuestion(question.id)}
                    >
                      🗑️ DELETE
                    </button>
                  </div>

                  <div className="listening-form-group">
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
                      className="listening-question-textarea"
                    />
                  </div>

                  {question.questionType === "multiple-choice" &&
                    question.options && (
                      <div className="listening-options-grid">
                        {question.options.map((option: any, index: any) => (
                          <div key={index} className="listening-option-item">
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              value={option}
                              checked={question.correctAnswer === option && option !== ""}
                              onChange={() =>
                                updateQuestion(
                                  question.id,
                                  "correctAnswer",
                                  option
                                )
                              }
                              className="listening-radio-input"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateQuestionOption(
                                  question.id,
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder={`Option ${String.fromCharCode(65 + index)}`}
                              className="listening-option-text"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                  <div className="listening-question-footer">
                    <div className="listening-form-group listening-points-group">
                      <label>Points</label>
                      <input
                        type="number"
                        value={question.points}
                        onChange={(e) =>
                          updateQuestion(
                            question.id,
                            "points",
                            e.target.value
                          )
                        }
                        min="1"
                        className="listening-points-input"
                      />
                    </div>
                    <div className="listening-form-group listening-explanation-group">
                      <label>Explanation (Optional)</label>
                      <textarea
                        value={question.explanation || ""}
                        onChange={(e) =>
                          updateQuestion(
                            question.id,
                            "explanation",
                            e.target.value
                          )
                        }
                        placeholder="Explanation for the answer"
                        className="listening-explanation-textarea"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="listening-btn listening-add-question-btn"
              onClick={addListeningQuestion}
            >
              + Add Question
            </button>
          </div>

          <div className="listening-form-group">
            <label>Special Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Any special instructions for test-takers (e.g., 'You will hear each recording only once', 'Write your answers in the order you hear them')"
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              type="button"
              className="listening-btn listening-btn-secondary"
            >
              💾 Save as Draft
            </button>
            <button
              type="submit"
              className="listening-btn listening-btn-success"
            >
              🚀 Create Listening Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListeningTest;
