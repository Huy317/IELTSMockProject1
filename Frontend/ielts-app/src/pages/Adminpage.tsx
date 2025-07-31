import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>admin page test</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}

export default AdminPage;