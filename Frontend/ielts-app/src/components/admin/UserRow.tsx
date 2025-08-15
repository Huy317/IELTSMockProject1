import { Link } from 'react-router-dom';

interface User {
    id: string,
    fullName: string,
    createdAt: string,
    role: string,
    currentBandScore: number,
}

interface UserRowProps {
    user: User;
}

function UserRow({ user }: UserRowProps) {
    return (
        <tr>
            <td>
                <Link to={`/student-details/${user.id}`} className="text-primary">
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
            <td>{user.createdAt}</td>
            <td>{user.role}</td>
            <td>{user.currentBandScore}</td>
            <td>
                <div className="d-flex align-items-center">
                    <Link
                        to={`/student-details/${user.id}`}
                        className="d-inline-flex fs-14 me-1 action-icon"
                    >
                        <i className="isax isax-eye text-info"></i>
                    </Link>
                    <Link
                        to="#"
                        className="d-inline-flex fs-14 action-icon"
                    >
                        <i className="isax isax-edit"></i>
                    </Link>
                    <Link
                        to="#"
                        className="d-inline-flex fs-14 action-icon"
                    >
                        <i className="isax isax-trash text-danger"></i>
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;