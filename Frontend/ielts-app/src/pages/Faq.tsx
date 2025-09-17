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
      question: "Is there a 14-days trial?",
      answer:
        "No, we currently do not offer a 14-day trial. However, you can explore our platform through free demo courses or contact our team for a personalized walkthrough of the features.",
    },
    {
      id: "faqtwo",
      question: "How much time I will need to learn this app?",
      answer:
        "No, we currently do not offer a 14-day trial. However, you can explore our platform through free demo courses or contact our team for a personalized walkthrough of the features.",
    },
    {
      id: "faqthree",
      question: "Is there a month-to-month payment option?",
      answer:
        "No, we currently do not offer a 14-day trial. However, you can explore our platform through free demo courses or contact our team for a personalized walkthrough of the features.",
    },
    {
      id: "faqfour",
      question: "What's the benefits of the Premium Membership?",
      answer:
        "No, we currently do not offer a 14-day trial. However, you can explore our platform through free demo courses or contact our team for a personalized walkthrough of the features.",
    },
    {
      id: "faqfive",
      question: "Are there any free tutorials available?",
      answer:
        "No, we currently do not offer a 14-day trial. However, you can explore our platform through free demo courses or contact our team for a personalized walkthrough of the features.",
    },
    {
      id: "faqsix",
      question: "How can I cancel my subscription plan?",
      answer:
        "No, we currently do not offer a 14-day trial. However, you can explore our platform through free demo courses or contact our team for a personalized walkthrough of the features.",
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
