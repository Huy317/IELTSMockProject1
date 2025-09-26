import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../assets/css/custom.css';
import CreateTestModal from '../utils/CreateTestModal';
import { useAuth } from '../../contexts/AuthContext';
import { createTest } from '../../services/testService';
import type { TestToCreate } from '../../types/Test';
import { getUserId } from '../../services/authService';

function AdminDashboardLayout() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreatingTest, setIsCreatingTest] = useState(false);
    const { logout, user } = useAuth();

    let navigate = useNavigate();

    const handleCreateTest = async (testData: { testName: string; testTypeId: number }): Promise<void> => {
        // Prevent multiple simultaneous requests
        if (isCreatingTest) {
            console.warn("Test creation already in progress");
            return;
        }

        const newTest: TestToCreate = {
            testName: testData.testName,
            typeId: testData.testTypeId,
            createdBy: Number(getUserId()) || 0,
            createdAt: new Date().toISOString(),
            resource: '',
            isActive: false,
        };

        console.log("Creating test:", newTest);

        setIsCreatingTest(true);
        try {
            const created = await createTest(newTest);

            // Success: close modal and navigate
            setIsModalOpen(false);

            // Show success message
            alert('Test created successfully!');

            // Navigate to edit page
            navigate(`/edit-test/${created.id}`);

            console.log("New test created successfully:", created);
        } catch (error) {
            // Handle errors
            console.error("Failed to create test:", error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to create test. Please try again.';
            alert(errorMessage);
        } finally {
            setIsCreatingTest(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        logout();
        // window.location.href = '/login';
    };
    return (
        <div className="content">
            <div className="container">
                <div className="instructor-profile">
                    <div className="instructor-profile-bg">
                        <img src="/assets/img/bg/card-bg-01.png" className="instructor-profile-bg-1" alt="" />
                    </div>
                    <div className="row align-items-center row-gap-3">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center">
                                <span className="avatar flex-shrink-0 avatar-xxl avatar-rounded me-3 border border-white border-3 position-relative">
                                    <img src="/assets/img/user/user-01.jpg" alt="img" />
                                    <span className="verify-tick"><i className="isax isax-verify5"></i></span>
                                </span>
                                {/* TODO: Change this to maybe a profile component that load user data */}
                                <div>
                                    <h5 className="mb-1 text-white d-inline-flex align-items-center">
                                        {user?.name || 'Loading...'}
                                        <NavLink to="/admin/settings" className="link-light fs-16 ms-2">
                                            <i className="isax isax-edit-2"></i>
                                        </NavLink>
                                    </h5>
                                    <p className="text-light">{user?.role || 'Loading...'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap gap-3 justify-content-md-end">
                                <button 
                                    onClick={handleOpenModal}
                                    className="btn btn-white rounded-pill"
                                >
                                    Add New Test
                                </button>
                                {/* <NavLink to="/student-dashboard" className="btn btn-secondary rounded-pill">Student Dashboard</NavLink> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3 theiaStickySidebar">
                        <div className="settings-sidebar mb-lg-0">
                            <div>
                                <h6 className="mb-3">Main Menu</h6>
                                <ul className="mb-3 pb-1">
                                    <li>
                                        <NavLink
                                            to="/admin/dashboard"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-grid-35 me-2"></i>Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/profile"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="fa-solid fa-user me-2"></i>My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/courses"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-teacher5 me-2"></i>Tests
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink
                                            to="/admin/announcements"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-volume-high5 me-2"></i>Announcements
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/assignments"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-clipboard-text5 me-2"></i>Assignments
                                        </NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink
                                            to="/admin/users"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-profile-2user5 me-2"></i>Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/type-skill"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-profile-2user5 me-2"></i>Skills
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink
                                            to="/admin/quiz"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-award5 me-2"></i>Quiz
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/quiz-results"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-medal-star5 me-2"></i>Quiz Results
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/certificates"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-note-215 me-2"></i>Certificates
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/earnings"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-wallet-add5 me-2"></i>Earnings
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/payout"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-coin-15 me-2"></i>Payout
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/statements"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-shopping-cart5 me-2"></i>Statements
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/messages"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-messages-35 me-2"></i>Messages
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            to="/admin/tickets"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-ticket5 me-2"></i>Support Tickets
                                        </NavLink>
                                    </li> */}
                                </ul>
                                <hr />
                                <h6 className="mb-3">Account Settings</h6>
                                <ul>
                                    <li>
                                        <NavLink
                                            to="/admin/settings"
                                            className={({ isActive }) =>
                                                `d-inline-flex align-items-center ${isActive ? 'active' : ''}`
                                            }
                                        >
                                            <i className="isax isax-setting-25 me-2"></i>Settings
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="d-inline-flex align-items-center"
                                            onClick={handleLogout}
                                        >
                                            <i className="isax isax-logout5 me-2"></i>Logout
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Sidebar */}
                    <div className="col-lg-9">
                        {/* This is where child routes will be rendered */}
                        <Outlet />
                    </div>
                </div>
            </div>
            
            {/* Create Test Modal */}
            <CreateTestModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleCreateTest}
            />
        </div>
    );
};

export default AdminDashboardLayout;
