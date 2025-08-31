import { useState } from "react";
import "./AddReadingTest.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ReadingPassageComponent } from "../components/test/question_form_creator";

interface FormData {
  title: string;
  availability: string;
  generalInstructions: string;
}

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

function AddReadingTest() {
  const [passages, setPassages] = useState<Passage[]>([
    {
      id: 1,
      title: "",
      category: "science",
      content: "",
      questions: [],
      range: "",
      questionType: "multiple-choice",
      isExpanded: true,
    },
    {
      id: 2,
      title: "",
      category: "science",
      content: "",
      questions: [],
      range: "",
      questionType: "multiple-choice",
      isExpanded: false,
    },
    {
      id: 3,
      title: "",
      category: "science",
      content: "",
      questions: [],
      range: "",
      questionType: "multiple-choice",
      isExpanded: false,
    },
  ]);

  const [nextQuestionId, setNextQuestionId] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    availability: "public",
    generalInstructions: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const updateReadingPassage = (
    passageId: number,
    field: string,
    value: any
  ) => {
    setPassages((prev) =>
      prev.map((passage) =>
        passage.id === passageId ? { ...passage, [field]: value } : passage
      )
    );
  };

  const toggleReadingPassageExpansion = (passageId: number) => {
    setPassages((prev) =>
      prev.map((passage) =>
        passage.id === passageId
          ? { ...passage, isExpanded: !passage.isExpanded }
          : passage
      )
    );
  };

  const addReadingQuestion = (passageId: number) => {
    const passage = passages.find((p) => p.id === passageId);
    if (!passage) return;

    const questionType = passage.questionType;

    // Find the lowest available question number across all passages
    const allQuestions = passages.flatMap((p) => p.questions);
    const existingNumbers = allQuestions.map((q) => q.questionNumber);
    let newQuestionNumber = 1;
    while (existingNumbers.includes(newQuestionNumber)) {
      newQuestionNumber++;
    }

    const newQuestion = {
      id: nextQuestionId,
      questionNumber: newQuestionNumber,
      passageId,
      questionType,
      questionText: "",
      options:
        questionType === "multiple-choice" ||
        questionType === "true-false-notgiven" ||
        questionType === "yes-no-notgiven"
          ? ["", "", "", ""]
          : questionType === "matching-headings" ||
            questionType === "matching-information" ||
            questionType === "matching-features"
          ? {
              items: ["", "", "", ""],
              matches: ["", "", "", ""],
            }
          : undefined,
      correctAnswer:
        questionType === "multiple-choice"
          ? ""
          : questionType === "true-false-notgiven"
          ? ""
          : questionType === "yes-no-notgiven"
          ? ""
          : questionType === "sentence-completion" ||
            questionType === "summary-completion" ||
            questionType === "note-completion" ||
            questionType === "table-completion" ||
            questionType === "flow-chart" ||
            questionType === "diagram-labeling"
          ? [""]
          : questionType === "short-answer"
          ? ""
          : questionType === "matching-headings" ||
            questionType === "matching-information" ||
            questionType === "matching-features"
          ? [{ item: 0, match: 0 }]
          : undefined,
      blanksCount:
        questionType === "sentence-completion" ||
        questionType === "summary-completion" ||
        questionType === "note-completion" ||
        questionType === "table-completion" ||
        questionType === "flow-chart" ||
        questionType === "diagram-labeling"
          ? 1
          : undefined,
      explanation: "",
    };

    setPassages((prev) =>
      prev.map((passage) =>
        passage.id === passageId
          ? { ...passage, questions: [newQuestion, ...passage.questions] }
          : passage
      )
    );

    setNextQuestionId((prev) => prev + 1);

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

  const updateReadingQuestion = (
    passageId: number,
    questionId: any,
    field: any,
    value: any
  ) => {
    setPassages((prev) =>
      prev.map((passage) =>
        passage.id === passageId
          ? {
              ...passage,
              questions: passage.questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
              ),
            }
          : passage
      )
    );
  };

  const updateReadingQuestionOption = (
    passageId: number,
    questionId: any,
    optionIndex: any,
    value: any
  ) => {
    setPassages((prev) =>
      prev.map((passage) =>
        passage.id === passageId
          ? {
              ...passage,
              questions: passage.questions.map((q) =>
                q.id === questionId && q.options
                  ? {
                      ...q,
                      options: q.options.map((opt: any, idx: any) =>
                        idx === optionIndex ? value : opt
                      ),
                    }
                  : q
              ),
            }
          : passage
      )
    );
  };

  const removeReadingQuestion = (passageId: number, questionId: number) => {
    setPassages((prev) =>
      prev.map((passage) =>
        passage.id === passageId
          ? {
              ...passage,
              questions: passage.questions.filter((q) => q.id !== questionId),
            }
          : passage
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Passages:", passages);
    alert("Reading test created successfully!");
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 text-primary">
                <i className="bi bi-book me-2"></i> Create Reading Test
              </h2>

              <form id="readingTestForm" onSubmit={handleSubmit}>
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
                      placeholder="e.g., IELTS Reading Practice Test 1"
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

                {/* Passages Container */}
                <div id="passagesContainer" className="mb-4">
                  {passages.map((passage, index) => (
                    <ReadingPassageComponent
                      key={passage.id}
                      passage={passage}
                      index={index}
                      updateReadingPassage={updateReadingPassage}
                      toggleReadingPassageExpansion={
                        toggleReadingPassageExpansion
                      }
                      addReadingQuestion={addReadingQuestion}
                      removeReadingQuestion={removeReadingQuestion}
                      updateReadingQuestion={updateReadingQuestion}
                      updateReadingQuestionOption={updateReadingQuestionOption}
                    />
                  ))}
                </div>

                <div className="mb-4">
                  <label className="form-label">General Instructions</label>
                  <textarea
                    name="generalInstructions"
                    value={formData.generalInstructions}
                    onChange={handleInputChange}
                    placeholder="General instructions for all passages (e.g., 'Read the passages and answer the questions', 'Transfer your answers to the answer sheet')"
                    className="form-control"
                    rows={3}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success btn-lg px-5">
                    <i className="bi bi-floppy-fill me-2"></i> Save Reading Test
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

export default AddReadingTest;
