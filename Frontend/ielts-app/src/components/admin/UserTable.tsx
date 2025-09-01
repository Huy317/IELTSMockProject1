import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { confirmToast } from "../layout/confirmToast";
import { deleteUser, getAllUsers } from "../../services/userService";
import type { User } from "../../types/User";
import { Link } from "react-router-dom";

function UserTable() {
  const [users, getUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getAllUsers();
    getUsers(data);
  }

  async function handleDelete(id: number) {
    confirmToast(
      "Are you sure you want to delete this user?",
      async () => {
        try {
          await deleteUser(id);
          await loadUsers();
          toast.success("User deleted successfully!");
        } catch (err) {
          console.error("Delete failed", err);
          toast.error("Failed to delete user. Please try again.");
        }
      },
      () => {
        // Optional cancel callback
        console.log("Delete cancelled");
      }
    );
  }

  return (
    <div className="table-responsive custom-table">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/student-details/${user.id}`}
                  className="text-primary"
                >
                  #{user.id}
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to={`/student-details/${user.id}`}>
                    <p className="fs-14">{user.fullName}</p>
                  </Link>
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    to={`/student-details/${user.id}`}
                    className="d-inline-flex fs-14 me-1 action-icon"
                  >
                    <i className="isax isax-eye text-info"></i>
                  </Link>
                  <Link
                    to={`/student/settings/${user.id}`}
                    className="d-inline-flex fs-14 action-icon"
                  >
                    <i className="isax isax-edit"></i>
                  </Link>
                  <Link
                    onClick={() => handleDelete(user.id)}
                    to="#"
                    className="d-inline-flex fs-14 action-icon"
                  >
                    <i className="isax isax-trash text-danger"></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // TODO: Add pagination
  );
}

export default UserTable;
