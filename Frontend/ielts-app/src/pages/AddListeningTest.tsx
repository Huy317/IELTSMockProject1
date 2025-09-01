import { useState } from "react";
import "./AddListeningTest.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ListeningSectionComponent } from "../components/test/question_form_creator";

interface FormData {
  title: string;
  instructions: string;
  availability: string;
}

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

function AddListeningTest() {
  const [sections, setSections] = useState<ListeningSection[]>([
    {
      id: 1,
      title: "",
      description: "",
      transcript: "",
      questions: [],
      questionType: "multiple-choice",
      range: "",
      isExpanded: true,
    },
    {
      id: 2,
      title: "",
      description: "",
      transcript: "",
      questions: [],
      questionType: "multiple-choice",
      range: "",
      isExpanded: false,
    },
    {
      id: 3,
      title: "",
      description: "",
      transcript: "",
      questions: [],
      questionType: "multiple-choice",
      range: "",
      isExpanded: false,
    },
    {
      id: 4,
      title: "",
      description: "",
      transcript: "",
      questions: [],
      questionType: "multiple-choice",
      range: "",
      isExpanded: false,
    },
  ]);

  const [nextQuestionId, setNextQuestionId] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    instructions: "",
    availability: "public",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const updateListeningSection = (
    sectionId: number,
    field: string,
    value: any
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  const toggleListeningSectionExpansion = (sectionId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const addListeningQuestion = (sectionId: number) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const questionType = section.questionType;

    // Find the lowest available question number across all sections
    const allQuestions = sections.flatMap((s) => s.questions);
    const existingNumbers = allQuestions.map((q) => q.questionNumber);
    let newQuestionNumber = 1;
    while (existingNumbers.includes(newQuestionNumber)) {
      newQuestionNumber++;
    }

    const newQuestion = {
      id: nextQuestionId,
      questionNumber: newQuestionNumber,
      sectionId,
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

    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, questions: [newQuestion, ...section.questions] }
          : section
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

  const updateListeningQuestion = (
    sectionId: number,
    questionId: number,
    field: string,
    value: any
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
              ),
            }
          : section
      )
    );
  };

  const updateListeningQuestionOption = (
    sectionId: number,
    questionId: number,
    optionIndex: number,
    value: any
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId && q.options && Array.isArray(q.options)
                  ? {
                      ...q,
                      options: q.options.map((opt: any, idx: any) =>
                        idx === optionIndex ? value : opt
                      ),
                    }
                  : q
              ),
            }
          : section
      )
    );
  };

  const removeListeningQuestion = (sectionId: number, questionId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.filter((q) => q.id !== questionId),
            }
          : section
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Sections:", sections);
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

                <ListeningSectionComponent
                  sections={sections}
                  updateListeningSection={updateListeningSection}
                  toggleListeningSectionExpansion={
                    toggleListeningSectionExpansion
                  }
                  addListeningQuestion={addListeningQuestion}
                  updateListeningQuestion={updateListeningQuestion}
                  updateListeningQuestionOption={updateListeningQuestionOption}
                  removeListeningQuestion={removeListeningQuestion}
                />

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
