import { Link } from "react-router-dom";

function HomePage() {
  return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div>
              <h1>Welcome to IELTS Mock Project</h1>
              <p>This is the main content area. You can add your pages here.</p>
              <Link to="/course-grid">Go to Course Grid</Link>
              <br/>
              <Link to="/admin">Go to Admin Page</Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
