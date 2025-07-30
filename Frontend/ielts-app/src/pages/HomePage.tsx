import React from 'react';
import { Layout } from '../components';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content-wrapper">
              <h1>Welcome to IELTS Mock Project</h1>
              <p>
                This is an example of how to use the Layout component. Each page can have its own 
                title and description, and the layout will handle the header, footer, and navigation.
              </p>
              <div className="mt-4">
                <a href="/courses" className="btn btn-primary me-3">Browse Courses</a>
                <a href="/about" className="btn btn-outline-secondary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
