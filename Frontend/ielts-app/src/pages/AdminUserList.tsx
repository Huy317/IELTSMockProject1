import { useEffect, useState } from "react";
import UserTable from "../components/admin/UserTable";
import Pagination from "../components/utils/Pagination";
import { getAllUsers } from "../services/userService";
import type { User } from "../types/User";

function AdminUserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Default items per page

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await getAllUsers();
        setUsers(data);
    }

    // Calculate pagination
    const totalItems = users.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>  
            {/* Page title */}
            <div className="page-title d-flex align-items-center justify-content-between">
                <h5 className="fw-bold">Students</h5>
                {/* <div className="d-flex align-items-center list-icons">
                    <a href="student-list.html" className="active me-2"><i className="isax isax-task"></i></a>
                    <a href="students.html"><i className="isax isax-element-3"></i></a>
                </div> */}
            </div>
            
            {/* Search bar */}
            <div className="row justify-content-end">
                <div className="col-md-4">
                    <div className="input-icon mb-3">
                        <span className="input-icon-addon">
                            <i className="isax isax-search-normal-14"></i>
                        </span>
                        <input type="email" className="form-control form-control-md" placeholder="Search" />
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