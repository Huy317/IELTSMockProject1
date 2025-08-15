import UserRow from "./UserRow";

function UserTable() {

    const testUsers = [
        {
            id: "1",
            fullName: "John Doe",
            createdAt: "2023-01-01",
            role: "Student",
            currentBandScore: 7.5
        },
        {
            id: "2",
            fullName: "Jane Smith",
            createdAt: "2023-02-15",
            role: "Student",
            currentBandScore: 8.0
        },
        {
            id: "3",
            fullName: "Alice Johnson",
            createdAt: "2023-03-10",
            role: "Student",
            currentBandScore: 7.0
        },
        {
            id: "4",
            fullName: "David Brown",
            createdAt: "2023-04-05",
            role: "Student",
            currentBandScore: 6.5
        },
        {
            id: "abcxyz111",
            fullName: "Emma Wilson",
            createdAt: "2023-05-20",
            role: "Admin",
            currentBandScore: 9.0
        }
    ];

    return (
        <div className="table-responsive custom-table">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Created At</th>
                        <th>Role</th>
                        <th>Current Band Score</th>
                        {/* Action buttons column */}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {testUsers.map(user => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>

        // TODO: Add pagination
    );
}

export default UserTable;