import { useEffect, useState } from "react";
import UserTable from "../components/admin/UserTable";
import Pagination from "../components/utils/Pagination";
import { getAllUsers } from "../services/userService";
import type { User } from "../types/User";

function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5; // Default items per page

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm) ||
      user.id.toString().includes(searchTerm)
  );

  // Calculate pagination for filtered results
  const totalItems = filteredUsers.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <>
      {/* Page title */}
      <div className="page-title d-flex align-items-center justify-content-between">
        <h5 className="fw-bold">Students</h5>
      </div>

      {/* Search bar */}
      <div className="row justify-content-end">
        <div className="col-md-4">
          <div className="input-icon mb-3">
            <span className="input-icon-addon">
              <i className="isax isax-search-normal-14"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-md"
              placeholder="Search by name, email, phone, or ID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <UserTable users={currentUsers} onUsersChange={loadUsers} />

      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AdminUserList;
