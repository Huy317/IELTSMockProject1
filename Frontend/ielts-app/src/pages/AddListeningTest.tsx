import { useState, useRef, useEffect } from "react";
import "./AddListeningTest.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
  const [nextQuestionId, setNextQuestionId] = useState(1);
  const [lastCreatedQuestionNumber, setLastCreatedQuestionNumber] = useState<
    number | null
  >(null);
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
        questionType === "multiple-choice" || questionType === "multiple-choice-multiple" 
          ? ["", "", "", ""] 
          : questionType === "matching"
          ? {
              items: ["", "", "", ""],
              matches: ["", "", "", ""]
            }
          : undefined,
      correctAnswer: 
        questionType === "multiple-choice-multiple" 
          ? [] 
          : questionType === "fill-blanks"
          ? [""]
          : questionType === "matching"
          ? [{item: 0, match: 0}]
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
    <div className="listening-form-container">
      <div className="listening-form">
        <h2 className="listening-section-title">
          <i className="bi bi-headphones"></i> Create Listening Test
        </h2>

        <form id="listeningTestForm" onSubmit={handleSubmit}>
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
              <label>Test Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="listening-select-input"
              >
                <option value="public">Public (Anyone can access)</option>
                <option value="private">Private (Invited users only)</option>
              </select>
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
            <h3 style={{ marginBottom: "25px" }}>
              <i className="bi bi-pencil-square"></i> Questions Builder
            </h3>

            <div id="listeningQuestions">
              {questions
                .sort((a, b) => a.questionNumber - b.questionNumber) // Sort by question number
                .map((question) => (
                  <div
                    key={question.id}
                    id={`question-${question.questionNumber}`}
                    className="listening-question-item"
                  >
                    <div className="listening-question-header">
                      <div className="listening-question-info">
                        <div className="listening-question-number">
                          {question.questionNumber}
                        </div>
                        <div className="listening-question-meta">
                          <span className="listening-question-title">
                            Question {question.questionNumber}
                          </span>
                          <span className="listening-section-info">
                            Section {question.section}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="listening-btn listening-btn-delete"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <i className="bi bi-trash3"></i> DELETE
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

                    {/* Multiple Choice (Single Answer) */}
                    {question.questionType === "multiple-choice" &&
                      question.options && (
                        <div className="listening-options-grid">
                          {question.options.map(
                            (option: any, optionIndex: any) => (
                              <div
                                key={optionIndex}
                                className="listening-option-item"
                              >
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  value={option}
                                  checked={
                                    question.correctAnswer === option &&
                                    option !== ""
                                  }
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
                                      optionIndex,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Option ${String.fromCharCode(
                                    65 + optionIndex
                                  )}`}
                                  className="listening-option-text"
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}

                    {/* Multiple Choice (Multiple Answers) */}
                    {question.questionType === "multiple-choice-multiple" &&
                      question.options && (
                        <div className="listening-options-grid">
                          {question.options.map(
                            (option: any, optionIndex: any) => (
                              <div
                                key={optionIndex}
                                className="listening-option-item"
                              >
                                <input
                                  type="checkbox"
                                  name={`correct-${question.id}-${optionIndex}`}
                                  value={option}
                                  checked={
                                    Array.isArray(question.correctAnswer) &&
                                    question.correctAnswer.includes(option) &&
                                    option !== ""
                                  }
                                  onChange={(e) => {
                                    const currentAnswers = Array.isArray(question.correctAnswer) 
                                      ? question.correctAnswer 
                                      : [];
                                    if (e.target.checked) {
                                      updateQuestion(
                                        question.id,
                                        "correctAnswer",
                                        [...currentAnswers, option]
                                      );
                                    } else {
                                      updateQuestion(
                                        question.id,
                                        "correctAnswer",
                                        currentAnswers.filter((ans: string) => ans !== option)
                                      );
                                    }
                                  }}
                                  className="listening-checkbox-input"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) =>
                                    updateQuestionOption(
                                      question.id,
                                      optionIndex,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Option ${String.fromCharCode(
                                    65 + optionIndex
                                  )}`}
                                  className="listening-option-text"
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}

                    {/* Fill in the Blanks */}
                    {question.questionType === "fill-blanks" && (
                        <div className="listening-fill-blanks-section">
                          <div className="listening-form-group">
                            <label>Number of Blanks</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={question.blanksCount || 1}
                              onChange={(e) =>
                                updateQuestion(question.id, "blanksCount", parseInt(e.target.value))
                              }
                              className="listening-blanks-count-input"
                            />
                          </div>
                          <div className="listening-form-group">
                            <label>Correct Answers (one per line)</label>
                            <textarea
                              value={Array.isArray(question.correctAnswer) ? question.correctAnswer.join('\n') : ''}
                              onChange={(e) => {
                                const answers = e.target.value.split('\n').filter(line => line.trim() !== '');
                                updateQuestion(question.id, "correctAnswer", answers);
                              }}
                              placeholder="Enter correct answers, one per line&#10;Example:&#10;university&#10;professor&#10;library"
                              className="listening-blanks-answers-textarea"
                              rows={question.blanksCount || 1}
                            />
                          </div>
                          <div className="listening-instruction-note">
                            <i className="bi bi-info-circle"></i>
                            <span>Use underscores (_____) in your question text to indicate where blanks should appear.</span>
                          </div>
                        </div>
                      )}

                    {/* Matching */}
                    {question.questionType === "matching" && (
                        <div className="listening-matching-section">
                          <div className="listening-matching-grid">
                            <div className="listening-matching-column">
                              <h4>Items to Match</h4>
                              {question.options?.items?.map((item: string, index: number) => (
                                <div key={`item-${index}`} className="listening-matching-item">
                                  <span className="listening-matching-number">{index + 1}.</span>
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                      const newItems = [...(question.options?.items || [])];
                                      newItems[index] = e.target.value;
                                      updateQuestion(question.id, "options", {
                                        ...question.options,
                                        items: newItems
                                      });
                                    }}
                                    placeholder={`Item ${index + 1}`}
                                    className="listening-matching-input"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="listening-matching-column">
                              <h4>Answer Options</h4>
                              {question.options?.matches?.map((match: string, index: number) => (
                                <div key={`match-${index}`} className="listening-matching-item">
                                  <span className="listening-matching-letter">{String.fromCharCode(65 + index)}.</span>
                                  <input
                                    type="text"
                                    value={match}
                                    onChange={(e) => {
                                      const newMatches = [...(question.options?.matches || [])];
                                      newMatches[index] = e.target.value;
                                      updateQuestion(question.id, "options", {
                                        ...question.options,
                                        matches: newMatches
                                      });
                                    }}
                                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                    className="listening-matching-input"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="listening-form-group">
                            <label>Correct Matches (Format: 1-A, 2-B, 3-C, 4-D)</label>
                            <input
                              type="text"
                              value={
                                Array.isArray(question.correctAnswer) 
                                  ? question.correctAnswer.map((match: any) => 
                                      `${match.item + 1}-${String.fromCharCode(65 + match.match)}`
                                    ).join(', ')
                                  : ''
                              }
                              onChange={(e) => {
                                const matches = e.target.value.split(',').map(pair => {
                                  const [item, match] = pair.trim().split('-');
                                  return {
                                    item: parseInt(item) - 1,
                                    match: match ? match.charCodeAt(0) - 65 : 0
                                  };
                                }).filter(match => !isNaN(match.item) && !isNaN(match.match));
                                updateQuestion(question.id, "correctAnswer", matches);
                              }}
                              placeholder="1-A, 2-B, 3-C, 4-D"
                              className="listening-matching-answers-input"
                            />
                          </div>
                        </div>
                      )}

                    <div className="listening-question-footer">
                      <div className="listening-form-group">
                        <label>Explanation (Optional)</label>
                        <textarea
                          className="listening-explanation-textarea listening-explanation-full-width"
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
                  <option value="multiple-choice">Multiple Choice (Single Answer)</option>
                  <option value="multiple-choice-multiple">Multiple Choice (Multiple Answers)</option>
                  <option value="fill-blanks">Fill in the Blanks</option>
                  <option value="matching">Matching</option>
                  {/* <option value="map-labeling">Map/Plan Labeling</option>
                  <option value="form-completion">Form Completion</option>
                  <option value="note-completion">Note Completion</option>
                  <option value="table-completion">Table Completion</option>
                  <option value="flow-chart">Flow Chart</option>
                  <option value="summary-completion">Summary Completion</option>
                  <option value="short-answer">Short Answer</option> */}
                </select>
              </div>
            </div>

            <button
              type="button"
              className="listening-btn listening-add-question-btn"
              onClick={addListeningQuestion}
            >
              <i className="bi bi-plus-circle-fill"></i> Add Question
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
              type="submit"
              className="listening-btn listening-btn-success"
            >
              <i className="bi bi-floppy-fill"></i> Save Listening Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListeningTest;
