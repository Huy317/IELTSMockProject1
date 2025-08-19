import { Link } from 'react-router-dom';
import Card from '../utils/Card';

function FeaturedTestsSection() {
    return (
        <section className="featured-courses-section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
                        Featured Tests
                    </span>
                    <h2>Popular IELTS Mock Tests</h2>
                    <p>
                        Try our most popular mock tests to improve your IELTS skills and build confidence for the real exam
                    </p>
                </div>
                <div className="feature-course-slider-2">
                    <div >
                        <Card
                            title="IELTS Academic Reading Practice Test 1"
                            attemptCount={1234}
                            questionCount={40}
                            type='Reading'
                            timeMinutes={60}
                        />
                    </div>
                    <div>

                        <Card
                            title="IELTS General Listening Mock Test"
                            attemptCount={856}
                            questionCount={40}
                            type='Listening'
                            timeMinutes={30}
                        />

                    </div>
                    <div>
                        <Card
                            title="IELTS Academic Reading & Listening"
                            attemptCount={692}
                            questionCount={80}
                            type='Listening/Reading'
                            timeMinutes={90}
                        />
                    </div>
                    <div>
                        <Card
                            title="IELTS General Reading Comprehension"
                            attemptCount={543}
                            questionCount={40}
                            type='Reading'
                            timeMinutes={60}
                        />
                    </div>
                    <div>
                        <Card
                            title="IELTS Listening Skills Builder"
                            attemptCount={789}
                            questionCount={40}
                            type='Listening'
                            timeMinutes={30}
                        />
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <Link to="/test/list" className="btn btn-primary btn-md">
                        View All Tests
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default FeaturedTestsSection;
