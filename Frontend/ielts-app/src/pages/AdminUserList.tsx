import UserTable from "../components/admin/UserTable";
import Pagination from "../components/utils/Pagination";

function AdminUserList() {
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
                        <input type="email" className="form-control form-control-md" placeholder="Search" />
                    </div>
                </div>
            </div>
            
            <UserTable />
            
            <Pagination/>
        </>
    );
}

export default AdminUserList;