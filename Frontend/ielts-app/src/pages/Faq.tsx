import { useState } from "react";
import { Link } from "react-router-dom";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
function Faq() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleAccordionToggle = (faqId: string) => {
    setActiveAccordion(activeAccordion === faqId ? null : faqId);
  };

  // FAQ data
  const faqData: FaqItem[] = [
    {
      id: "faqone",
      question: "How are your IELTS mock tests structured?",
      answer:
        "Each mock test follows the real IELTS order: Listening, Reading, Writing (Task 1 & 2), and Speaking simulation. Timing and section formats match the official exam.",
    },
    {
      id: "faqtwo",
      question: "How accurate are the band score estimates?",
      answer:
        "Listening and Reading are auto‑scored using official-style conversion tables. Writing and Speaking bands use examiner-aligned rubrics. Estimates typically fall within ±0.5 band.",
    },
    {
      id: "faqthree",
      question: "Is there a free mock test before upgrading?",
      answer:
        "Yes. You can attempt one full-length mock test with limited reports. Upgrading unlocks unlimited tests, detailed analytics, and writing/speaking evaluations.",
    },
    {
      id: "faqfour",
      question: "How do you simulate the Speaking test?",
      answer:
        "You record answers to Part 1, 2, and 3 prompts with on‑screen timing. Our system analyzes delivery and you receive band feedback plus sample high-band responses.",
    },
    {
      id: "faqfive",
      question: "When do I get my results and feedback?",
      answer:
        "Listening and Reading scores are instant. Writing and Speaking feedback (if included in your plan) is returned within 12–24 hours with band breakdowns.",
    },
    {
      id: "faqsix",
      question: "Can I review mistakes and see model answers?",
      answer:
        "Yes. You can view your selected answers, correct answers, band descriptors, model Writing responses, and suggested Speaking phrases in the review dashboard.",
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">FAQ</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    FAQ
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="content">
        <div className="container">
          <h2 className="main-title mb-1">Most frequently asked questions</h2>
          <p className="mb-4">
            Here are the most frequently asked questions you may check before
            getting started
          </p>

          {/* Replace the current FAQ rendering with this Bootstrap accordion approach */}
          <div className="row">
            {/* Left Column - First 3 FAQs */}
            <div className="col-lg-6">
              {faqData.slice(0, 3).map((faq, index) => (
                <div key={faq.id} className="faq-card">
                  <h6 className="faq-title">
                    <a
                      className="collapsed"
                      data-bs-toggle="collapse"
                      href={`#${faq.id}`}
                      aria-expanded="false"
                    >
                      {faq.question}
                    </a>
                  </h6>
                  <div id={faq.id} className="collapse">
                    <div className="faq-detail">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Last 3 FAQs */}
            <div className="col-lg-6">
              {faqData.slice(3, 6).map((faq, index) => (
                <div key={faq.id} className="faq-card">
                  <h6 className="faq-title">
                    <a
                      className="collapsed"
                      data-bs-toggle="collapse"
                      href={`#${faq.id}`}
                      aria-expanded="false"
                    >
                      {faq.question}
                    </a>
                  </h6>
                  <div id={faq.id} className="collapse">
                    <div className="faq-detail">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-light border rounded p-4 p-sm-5 mt-4">
            <div className="row">
              <div className="col-lg-7 text-center mx-auto">
                <h4 className="mb-2">Still have a question?</h4>
                <p className="mb-4">
                  We'd be happy to help you with any questions you have! Please
                  let us know what you're looking for, and we'll do our best to
                  assist you.
                </p>
                <Link to="/contact-us" className="btn btn-lg btn-dark mb-0">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
